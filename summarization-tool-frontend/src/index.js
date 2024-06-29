import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Registration from './Registration';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import AppRouter from './AppRouter';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Auth0Provider
    domain="dev-5xip6qnifydd8f6s.us.auth0.com"
    clientId="UrPMitxOyCBQOtzXo3HjGnyBljzSzVMG"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  
    
     <AppRouter/>
    
     </Auth0Provider>
    

    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
