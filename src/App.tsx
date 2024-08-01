import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const prefix = '<span className="App-input-prfx">?></span>';
  const suffix = "<span className='App-input-prfx'>|</span>";
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
    let newValue = "";
    if (event.currentTarget.textContent) {
      console.log(event.currentTarget.textContent);
      const currentValue = event.currentTarget.textContent;
      newValue = `${prefix}${currentValue}${suffix}`;
    }
    setInputText(newValue);
  };

  const prefixText = () => (
    <>
    <span className="App-input-prfx">?&gt;</span> {inputText}
    </>
  );

  return (
    <div className="App">
      <div className="App-header">
        <div className="App-greeting">welcome</div>
      </div>
      <div className="App-input-container">
        <div
          className="App-input-text"
          contentEditable
          tabIndex={0}
          onChange={handleInputChange}
        >{prefixText()}{inputText}</div>
      </div>
    </div>
  );
}

export default App;
