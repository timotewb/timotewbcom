import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const promptStr = "?> ";
  const [command, setCommand] = useState(promptStr);
  const [history, setHistory] = useState<string[]>([]);
  const inputTextRef = useRef<HTMLDivElement>(null);

  // monitor what the user is entering into the command
  const handleCommandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // test for chagnes to the prefix
    const userInput = e.target.value;
    const firstChar = userInput[0];
    const secondChar = userInput[1];
    if (userInput.startsWith(promptStr)) {
      setCommand(userInput);
    } else {
      if (firstChar == promptStr[0] && secondChar != promptStr[1]) {
        setCommand(promptStr + userInput.slice(1));
      } else if (userInput === "") {
        setCommand(promptStr);
      }
    }
  };

  // catch ctrl-c to "cancel" current line
  const handleCopy = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    setHistory((prevHistory) => [...prevHistory, command + " ^C"]);
    setCommand(promptStr);
    e.preventDefault();
  };

  // scroll up when the user hits the bottom
  useEffect(() => {
    if (inputTextRef.current) {
      inputTextRef.current.scrollTop = inputTextRef.current.scrollHeight;
    }
  }, [command]);

  // take input and execute based on value
  const executeCommand = () => {
    if (command.trim().toLowerCase() === promptStr + "clear") {
      setHistory([]);
    } else if (command.trim().toLowerCase() === promptStr + "help") {
      setHistory((prevHistory) => [...prevHistory, command]);
      setHistory((prevHistory) => [
        ...prevHistory,
        "Website currently under construction. Please check back soon!",
      ]);
    } else {
      setHistory((prevHistory) => [...prevHistory, command]);
    }
    setCommand(promptStr);
  };

  return (
    <div className="terminal-container">
      <div className="header">
        <div className="greeting">welcome</div>
      </div>
      <div className="input-container" ref={inputTextRef}>
        {history.map((item, index) => (
          <span key={index} dangerouslySetInnerHTML={{ __html: item }}></span>
        ))}
        <textarea
          className="input-text"
          contentEditable
          suppressContentEditableWarning
          value={command}
          onChange={handleCommandChange}
          onCopy={handleCopy}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              executeCommand();
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
