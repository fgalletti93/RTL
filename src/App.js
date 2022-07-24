import React, {useState} from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red')
  const [disabled, setDisabled] = useState(false)
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'



  return (
    <div className="App">
      <button 
        disabled={disabled}
        style={{backgroundColor: buttonColor}}
        onClick={() => setButtonColor(newButtonColor)}  
      >
        Change to {newButtonColor}
      </button>
      <input 
        type="checkbox" 
        defaultChecked={disabled}
        aria-checked={disabled}
        onClick={(e) => setDisabled(e.target.checked)}
      />
    </div>
  );
}

export default App;
