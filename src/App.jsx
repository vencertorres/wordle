import { useEffect, useRef, useState } from "react";
import { getWordOfTheDay, wordlist } from "./wordlist";
import "./App.css";

const answers = wordlist;
const answer = getWordOfTheDay();

const messages = [
  "Genius",
  "Magnificent",
  "Impressive",
  "Splendid",
  "Great",
  "Phew",
];

function App() {
  const [history, setHistory] = useState([]);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const rowRef = useRef([]);
  const allowTyping = useRef(true);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const currentRow = history.length;

  if (history.includes(answer)) {
    setTimeout(() => {
      setMessage(messages[currentRow - 1]);
      rowRef.current[currentRow - 1].classList.add("success");
    }, 1800);
  }

  if (currentRow === 6) {
    setTimeout(() => setMessage(answer.toUpperCase()), 1800);
  }

  function showMessage(current, next, delay) {
    setMessage(current);
    rowRef.current[currentRow].classList.add("invalid");

    setTimeout(() => {
      setMessage(next);
      rowRef.current[currentRow].classList.remove("invalid");
    }, delay);
  }

  function handleKeyDown(event) {
    if (!allowTyping.current || history.includes(answer) || currentRow === 6)
      return;

    const key = event.key ?? event.target.value;

    if (/^[a-z]$/.test(key) && guess.length < 5) {
      setGuess(guess + key);
    } else if (key === "Backspace") {
      setGuess(guess.slice(0, -1));
    } else if (key === "Enter") {
      if (guess.length < 5) {
        showMessage("Not enough letters", "", 1000);
      } else if (!answers.includes(guess)) {
        showMessage("Not in word list", "", 1000);
      } else {
        setGuess("");
        setHistory([...history, guess]);

        allowTyping.current = false;
        setTimeout(() => (allowTyping.current = true), 1800);
      }
    }
  }

  return (
    <>
      <main>
        <header>
          <h1>Wordle</h1>
        </header>

        {message && <div className="message">{message}</div>}

        <div className="board">
          <div>
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="row"
                ref={(node) => (rowRef.current[i] = node)}
              >
                {Array.from({ length: 5 }, (_, j) => {
                  return (
                    <div
                      key={j}
                      className={"tile" + (i < currentRow ? " revealed" : "")}
                      style={{
                        animationDelay: i < currentRow ? j * 100 + "ms" : "",
                      }}
                    >
                      <div
                        className="inner"
                        style={{
                          transitionDelay: i < currentRow ? j * 300 + "ms" : "",
                        }}
                      >
                        <div className="front">
                          {i < currentRow
                            ? history[i][j]
                            : i === currentRow
                            ? guess[j]
                            : ""}
                        </div>
                        <div
                          className={
                            "back" +
                            (i < currentRow ? getColor(history[i][j], j) : "")
                          }
                        >
                          {i < currentRow
                            ? history[i][j]
                            : i === currentRow
                            ? guess[j]
                            : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <Keyboard onClick={handleKeyDown} word={history.at(-1)} />
      </main>
    </>
  );
}

export default App;

function Keyboard({ onClick, word }) {
  const [map, setMap] = useState(() => new Map());

  useEffect(() => {
    if (word) {
      const copy = new Map(map);
      [...word].forEach((letter, i) => copy.set(letter, getColor(letter, i)));
      setMap(copy);
    }
  }, [word]);

  const letters = [[..."qwertyuiop"], [..."asdfghjkl"], [..."zxcvbnm"]];

  return (
    <div className="keyboard">
      {letters.map((row, i) => (
        <div key={i} className="keyboard-row">
          {i === 1 && <div className="spacer"></div>}
          {i === 2 && (
            <button className="btn big" value="Enter" onClick={onClick}>
              Enter
            </button>
          )}
          {row.map((letter, j) => (
            <button
              key={letter}
              className={"btn" + (map.get(letter) ?? "")}
              value={letter}
              onClick={onClick}
            >
              {letter}
            </button>
          ))}
          {i === 1 && <div className="spacer"></div>}
          {i === 2 && (
            <button className="btn big" value="Backspace" onClick={onClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function getColor(letter, index) {
  if (answer[index] === letter) {
    return " correct";
  }

  if (answer.includes(letter)) {
    return " present";
  }

  return " absent";
}
