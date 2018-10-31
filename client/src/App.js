import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Greeting = props => {
  //let { message1, message2 } = props;

  return (
    <div>
      <h1>{props.message1}</h1>
      <p />
      <h2>{props.message2}</h2>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      greeting: 'Welcome to state',
      message: '',
      movies: [
        { title: 'I am legend' },
        { title: 'Avengers' },
        { title: 'Star Trek' }
      ]
    };
  }
  render() {
    return (
      <div className="App">
        <Greeting
          message1="Hi from component 1!"
          message2="This is message 2 "
        />
        <label>
          <h3>{this.state.greetings}</h3>
        </label>
        <p />
        <ul>
          {this.state.movies.map(movie => {
            return <li>{movie.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
