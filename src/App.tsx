import { useEffect, useState } from "react";
import { useKeyboardState } from "./hooks";
import "./App.css";
import { Message } from "./types";
import wordList from "./wordList";
import Toast from "./components/Toast";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";

const initialBoard: string[][] = [];
for (let i = 0; i < 6; i++) {
  const rows: string[] = [];
  for (let j = 0; j < 5; j++) {
    rows.push("");
  }
  initialBoard.push(rows);
}

const App = () => {
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [solution, setSolution] = useState("");
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [firstRow, setFirstRow] = useKeyboardState("qwertyuiop");
  const [secondRow, setSecondRow] = useKeyboardState("asdfghjkl");
  const [lastRow, setLastRow] = useKeyboardState("zxcvbnm");
  const [message, setMessage] = useState<{
    content: string | null;
    delay: number;
  }>({ content: null, delay: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRowValid, setIsRowValid] = useState(false);
  const [disableKeyboard, setDisableKeyboard] = useState(false);

  useEffect(() => {
    const index = Math.floor(Math.random() * (wordList.length - 0 + 1) + 0);
    setSolution(wordList[index]);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    setTimeout(() => {
      setMessage({ content: null, delay: 0 });
      setIsRowValid(false);
      setDisableKeyboard(false);
    }, 3000);
  }, [message]);

  const handleKeyDown = (event: any) => {
    if (isGameOver) {
      return;
    }

    if (disableKeyboard) {
      return;
    }

    if (event.repeat) {
      return;
    }

    const key = event.key ? event.key : event.currentTarget.value;

    if (/^[a-z]{1}$/.test(key) && word.length < 5) {
      setWord(word.concat(key));
    } else if (key === "Backspace") {
      setWord(word.slice(0, -1));
    } else if (key === "Enter") {
      if (word.length < 5) {
        setMessage({ content: "Not enough letters", delay: 0 });
        setIsRowValid(true);
        return;
      } else if (!wordList.includes(word)) {
        setMessage({ content: "Not in the word list", delay: 0 });
        setIsRowValid(true);
        return;
      } else if (word === solution) {
        setMessage({ content: Message[words.length], delay: 1000 });
      } else if (words.length === 5) {
        setMessage({ content: solution.toUpperCase(), delay: 1000 });
      }

      setDisableKeyboard(true);

      setWords(words.concat(word));
      setBoard(
        board.map((row, y) =>
          y === words.length
            ? row.map((color, x) => {
                if (word[x] === solution[x]) {
                  return "correct";
                } else if (solution.includes(word[x])) {
                  return "present";
                } else {
                  return "absent";
                }
              })
            : row
        )
      );
      const setButtonColor = (keys: Map<string, string>) => {
        const keysCopy = new Map(keys);
        for (let i = 0; i < 5; i++) {
          if (keysCopy.has(word[i])) {
            if (word[i] === solution[i]) {
              keysCopy.set(word[i], "correct");
            } else if (solution.includes(word[i])) {
              keysCopy.set(word[i], "present");
            } else {
              keysCopy.set(word[i], "absent");
            }
          }
        }
        return keysCopy;
      };
      setFirstRow(setButtonColor(firstRow));
      setSecondRow(setButtonColor(secondRow));
      setLastRow(setButtonColor(lastRow));

      setIsGameOver(word === solution || words.length === 5);
      setWord("");
    }
  };

  return (
    <main>
      <h1>WORDLE</h1>
      {message.content && (
        <Toast message={message.content} delay={message.delay} />
      )}
      <Board
        board={board}
        words={words}
        word={word}
        solution={solution}
        isRowValid={isRowValid}
      />
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
