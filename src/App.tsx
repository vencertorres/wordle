import { useEffect, useState } from "react";
import { useKeyboardState } from "./hooks";
import { Message } from "./types";
import wordList from "./wordList";
import getNewWord from "./utils/getNewWord";
import setButtonColor from "./utils/setButtonColor";
import "./App.css";
import Toast from "./components/Toast";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";

const App = () => {
  const [firstRow, setFirstRow] = useKeyboardState("qwertyuiop");
  const [secondRow, setSecondRow] = useKeyboardState("asdfghjkl");
  const [lastRow, setLastRow] = useKeyboardState("zxcvbnm");
  const [solution, setSolution] = useState("");
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRowValid, setIsRowValid] = useState(true);
  const [isKeyboardDisabled, setIsKeyboardDisabled] = useState(false);

  useEffect(() => {
    const word = getNewWord();
    setSolution(word);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
      setIsRowValid(true);
      setIsKeyboardDisabled(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [message, isRowValid, isKeyboardDisabled]);

  const handleKeyDown = (event: any) => {
    if (event.repeat || isGameOver || isKeyboardDisabled) {
      return;
    }

    const key = event.key ? event.key : event.currentTarget.value;

    if (/^[a-z]{1}$/.test(key) && word.length < 5) {
      setWord(word.concat(key));
    } else if (key === "Backspace") {
      setWord(word.slice(0, -1));
    } else if (key === "Enter") {
      if (word.length < 5) {
        setMessage("Not enough letters");
        setIsRowValid(false);
        return;
      } else if (!wordList.includes(word)) {
        setMessage("Not in the word list");
        setIsRowValid(false);
        return;
      } else if (words.length === 5) {
        setMessage(solution.toUpperCase());
        setTimeout(() => {
          setMessage(solution.toUpperCase());
        }, 1000);
      } else if (word === solution) {
        setTimeout(() => {
          setMessage(Message[words.length]);
        }, 1000);
      }

      setIsKeyboardDisabled(true);

      setFirstRow(setButtonColor(firstRow, word, solution));
      setSecondRow(setButtonColor(secondRow, word, solution));
      setLastRow(setButtonColor(lastRow, word, solution));

      setIsGameOver(word === solution || words.length === 5);
      setWords(words.concat(word));
      setWord("");
    }
  };

  return (
    <main>
      <h1>WORDLE</h1>
      <Toast message={message} />
      <Board words={words} word={word} solution={solution} valid={isRowValid} />
      <Keyboard
        firstRow={firstRow}
        secondRow={secondRow}
        lastRow={lastRow}
        handleKeyDown={handleKeyDown}
      />
    </main>
  );
};

export default App;
