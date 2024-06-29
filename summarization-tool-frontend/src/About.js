// AboutPage.js

import React from 'react';
import './nav.css'

const About = () => {
  return (
    <div className='aboutpage'>
      <h1>About Online Text Summarization Tool</h1>
      <p>
        Welcome to the Online Text Summarization Tool! This tool allows you to
        enter text and generate concise summaries using various algorithms such
        as default, TextRank, and TF-IDF.
      </p>
      
      <p>
        Thank you for using our tool! If you have any questions or feedback,
        feel free to contact us at{' '}
        <a href="mailto:your-email@example.com">gopaldhakal200@gmail.com</a>.
      </p>
    </div>
  );
};

export default About;
