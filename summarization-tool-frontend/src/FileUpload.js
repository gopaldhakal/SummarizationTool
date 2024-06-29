import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile);
    setFile(selectedFile);
  };

  const handleUpload = () => {
    console.log('Uploading file:', file);
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // Process the response, which may include the summary
        console.log(data);
        setSummary(data.summary);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload and Summarize</button>
    {summary && (
      <div>
        <h2>Summary:</h2>
        <p style={{ textAlign: 'justify'}} ><i>{summary}</i></p>
      </div>
    )}
  </div>
  );
};

export default FileUpload;
