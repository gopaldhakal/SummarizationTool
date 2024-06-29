from models import User
from flask import Flask, render_template, request, jsonify
from summarizer import Summarizer
from flask_cors import CORS
from TextRank import apply_text_rank_algorithm
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize
from db import db
from flask import redirect, url_for

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db.init_app(app)
CORS(app)

# Link the app with the database
# Create tables
with app.app_context():
    db.create_all()


def generate_summary(text):
    model = Summarizer()
    summary = model(text)
    return ''.join(summary)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Create a new user instance
        new_user = User(username=username, email=email)
        new_user.set_password(password)

        # Add the user to the database
        db.session.add(new_user)
        db.session.commit()

    return jsonify({'message': 'Registration successful'})
    return render_template('register.html')


@app.route('/')
def home():
    return render_template('index.html')


def tfidf_summarization(text, num_sentences=3):
    sentences = sent_tokenize(text)
    stop_words = set(stopwords.words('english'))
    vectorizer = TfidfVectorizer(stop_words='english')
    X = vectorizer.fit_transform(sentences)
    tfidf_scores = X.sum(axis=1).A1
    ranked_sentences = sorted(
        zip(sentences, tfidf_scores), key=lambda x: x[1], reverse=True)
    return ' '.join(sentence for sentence, _ in ranked_sentences[:num_sentences])


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Read the contents of the file
    file_content = file.read().decode("utf-8")

    print("Received file content:", file_content)

    algorithm = request.form.get('algorithm', 'default')

    print("Selected algorithm:", algorithm)

    if algorithm == 'tfidf':
        summary = tfidf_summarization(file_content)
    elif algorithm == 'text_rank':
        summary = apply_text_rank_algorithm(file_content)
    else:
        summary = generate_summary(file_content)

    print("Generated summary:", summary)

    return jsonify({'summary': summary})


@app.route('/summarize', methods=['POST'])
def summarize():
    if request.method == 'POST':
        data = request.get_json()
        input_text = data['text']
        print("Received text:", input_text)

        algorithm = data.get('algorithm', 'default')

        if algorithm == 'tfidf':
            summary = tfidf_summarization(input_text)
        elif algorithm == 'text_rank':
            summary = apply_text_rank_algorithm(input_text)
        else:
            # Use the default summarization algorithm or other algorithms as needed
            summary = generate_summary(input_text)

        return jsonify({'summary': summary})


if __name__ == '__main__':
    app.run(debug=True)
