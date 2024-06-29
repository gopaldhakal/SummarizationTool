// App.js

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import Registration from './Registration';
/*import { BrowserRouter as Router, Route, Switch, link} from 'react-router-dom';*/
import Navbar from './components/Navbar';
import './App.css'
import html2pdf from 'html2pdf.js';
import { faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons';
import About from './About';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FileUpload from './FileUpload';

function App() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('default');
  const summaryRef = useRef(null);
  const [isDarkMode, setIsDarkMode] =useState(false);
  const algorithms = ['default','text_rank', 'tfidf'];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const summarize = () => {
    // Check if the user is authenticated before making the request
    if (isAuthenticated) {
    // Make an AJAX request to Flask backend
    fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText, algorithm: selectedAlgorithm }),
    })
      .then(response => response.json())
      .then(data => setSummary(data.summary))
      .catch(error => console.error('Error:', error));
    } else {
      // Redirect unauthenticated users to the login page
      loginWithRedirect();
    }
  };
  
  const copyToClipboard = () => {
    try {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea');
      // Set the value of the textarea to the summary
      textarea.value = summary;
      // Append the textarea to the document
      document.body.appendChild(textarea);
      // Select the content of the textarea
      textarea.select();
      // Copy the selected text to the clipboard
      document.execCommand('copy');
      // Remove the temporary textarea from the document
      document.body.removeChild(textarea);
      
      // Provide user feedback, e.g., by displaying a notification
      alert('Summary copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const exportToPDF = () => {
    const pdfOptions = {
      margin: 10,
      filename: 'summary.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    const element = summaryRef.current;
  
    // Check if the summary element exists before attempting to export
    if (element) {
      html2pdf(element, pdfOptions);
    } else {
      console.error('Summary element not found. Export to PDF failed.');
    }
  };
  
  return (
    
    
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <button type="button" onClick={toggleDarkMode} color='Dark'>
         Dark Mode
      </button>
      <h1>Online Text Summarization Tool</h1>
      
      
      <label htmlFor="inputText">Enter Text:</label>
      <textarea
        id="inputText"
        name="inputText"
        rows="7"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ textAlign: 'justify' }} 
      ></textarea>
 <div>
      <FileUpload />
    </div>


    <label htmlFor="algorithm">Choose Algorithm:</label>
      <select
        id="algorithm"
        name="algorithm"
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
      >
        {algorithms.map((algo) => (
          <option key={algo} value={algo}>
            {algo}
          </option>
        ))}
      </select>


      <button type="button" onClick={summarize}>
        Summarize
      </button>

      <div>
        <h2>Summary:</h2>
        <p ref={summaryRef} style={{ textAlign: 'justify' }} className='para'>{summary}</p>
        <button type="button" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faClipboard} /> Copy to Clipboard
        </button>
        <button type="button" onClick={exportToPDF}>
          <FontAwesomeIcon icon={faFilePdf} /> Export to PDF
        </button>
      </div>

      
      <div className="footer">
        <p>
          © 2023 Online Text Summarizer Tool. All rights reserved. | Designed by{"\t"}
          <a href="bca180605_gopal@achsnepal.edu.np" target="_blank" rel="noopener noreferrer">
              Gopal Dhakal
          </a>
        </p>
        
      </div>
    </div>
  );
}

export default App;
