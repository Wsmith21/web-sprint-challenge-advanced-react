import React, { Component } from 'react';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
      limitReachedMessage: '',
    };
  }

  getXY() {
    const x = (this.state.index % 3) + 1;
    const y = Math.floor(this.state.index / 3) + 1;
    return {x,y};
    
  }

  getXYMessage() {
    const { x, y } = this.getXY();
    console.log(x, y)
    return `Coordinates (${x}, ${y})`;
    
  }

  reset() {
    this.setState({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
      limitReachedMessage: '',
    }, () => {
      const coordinatesElement = document.getElementById('coordinates');
      if (coordinatesElement) coordinatesElement.textContent = this.getXYMessage();
    });
  }
  
  getNextIndex(direction) {
    const x = this.state.index % 3;
    const y = Math.floor(this.state.index / 3);
  
    let nextIndex;
  
    switch (direction) {
      case 'left':
        nextIndex = x > 0 ? this.state.index - 1 : this.state.index;
        break;
      case 'right':
        nextIndex = x < 2 ? this.state.index + 1 : this.state.index;
        break;
      case 'up':
        nextIndex = y > 0 ? this.state.index - 3 : this.state.index;
        break;
      case 'down':
        nextIndex = y < 2 ? this.state.index + 3 : this.state.index;
        break;
      default:
        nextIndex = this.state.index;
    }
  
    return nextIndex;
  }
  
  move(direction) {
    const nextIndex = this.getNextIndex(direction);
  
    if (nextIndex !== this.state.index) {
      this.setState(prevState => ({
        index: nextIndex,
        steps: prevState.steps + 1,
        limitReachedMessage: '',
        message: '',
      }), () => {
        
        const coordinatesElement = document.getElementById('coordinates');
        if (coordinatesElement) coordinatesElement.textContent = this.getXYMessage();
      });
    } else {
      this.setState({
        limitReachedMessage: `You can't go ${direction}`,
        message: `You can't go ${direction}`,
      });
    }
  }
  
  
  
  onChange = (evt) => {
    const { id, value } = evt.target;
    if (id === 'email') {
      this.setState({ email: value });
    }
  }

  onSubmit = async (evt) => {
    evt.preventDefault();
  
    try {
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          x: this.getXY().x,
          y: this.getXY().y,
          steps: this.state.steps,
          email: this.state.email,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        this.setState({
          message: data.message,
          email: initialEmail,
        }, () => {
          
          const coordinatesElement = document.getElementById('coordinates');
          if (coordinatesElement) coordinatesElement.textContent = this.getXYMessage();
        });
      } else {
        this.setState({
          message: data.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        message: 'An error occurred. Please try again later.',
      });
    }
  }
  componentDidMount() {
    const coordinatesElement = document.getElementById('coordinates');
    if (coordinatesElement) coordinatesElement.textContent = this.getXYMessage();

    const stepsElement = document.getElementById('steps');
    if (stepsElement) {
      const plural = this.state.steps === 1 ? '' : 's';
      const message = `You moved ${this.state.steps} time${plural}`;
      stepsElement.textContent = message;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.steps !== this.state.steps) {
      const stepsElement = document.getElementById('steps');
      if (stepsElement) {
        const plural = this.state.steps === 1 ? '' : 's';
        const message = `You moved ${this.state.steps} time${plural}`;
        stepsElement.textContent = message;
      }
    }
  }

  render() {
    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (9, 9)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
              {idx === this.state.index ? 'B' : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
          <h3 id="limit">{this.state.limitReachedMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.move('left')}>
            LEFT
          </button>
          <button id="up" onClick={() => this.move('up')}>
            UP
          </button>
          <button id="right" onClick={() => this.move('right')}>
            RIGHT
          </button>
          <button id="down" onClick={() => this.move('down')}>
            DOWN
          </button>
          <button id="reset" onClick={() => this.reset()}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input id="submit" type="submit" />
        </form>
      </div>
    );
  }
}

export default AppClass;
