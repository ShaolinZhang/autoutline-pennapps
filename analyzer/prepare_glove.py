import urllib.request
import zipfile
import os
from os import path

def download_glove():
	url = 'http://nlp.stanford.edu/data/glove.twitter.27B.zip'
	root_zip = "glove.zip"
	root = "glove"

	if not path.exists("glove/glove.twitter.27B.200d.txt"):
		print('Beginning file download with glove...')
		urllib.request.urlretrieve(url, root_zip)
		with zipfile.ZipFile(root_zip, 'r') as zip_ref:
		    zip_ref.extractall(root)
	else:
		print("glove is ready")

	return 

