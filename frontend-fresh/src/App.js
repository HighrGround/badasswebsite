import { useState } from 'react';
import Submitbutton from './/components/SubmitButton'; 
import PromptInput from './/components/prompt';
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
//import HomePage from './pages/HomePage';
//import AboutPage from './pages/AboutPage';
//import ContactPage from './pages/ContactPage';



function App() {

  const homeroute = () => {
  <div className="main-body">
    <PromptInput/>
    
  </div>
  }
}


  async sendPrompt() {
    try {
      const res = await fetch('http://localhost:8000/test', {
      });
      const result = await res.json();
      if (result && result.success) {
        console.log('Success:', result.response);
      } else if (result && result.success === false) {
        console.log('Error:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  

  const otherroute = () => {
    <div>
      <p>result.response</p>


    </div>







  return (

  <Router>
  <Routes>
    <Route path="/" exact component={homeroute} />
    <Route path="/" exact component={otherroute} />

  </Routes>
</Router>

  );
}


export default App;