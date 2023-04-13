import './App.scss'
import React from 'react';
import { Route } from 'react-router-dom'
import Homepage from './components/Homepage';
import SixtySix from "./components/SixtySix/SixtySix";

function App() {
  return (
    <div className='App'>
      <Route path='/' exact component={Homepage} />
      <Route path='/play' exact component={SixtySix} />
    </div >
  )
}

export default App
