import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const promptStr = "?> ";
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState<string[]>([])
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const handleTerminalInput = (event: React.ChangeEvent<HTMLDivElement>) => {
    console.log(event.target.textContent);
    setCommand(event.target.textContent||"");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "Enter"){
      setHistory([...history, command]);
      setCommand("");
      terminalInputRef.current!.innerHTML = "<span>" +promptStr +"</span>";
    }
  }

  useEffect(() => {
    if (terminalInputRef.current) {
      placeCaretAtEnd(terminalInputRef.current);
    }
  }, [history]);

  function placeCaretAtEnd(element: HTMLDivElement | null) {
    if (!element) return;

    const range = document.createRange();
    const sel = window.getSelection();

    if (sel) {
      sel.removeAllRanges();
      range.selectNodeContents(element);
      range.collapse(false);
      sel.addRange(range);
    }

    // Focusing the editable div
    element.focus();
  }

  return (
    <div className="App">
      <div className='header'>
        welcome
      </div>
      <div className='terminal'>
      {history.map((item, index) => (
          <div key={index} className='history'>{item}</div>
        ))}
        <div ref={terminalInputRef} className='input' contentEditable="true" onInput={handleTerminalInput} onKeyDown={handleKeyDown}>
        <span>{promptStr}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
