import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import './CSS/base.css'
import './CSS/sass/main.css'

import Header from './component/Layout/Header';
import Main from './component/Layout/Main'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <Main />
      </div>
    );
  }
}

export default App;
