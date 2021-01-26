import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import FirstComp, { SecondComp } from './components/learning-examples/FirstComp';
import ThirdComp from './components/learning-examples/ThirdComp';
// eslint-disable-next-line no-unused-vars
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';

class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* <Counter /> */}
        <TodoApp />
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
class LearningComponents extends Component {
  render() {
    return (
      <div className='LearningComponents'>
        My Hello World:
        <FirstComp />
        <SecondComp />
        <ThirdComp />
      </div>
    );
  }
}

export default App;
