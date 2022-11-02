import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [dice, setDice] = useState(1);
  const [buffer, _setBuffer] = useState('');

  const bufferRef = useRef(buffer);

  const appendBuffer = data => {
    bufferRef.current += data;
    _setBuffer(bufferRef.current);
  };

  const keyboardListener = (e) => {
      const key = e.key;
      if (e.keyCode === 27){
        bufferRef.current = '';
        _setBuffer('');
        return;
      }

      appendBuffer(key);
  }

  useEffect(() => {
    document.addEventListener('keydown', keyboardListener);
    return function cleanup() {
      document.removeEventListener('keydown', keyboardListener);
    };
  }, []);

  const handleClick = async () => {
    const result = await window.api.rollDice();
    setDice(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Built using CRA electron-builder-fastapi-python Template.</p>
        <img src={logo} className="App-logo" alt="logo" />
        <button className="Roll-btn" onClick={handleClick}>
          Roll Dice
        </button>
        <p>Dice value from Python: {dice}</p>
        <p>
          Edit <code>public/electron.js</code> or <code>src/App.js</code> and
          save to reload.
        </p>
        <p><div>{buffer}</div></p>
      </header>
    </div>
  );
}

export default App;
