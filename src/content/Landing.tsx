import { useState, useEffect } from "react";
import useGlobalKeyboardListener from "./useGlobalKeyboardListener";
import "./Landing.css";

function Landing() {
  const [displayText, setDisplayText] = useState<string>("chur");
  const [keyString, setKeyString] = useState<string>("");
  const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false);
  const [canChange, setCanChange] = useState<boolean>(true);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [canEat, setCanEat] = useState<boolean>(false);

  const addSpan = (note: string) => {
    type SpanStyleType = {
      animationDelay?: string;
      paddingLeft?: string;
    };
    const delay = 1;
    return note.split("").map((letter, index) => {
      index = index / 2 + delay;
      let spanStyle: SpanStyleType = { animationDelay: `${index}s` };
      // Check if the letter is a whitespace character and adjust styling if needed
      if (/[\s]/.test(letter)) {
        spanStyle = { ...spanStyle, paddingLeft: ".5em" };
        letter = "";
      }
      return (
        <span style={spanStyle} key={index}>
          {letter}
        </span>
      );
    });
  };

  const paku = () => {
    return (
      <div className="pakuContainer">
        <div id="paku">
          <div id="kuchi"></div>
        </div>
      </div>
    );
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

      // wait for initial text to fadeOut, then start fadeIn of new text
      setTimeout(() => {
        setDisplayText("chur bro");
        setShouldFadeOut(false);
      }, 2000);

      // Once new text is displayed, start eating
      setTimeout(() => {
        setCanEat(true);
      }, 7000);
    }
  }, [keyString, canChange, showAnimation, canEat]);

  return (
    <>
      <div className="Content">
        <div className="landingH1">
          <span
            className={` ${
              shouldFadeOut ? "landingH1-fadeOut" : "landingH1-fadeIn"
            } ${canEat ? "eatwords" : ""} `}
          >
            {addSpan(displayText)}
          </span>
        </div>
        {canEat ? paku() : null}
      </div>
    </>
  );
}

export default Landing;
