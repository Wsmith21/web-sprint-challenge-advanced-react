import React, { useState, useEffect } from 'react';



const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  const [limitReachedMessage, setLimitReachedMessage] = useState('');

  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
    setLimitReachedMessage(''); 
  }

  function getNextIndex(direction) {
    const x = index % 3;
    const y = Math.floor(index / 3);

    let nextIndex;

    switch (direction) {
      case 'left':
        nextIndex = x > 0 ? index - 1 : index;
        break;
      case 'right':
        nextIndex = x < 2 ? index + 1 : index;
        break;
      case 'up':
        nextIndex = y > 0 ? index - 3 : index;
        break;
      case 'down':
        nextIndex = y < 2 ? index + 3 : index;
        break;
      default:
        nextIndex = index;
    }

    return nextIndex;
  }

  function move(direction) {
    const nextIndex = getNextIndex(direction);

    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setLimitReachedMessage('');
      setMessage(''); 
    } else {
      setLimitReachedMessage(`You can't go ${direction}`);
      setMessage(`You can't go ${direction}`); 
  }
}
  
  function onChange(evt) {
    const { id, value } = evt.target;
    if (id === 'email') {
      setEmail(value);
    }
  }

  async function onSubmit(evt) {
    evt.preventDefault();
  
    try {
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          x: getXY().x,
          y: getXY().y,
          steps: steps,
          email: email,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
        setEmail(initialEmail); 
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  }
  useEffect(() => {
    const coordinatesElement = document.getElementById('coordinates');
    if (coordinatesElement) coordinatesElement.textContent = getXYMessage();

    const stepsElement = document.getElementById('steps');
    if (stepsElement) {
      const plural = steps === 1 ? '' : 's';
      const message = `You moved ${steps} time${plural}`;
      stepsElement.textContent = message;
    }
  }, [steps]);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
        <h3 id="limit">{limitReachedMessage}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>
          LEFT
        </button>
        <button id="up" onClick={() => move('up')}>
          UP
        </button>
        <button id="right" onClick={() => move('right')}>
          RIGHT
        </button>
        <button id="down" onClick={() => move('down')}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
