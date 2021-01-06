import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'semantic-ui-react'
import Overview from './components/Overview'


function App() {
  return (
    <>
    <Container style={{ marginTop: '15px' }}>
         <Overview />
    </Container>
    </>
  );
}

export default App;
