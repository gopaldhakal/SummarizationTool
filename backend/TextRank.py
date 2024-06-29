# textrank.py
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
import networkx as nx

nltk.download('punkt')
nltk.download('stopwords')

def preprocess_text(text):
    sentences = sent_tokenize(text)
    words = [word.lower() for sentence in sentences for word in word_tokenize(sentence) if word.isalnum()]
    return sentences, words

def build_similarity_matrix(sentences, words):
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]

    frequency = FreqDist(words)

    similarity_matrix = nx.Graph()

    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i == j:
                continue
            intersection = set(words[i]) & set(words[j])
            if intersection:
                weight = sum([frequency[word] for word in intersection])
                similarity_matrix.add_edge(i, j, weight=weight)

    return similarity_matrix

def apply_text_rank_algorithm(text):
    sentences, words = preprocess_text(text)
    similarity_matrix = build_similarity_matrix(sentences, words)

    scores = nx.pagerank(similarity_matrix)

    # Sort sentences by their TextRank scores
    ranked_sentences = sorted(((scores[i], sentence) for i, sentence in enumerate(sentences)), reverse=True)

    # Extract the top N sentences to form the summary
    top_sentences = [sentence for _, sentence in ranked_sentences[:3]]  # Adjust the number of sentences as needed

    return ' '.join(top_sentences)
