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
nltk.download('punkt')
nltk.download('stopwords')

stop_words = stopwords.words('english')

# Get pre-trained word_embeddings from glove
def get_word_embeddings():
	word_embeddings = {}
	f = open('../w2vdata/glove.6B.300d.txt', encoding='utf-8')
	for line in f:
	    values = line.split()
	    word = values[0]
	    coefs = np.asarray(values[1:], dtype='float32')
	    word_embeddings[word] = coefs
	f.close()
	return word_embeddings

word_embeddings = get_word_embeddings()

# define remove stop words
def remove_stopwords(sen):
    sen_new = " ".join([i for i in sen if i not in stop_words])
    return sen_new

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
	        v = sum([word_embeddings.get(w, np.zeros((300,))) for w in i.split()])/(len(i.split())+0.001)
	    else:
	        v = np.zeros((300,))
	    sentence_vectors.append(v)
	return sentence_vectors

# define find titles from pagerank values
def findTitles(scores, sentences):
    ans = []
    ind = 0
    left = 0
    right = 0
    i=1
    while i<len(scores):
        if scores[i] > scores[i-1]:
            left = i-1
            i = i+1
            while i<len(scores) and scores[i]>scores[i-1]:
                i=i+1
            ind = i-1
            while i<len(scores) and scores[i]<scores[i-1]:
                i=i+1
            right = i-1
            newTitle = {
                "ind": ind,
                "range": [left, right],
                "string": sentences[ind]
            }
            ans.append(newTitle)
        i=i+1
    return ans

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
	            sim_mat[i][j] = cosine_similarity(sentence_vectors[i].reshape(1,300), sentence_vectors[j].reshape(1,300))[0,0]

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

    return jsonify(titles=findTitles(scores, sentences),
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
