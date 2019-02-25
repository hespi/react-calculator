import React, { Component } from 'react';
import Calculator from './components/Calculator/Calculator'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>
            React Calculator
          </h1>
        </header>
        <section className="app-content">
          <Calculator />
        </section>
      </div>
    );
  }
}

export default App;
