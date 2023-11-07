// Write your tests here
import React, { Component } from 'react';

class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 1,
      y: 1,
      steps: 1,
      email: '',
      successMessage: '',
      errorMessage: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          successMessage: data.message,
          errorMessage: '',
        });
      } else {
        this.setState({
          errorMessage: data.message,
          successMessage: '',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        errorMessage: 'An error occurred. Please try again later.',
        successMessage: '',
      });
    }
  };

  render() {
    const { x, y, steps, email, successMessage, errorMessage } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            X:
            <input
              type="number"
              name="x"
              min="1"
              max="3"
              value={x}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Y:
            <input
              type="number"
              name="y"
              min="1"
              max="3"
              value={y}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Steps:
            <input
              type="number"
              name="steps"
              min="1"
              value={steps}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    );
  }
}

export default AppClass;
