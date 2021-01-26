import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Counter.css";

export class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };

    this.increment = this.increment.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment(by) {
    this.setState((prevState) => {
      return { counter: prevState.counter + by };
    });
  }

  reset() {
    this.setState({ counter: 0 });
  }

  // render= () => {
    render() {
    // const style= { fontSize: "50px" }
    return (
      <div className="counter">
        <CounterButton incrementMethod={this.increment} />
        <CounterButton incBy={5} incrementMethod={this.increment} />
        <CounterButton incBy={10} incrementMethod={this.increment} />
        <span
          className="count"
          // style={{fontSize: "50px"}}
          // style = {style}
        >
          {this.state.counter}
        </span>
        <div>
          <button className="reset" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

class CounterButton extends Component {
  render() {
    return (
      <div className="counterButton">
        <button onClick={() => this.props.incrementMethod(this.props.incBy)}>+{this.props.incBy}</button>
        <button onClick={() => this.props.incrementMethod(-this.props.incBy)}>-{this.props.incBy}</button>
      </div>
    );
  }
}

CounterButton.defaultProps = {
  incBy: 1,
};
CounterButton.propTypes = {
  incBy: PropTypes.number,
};

export default Counter;
