import { createContext, useState, useRef } from "react";
import styles from "./Game.module.css";
import Board from "./Board";
import Header from "./Header";
import Timer from "./Timer";
import History from "./History";
import Setup from "./Setup";

export const GameContext = createContext();

let i = 0;

export default function Game() {
  const [
    {
      INITIAL_SNAKE_LENGTH,
      INITIAL_VELOCITY,
      CELL_SIZE,
      BOARD_WIDTH,
      SHOW_MOBILE_CONTROLS,
    },
    setGame,
  ] = useState({
    INITIAL_SNAKE_LENGTH: 10,
    INITIAL_VELOCITY: 20,
    CELL_SIZE: 10,
    BOARD_WIDTH: 600,
    SET_MOBILE_CONTROLS: false,
  });

  const [gameHistory, setGameHistory] = useState([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const boardRef = useRef();

  const [gameState, setGameState] = useState({
    gameOver: false,
    gameWon: false,
    gameStarted: false,
  });

  const newGame = ({ attempt, time, gameState }) => {
    if (i >= 0) {
      setGameHistory((state) => [
        ...state,
        { attempt: attempt + 1, time: time, gameState, score },
      ]);
    }
    setScore(0);
    setTime(0);
    i++;
  };

  const screenWidth = window.innerWidth;
  const boardSize = BOARD_WIDTH;

  return (
    <>
      {showHistory && (
        <GameContext.Provider
          value={{
            gameState,
            setGameState,
            newGame,
            gameHistory,
            setShowHistory,
          }}
        >
          <History />
        </GameContext.Provider>
      )}
      <div
        className={styles.game}
        ref={boardRef}
        style={{
          "--board-height":
            boardSize > screenWidth
              ? `${boardSize * (screenWidth / boardSize)}px`
              : "100%",
          // "--scale": screenWidthTarget / (BOARD_WIDTH + CELL_SIZE * 2),
          // "--yOffset": `-${gameState.gameStarted ? newBoardWidth * 0.2 : 0}px`,
        }}
      >
        <div className={styles["game-board-info"]}>
          <GameContext.Provider value={{ gameState, i, score }}>
            <Header />
            {gameState.gameStarted && (
              <div className={styles["game-board-stats"]}>
                <div className={styles.score}> Score: {score}</div>
                <button
                  className={styles.button}
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{
                      width: "18px",
                    }}
                  >
                    <path d="M88 48C101.3 48 112 58.75 112 72V120C112 133.3 101.3 144 88 144H40C26.75 144 16 133.3 16 120V72C16 58.75 26.75 48 40 48H88zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96C160 78.33 174.3 64 192 64H480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256C160 238.3 174.3 224 192 224H480zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480zM16 232C16 218.7 26.75 208 40 208H88C101.3 208 112 218.7 112 232V280C112 293.3 101.3 304 88 304H40C26.75 304 16 293.3 16 280V232zM88 368C101.3 368 112 378.7 112 392V440C112 453.3 101.3 464 88 464H40C26.75 464 16 453.3 16 440V392C16 378.7 26.75 368 40 368H88z" />
                  </svg>
                </button>
                <Timer time={time} setTime={setTime} />
              </div>
            )}
          </GameContext.Provider>
        </div>
        <div className={styles["game-board-container"]}>
          <GameContext.Provider
            value={{
              INITIAL_SNAKE_LENGTH,
              INITIAL_VELOCITY,
              CELL_SIZE,
              BOARD_WIDTH,
              i,
              gameState,
              setGameState,
              newGame,
              setTime,
              setGame,
              time,
              score,
              setScore,
            }}
          >
            <Board />
          </GameContext.Provider>
          <GameContext.Provider
            value={{
              setGameState,
              gameState,
              newGame,
              setGame,
              time,
              i,
              SHOW_MOBILE_CONTROLS,
            }}
          >
            <Setup />
          </GameContext.Provider>
        </div>
      </div>
    </>
  );
}
