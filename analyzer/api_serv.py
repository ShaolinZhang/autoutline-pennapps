import flask, json
from flask import request
from flask import jsonify

server = flask.Flask(__name__)

from google.cloud import language_v1
from google.cloud.language_v1 import enums
import numpy as np
import pandas as pd
import re
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize

from prepare_glove import *

nltk.download('punkt')
nltk.download('stopwords')
stop_words = stopwords.words('english')

# define remove stop words
def remove_stopwords(sen):
    sen_new = " ".join([i for i in sen if i not in stop_words])
    return sen_new

download_glove()

# Get pre-trained word_embeddings from glove
def get_word_embeddings():
	word_embeddings = {}
	f = open('glove/glove.twitter.27B.200d.txt', encoding='utf-8')
	for line in f:
	    values = line.split()
	    word = values[0]
	    coefs = np.asarray(values[1:], dtype='float32')
	    word_embeddings[word] = coefs
	f.close()
	return word_embeddings

word_embeddings = get_word_embeddings()

# define tokenize string to sentences
def tokenize(string):
	sentences = []
	sentences.append(sent_tokenize(string))
	sentences = [y for x in sentences for y in x]
	return sentences

# define clean sentences, remove char other than alphabets, tolower(), remove stopwords
def clean_sentences(sentences):
	clean_sentences = pd.Series(sentences).str.replace("[^a-zA-Z]", " ")
	clean_sentences = [s.lower() for s in clean_sentences]
	clean_sentences = [remove_stopwords(r.split()) for r in clean_sentences]
	return clean_sentences

# define convert sentences to word_vec
def get_sentence_vectors(sentences):
	sentence_vectors = []
	for i in sentences:
	    if len(i) != 0:
	        v = sum([word_embeddings.get(w, np.zeros((200,))) for w in i.split()])/(len(i.split())+0.001)
	    else:
	        v = np.zeros((200,))
	    sentence_vectors.append(v)
	return sentence_vectors

# define find topics from pagerank values
def findTopics(scores, sentences):
    # construct list of sentences sorted by importance scores
    ranked_sentences = sorted(((scores[i], s) for i,s in enumerate(sentences)), reverse=True)

    # extract top 15% sentences as the summary, and sort by sentence index
    numOfSen = max(5, int(0.20 * len(sentences)))
    top_sentences = []
    for i in range(numOfSen):
        top_sentences.append((sentences.index(ranked_sentences[i][1]), ranked_sentences[i][1], ranked_sentences[i][0]))
    top_sentences = sorted(top_sentences, key = lambda top_sentences: top_sentences[0])

    # delete top sentences that are too near to each other
    current = 1
    length = len(top_sentences)
    while current < length:
        if top_sentences[current][0] - top_sentences[current - 1][0] < 0.02 * len(sentences):
            if top_sentences[current][2] > top_sentences[current - 1][2]:
                top_sentences.pop(current - 1)
            else:
                top_sentences.pop(current)
            length -= 1
        else:
            current += 1

    # parse paragraphs
    mid_point = []
    for i in range(0, len(top_sentences) - 1):
        left = top_sentences[i][0]
        right = top_sentences[i + 1][0]
        sum_real = 0
        mid_point.append(i)
        if right == left + 1:
            mid_point[i] = left
        else:
            for j in range(left + 1, right):
                sum_i = 0
                for x in range(left + 1, right):
                    if x <= j:
                        sum_i += sim_mat[left][x]
                    else:
                        sum_i += sim_mat[x][right]
                if sum_i > sum_real:
                    sum_real = sum_i
                    mid_point[i] = j

    # return
    returned = []
    left = 0
    right = mid_point[0]
    for i in range(len(top_sentences)):
        newTitle = {
            "ind": top_sentences[i][0],
            "range": [left, right],
            "string": top_sentences[i][1]
        }
        returned.append(newTitle)
        left = right
        if i == len(top_sentences)-2:
            right = len(sentences)
        elif not i == len(top_sentences)-1:
            right = mid_point[i + 1]

    return returned

@server.route('/get_outline', methods=['GET', 'POST'])
def get_outline():
    req_data = request.get_json()
    raw_string = req_data['text'].replace('\n', ' ')

    sentences = tokenize(raw_string)
    cleaned = clean_sentences(sentences)
    sentence_vectors = get_sentence_vectors(cleaned)

    # construct similarity matrix
    sim_mat = np.zeros([len(sentences), len(sentences)])
    for i in range(len(sentences)):
	    for j in range(len(sentences)):
	        if i != j:
	            sim_mat[i][j] = cosine_similarity(sentence_vectors[i].reshape(1,200), sentence_vectors[j].reshape(1,200))[0,0]

    # calculate page rank values
    nx_graph = nx.from_numpy_array(sim_mat)
    scores = nx.pagerank(nx_graph)

    # calculate sentiment
    client = language_v1.LanguageServiceClient().from_service_account_json("google_credentials.json")
    type_ = enums.Document.Type.PLAIN_TEXT
    language = "en"
    document = {"content": raw_string, "type": type_, "language": language}
    encoding_type = enums.EncodingType.UTF8
    response = client.analyze_sentiment(document, encoding_type=encoding_type)

    return jsonify(topics=findTopics(scores, sentences),
    				sentiment=response.document_sentiment.score)

@server.route('/get_keyword', methods=['GET', 'POST'])
def get_keyword():
	req_data = request.get_json()
	raw_string = req_data['text'].replace('\n', ' ')

	client = language_v1.LanguageServiceClient().from_service_account_json("google_credentials.json")
	type_ = enums.Document.Type.PLAIN_TEXT
	language = "en"
	document = {"content": raw_string, "type": type_, "language": language}
	encoding_type = enums.EncodingType.UTF8
	response = client.analyze_entities(document, encoding_type=encoding_type)

	word_salience = []
	for entity in response.entities:
	    word_salience.append((entity.name, entity.salience))
	sorted_salience = sorted(word_salience, key=lambda x: x[1], reverse=True)

	important_words = []

	for i in range(min(5, len(sorted_salience))):
	    important_words.append(sorted_salience[i][0])

	return jsonify(words=important_words)


if __name__ == '__main__':
	server.run(debug=True, port=8000, host='0.0.0.0')
