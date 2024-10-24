import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [score, setScore] = useState(0);
  const [colorWord, setColorWord] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const btn = useRef();


  const colorItems = [
    { name: 'Red', color: 'red' },
    { name: 'Green', color: 'green' },
    { name: 'Blue', color: 'blue' },
    { name: 'Yellow', color: 'yellow' },
    { name: 'Black', color: 'black' },
    { name: 'White', color: 'white' },
    { name: 'Pink', color: 'pink' },
    { name: 'Orange', color: 'orange' },
    { name: 'Purple', color: 'purple' },
  ];

  useEffect(() => {
    let interval = null;

    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert('Time is up!'); 
      window.location.reload();
    }

    return () => clearInterval(interval); 
  }, [isActive, seconds]);

  const handleStart = () => {
    setScore(0); 
    setSeconds(60); 
    setIsActive(true); 
    btn.current.style.display = "inherit"; 
    nextQuestion(); 
  };

  const handleShowInstructions = () => {
    setShowInstructions(true); 
  };

  const nextQuestion = () => {
    
    const randomIndex = Math.floor(Math.random() * colorItems.length);
    const { name, color } = colorItems[randomIndex];

    
    let differentColor;
    do {
      const differentIndex = Math.floor(Math.random() * colorItems.length);
      differentColor = colorItems[differentIndex].color;
    } while (differentColor === color);

    setColorWord(name); 
    setCurrentColor(differentColor); 
  };

  const handleAnswer = (selectedColor) => {
    if (selectedColor === currentColor) { 
      setScore(score + 1); 
      alert('Correct!'); 
    } else {
      alert(`Wrong! The correct color is ${currentColor}.`);
      window.location.reload(); 
    }
    nextQuestion(); 
  };

  return (
    <div className="App">
      <div className='container'>
        <h1>Stroop Effect</h1>
        {!showInstructions ? (
          <button onClick={handleShowInstructions} className='btn'>What is That</button>
        ) : (
          <div>
            <h3>
              The Stroop effect is when your brain gets confused between reading a word and recognizing a color. 
              For example, if the word <span>red</span> is written in blue ink, you might take longer to say the color (blue) 
              because your brain is used to reading the word "red" instead. 
              This shows how reading can sometimes interfere with your ability to quickly identify colors.
            </h3>
            <button onClick={handleStart} className='btn'>Start Game</button>
          </div>
        )}
        
        <div ref={btn} className='block' style={{ display: 'none' }}>
          <div className='game' style={{ color: currentColor }}>
            <h2>Identify the Color:</h2>
            <span>{colorWord}</span>
            <div>
              {colorItems.map((item) => (
                <button key={item.name} className='btn' onClick={() => handleAnswer(item.color)}>
                  {item.name}
                </button>
              ))}
            </div>
            <h3>{seconds} seconds remaining</h3>
            <h3>Score: {score}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
