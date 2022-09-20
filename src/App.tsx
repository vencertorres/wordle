import { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Toast from "./components/Toast";
import { Letter, LetterState } from "./types";
import { getWordOfTheDay, wordlist } from "./wordlist";

const initialBoardState: any[][] = [];
for (let i = 0; i < 6; i++) {
  initialBoardState.push([]);
}

const initialKeyState: Letter = {};
const letters = "abcdefghijklmnopqrstuvwxyz";
for (let letter of letters) {
  initialKeyState[letter] = LetterState.Initial;
}

const message = ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"];

const answer = getWordOfTheDay();

export default function App() {
  const [boardState, setBoardState] = useState<Letter[][]>(initialBoardState);
  const [keyState, setkeyState] = useState(initialKeyState);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const [allowKeyPress, setKeyPress] = useState(true);
  const [toast, setToast] = useState("");

  const rowRef = useRef<HTMLDivElement>(null!);

  function handleKey(e: KeyboardEvent | string) {
    if (success) return;
    if (!allowKeyPress) return;

    const key = e instanceof KeyboardEvent ? e.key : e;

    if (e instanceof KeyboardEvent && e.repeat) return;

    if (/^[a-z]$/.test(key.toLowerCase())) {
      if (boardState[currentRowIndex].length === 5) return;

      setBoardState(
        boardState.map((word, i) =>
          i === currentRowIndex ? [...word, { [key]: LetterState.Initial }] : word
        )
      );
    }

    if (key === "Backspace") {
      setBoardState(
        boardState.map((word, i) => (i === currentRowIndex ? word.slice(0, -1) : word))
      );
    }

    if (key === "Enter") {
      if (boardState[currentRowIndex].length < 5) {
        rowRef.current.className = "row invalid";
        setToast("Not enough letters");
        setTimeout(() => {
          rowRef.current.className = "row";
          setToast("");
        }, 1000);
        return;
      }

      const guess = boardState[currentRowIndex].map((item) => Object.keys(item)).join("");

      if (!wordlist.includes(guess)) {
        rowRef.current.className = "row invalid";
        setToast("Not in word list");
        setTimeout(() => {
          rowRef.current.className = "row";
          setToast("");
        }, 1000);
        return;
      }

      setKeyPress(false);

      setCurrentRowIndex(currentRowIndex + 1);

      const nextBoardState = boardState.map((word, i) => {
        if (i === currentRowIndex) {
          return word.map((letterState, j) => {
            const letter = guess.charAt(j);
            if (answer.includes(letter)) {
              if (letter === answer.charAt(j)) {
                return { ...letterState, [letter]: LetterState.Correct };
              } else {
                return { ...letterState, [letter]: LetterState.Present };
              }
            } else {
              return { ...letterState, [letter]: LetterState.Absent };
            }
          });
        }
        return word;
      });

      setBoardState(nextBoardState);

      let nextKeyState = { ...keyState };

      nextBoardState.forEach((word, i) => {
        if (i === currentRowIndex) {
          word.forEach((letterState, j) => {
            const letter = guess.charAt(j);
            if (nextKeyState[letter] !== LetterState.Correct) {
              nextKeyState = { ...nextKeyState, [letter]: letterState[letter] };
            }
          });
        }
      });

      setkeyState(nextKeyState);

      setTimeout(() => {
        if (currentRowIndex === 5 && !success) {
          setToast(answer.toUpperCase());
          setKeyPress(false);
        }

        if (guess === answer) {
          setToast(message[currentRowIndex]);
          setSuccess(true);
        }

        if (currentRowIndex < 5) {
          setKeyPress(true);
        }
      }, 1600);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <>
      <header>
        <h1>Wordle</h1>
      </header>
      <Toast message={toast} />
      <main>
        <Board
          boardState={boardState}
          success={success}
          currentRowIndex={currentRowIndex}
          ref={rowRef}
        />
        <Keyboard handleKey={handleKey} keyState={keyState} />
      </main>
    </>
  );
}
