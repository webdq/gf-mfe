import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    counter: 0
  };
  add = () => {
    const counter = this.state.counter + 1;
    this.setState({ counter });
  };
  handleClick = () => {
    window.obj.react;
  };
  handleClick2 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('promise reject'));
      }, 2000);
    });
  };
  render() {
    if (this.state.counter >= 5) {
      throw new Error('render error');
    }
    return (
      <div className="App">
        <h1>
          <button onClick={this.add} type="button" className="btn btn-default">
            render error : {this.state.counter}
          </button>
          <button onClick={this.handleClick} type="button" className="btn btn-default">
            click error
          </button>
          <button onClick={this.handleClick2} type="button" className="btn btn-default">
            promise error
          </button>
        </h1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
