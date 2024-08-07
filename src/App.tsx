import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import RunCommand from "./helper/RunCommand";

function readFromClipboard(): Promise<string | undefined> {
  return new Promise(async (resolve, reject) => {
    try {
      const text = await navigator.clipboard.readText();
      resolve(text);
    } catch (error) {
      reject(error);
    }
  });
}

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {}
}

function App() {
  const promptStr = "?> ";
  const maxTerminalHistory = 100;
  const [command, setCommand] = useState(promptStr);
  const [history, setHistory] = useState<string[]>([]);
  const inputTextRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //----------------------------------------------------------------------------------------
  // user input and keybaord events
  //----------------------------------------------------------------------------------------
  // monitor what the user is entering into the command
  const handleCommandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // test for chagnes to the prefix
    const userInput = e.target.value;
    const firstChar = userInput[0];
    const secondChar = userInput[1];
    if (userInput.startsWith(promptStr)) {
      setCommand(userInput);
    } else {
      if (firstChar === promptStr[0] && secondChar !== promptStr[1]) {
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

  //----------------------------------------------------------------------------------------
  // mouse events
  //----------------------------------------------------------------------------------------
  // catch right click
  const handleRightClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    // Check if there's selected text then copy
    if (window.getSelection()?.toString().trim() !== "") {
      const sel = window.getSelection();
      if (sel !== null && sel.getRangeAt && sel.rangeCount) {
        const selection = window.getSelection()?.toString();

        // write selection to clipbaord
        try {
          await writeToClipboard(selection || "");
        } catch (error) {
          console.error("handleRightClick():", error);
        }
        sel.removeRange(sel.getRangeAt(0));
      }
    } else {
      try {
        // read from clipboard
        const clipboardText = await readFromClipboard();
        setCommand(command + clipboardText);
      } catch (error) {
        console.error("handleRightClick():", error);
      }
    }
  };

  //----------------------------------------------------------------------------------------
  // terminal behaviour
  //----------------------------------------------------------------------------------------
  // scroll up when the user hits the bottom
  useEffect(() => {
    setTimeout(() => {
      if (inputTextRef.current) {
        console.log(
          "inputTextRef.current.scrollHeight:",
          inputTextRef.current.scrollHeight
        );
        inputTextRef.current.scrollTop = inputTextRef.current.scrollHeight;
      }
    }, 0);
  }, [history]);

  useEffect(() => {
    if (textAreaRef.current) {
      // Reset the height to auto first
      textAreaRef.current.style.height = "auto";
      // Then set the height to the scrollHeight
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [command]);

  // limit terminal history to 100 rows
  useEffect(() => {
    if (history.length > maxTerminalHistory) {
      setHistory(history.slice(-maxTerminalHistory));
    }
  }, [history]);

  //----------------------------------------------------------------------------------------
  // command execution
  //----------------------------------------------------------------------------------------
  const executeCommand = () => {
    let escapedPrefix = promptStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const cmd = command.trim().replace(new RegExp("^" + escapedPrefix), "");
    console.log(cmd);
    if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "help") {
      setHistory((prevHistory) => [...prevHistory, command]);
      setHistory((prevHistory) => [
        ...prevHistory,
        "Website currently under construction. Please check back soon!",
      ]);
    } else if (cmd !== "") {
      const response = RunCommand(cmd);
      response.then((data) => {
        console.log(data);
        if (data.trim() === "") {
          setHistory((prevHistory) => [...prevHistory, command]);
          setHistory((prevHistory) => [
            ...prevHistory,
            cmd + ": command not found",
          ]);
        } else {
          setHistory((prevHistory) => [...prevHistory, command]);
          setHistory((prevHistory) => [...prevHistory, data]);
        }
      });
    } else {
      setHistory((prevHistory) => [...prevHistory, command]);
      setHistory((prevHistory) => [
        ...prevHistory,
        cmd + ": command not found",
      ]);
    }
    setCommand(promptStr);
  };

  //----------------------------------------------------------------------------------------
  // return
  //----------------------------------------------------------------------------------------
  return (
    <div className="terminal-container" onContextMenu={handleRightClick}>
      <div className="header">
        <div className="greeting">welcome</div>
      </div>
      <div className="input-container" ref={inputTextRef}>
        {history.map((item, index) => (
          <span key={index} dangerouslySetInnerHTML={{ __html: item }}></span>
        ))}
        <textarea
          ref={textAreaRef}
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
