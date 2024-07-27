import { useState, useEffect } from "react";
import useGlobalKeyboardListener from "./useGlobalKeyboardListener";
import "./Landing.css";

function Landing() {
  console.log("Hello, thank you for visiting my site. I hope you enjoy.");
  const [displayText, setDisplayText] = useState<string>("chur");
  const [keyString, setKeyString] = useState<string>("");
  const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false);
  const [canChange, setCanChange] = useState<boolean>(true);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const addSpan = (note: string) => {
    return note
      .split("")
      .map((letter, index) => <span key={index}>{letter}</span>);
  };

  useGlobalKeyboardListener((event, currentKey) => {
    if (keyString.length > 100) {
      setKeyString("");
    }
    setKeyString((keyString) => keyString + currentKey);
  }, keyString);

  useEffect(() => {
    if (keyString === "chur" && canChange) {
      setKeyString("");
      setCanChange(false);
      setShouldFadeOut(true);
      setShowAnimation(true);
      setTimeout(() => {
        setDisplayText("chur bro"); // Change to the next text after delay
        setShouldFadeOut(false);
      }, 2000); // Delay to allow fade-out animation
    }
  }, [keyString, canChange, showAnimation]);

  return (
    <>
      <div className="container">
        {showAnimation && (
          <span className="pacman">
            <span className="pacman__mouth"></span>
          </span>
        )}

        <span className={`fade ${shouldFadeOut ? "fade-out" : ""}`}>
          {displayText}
        </span>
      </div>

      <p className="animatedtext">{addSpan("hello world")}</p>
    </>
  );
}

export default Landing;