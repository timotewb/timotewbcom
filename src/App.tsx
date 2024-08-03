import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleCommandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommand(e.target.value);
  };

  const executeCommand = () => {
    if (command.trim().toLowerCase() === 'clear') {
      setHistory([]);
    } else {
      setHistory(prevHistory => [...prevHistory, command]);
      setCommand('');
    }
  
    // Simulate API call
    fetch(`https://api.example.com/${command}`)
      .then(response => response.text())
      .then(data => {
        // Display data in the terminal
        console.log(data); // Replace with actual display logic
      });
  };

  return (
    <>
<textarea
  contentEditable
  suppressContentEditableWarning
  value={command}
  onChange={handleCommandChange}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      executeCommand();
    }
  }}
/>
{showHistory && (
  <div>
    {history.map((cmd, index) => (
      <p key={index}>{cmd}</p>
    ))}
  </div>
)}
<button onClick={() => setShowHistory(!showHistory)}>Toggle History</button>
</>
  );
}

export default App;