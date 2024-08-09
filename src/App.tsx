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
  const [isLoading, setIsLoading] = useState(true);
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
    console.log("cmd:", cmd);
    if (cmd === "clear") {
      setHistory([]);
    } else if (cmd !== "") {
      const response = RunCommand(cmd);
      response.then((data) => {
        if (data.responseCode === 404) {
          setHistory((prevHistory) => [...prevHistory, command]);
          setHistory((prevHistory) => [
            ...prevHistory,
            "<i>" + cmd + "</i>" + ": command not found",
          ]);
        } else if (data.responseCode === 200) {
          setHistory((prevHistory) => [...prevHistory, command]);
          setHistory((prevHistory) => [...prevHistory, data.data || ""]);
        } else if (data.responseCode !== 404 && data.responseCode > 0) {
          setHistory((prevHistory) => [...prevHistory, command]);
          setHistory((prevHistory) => [
            ...prevHistory,
            cmd +
              ": sorry, could not figure that one out. Please try again later.",
          ]);
        }
        setCommand(promptStr);
      });
    }
    setCommand(promptStr);
  };

  //----------------------------------------------------------------------------------------
  // first page load
  //----------------------------------------------------------------------------------------
  const Popup = () => {
    return (
      <div className="popup-container">
        <div className="popup">
          <p>Just getting things ready.</p>
        </div>
      </div>
    );
  };
  useEffect(() => {
    var response = RunCommand("greeting");
    response.then((data) => {
      setIsLoading(false);
      setHistory([data.data || ""]);
    });
  }, []);

  //----------------------------------------------------------------------------------------
  // return
  //----------------------------------------------------------------------------------------
  return (
    <>
      {isLoading && <Popup />}
      <div className="terminal-container" onContextMenu={handleRightClick}>
        <div className="header">
          <div className="greeting">{isLoading ? "loading..." : ""}</div>
        </div>
        <div className="input-container" ref={inputTextRef}>
          {history.map((item, index) => (
            <span
              className="history"
              key={index}
              dangerouslySetInnerHTML={{ __html: item }}
            ></span>
          ))}
          <textarea
            ref={textAreaRef}
            className="input-text"
            contentEditable
            suppressContentEditableWarning
            value={isLoading ? "" : command}
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
    </>
  );
}

export default App;
