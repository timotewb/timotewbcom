import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const promptStr = "?> ";
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState<string[]>([])
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const handleTerminalInput = (event: React.ChangeEvent<HTMLDivElement>) => {

    setCommand(event.target.textContent||"");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const cmd = trimPrefix(command, "?>").trim()
    if (event.key === "Enter"){
      if (cmd === "clear"){
        setHistory([]);
      } else {
        setHistory([...history, cmd]);
      }
      setCommand("");
      terminalInputRef.current!.innerHTML = '<span class="prompt" contentEditable="false">' +promptStr +"</span>";
    }
  }

  useEffect(() => {
    if (terminalInputRef.current) {
      placeCaretAtEnd(terminalInputRef.current);
    }
  }, [history, command]);

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
          <div key={index} className='history'><span className="prompt">{promptStr}</span>{item}</div>
        ))}
        <div ref={terminalInputRef} className='input' contentEditable="true" onInput={handleTerminalInput} onKeyDown={handleKeyDown}>
          <span className="prompt" contentEditable="false">{promptStr}</span>
        </div>
      </div>
    </div>
  );
}

export default App;

function trimPrefix(str: string, prefix: string): string {
  if (str.startsWith(prefix)) {
      return str.substring(prefix.length);
  } else {
      return str;
  }
}