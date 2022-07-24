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
    { INITIAL_SNAKE_LENGTH, INITIAL_VELOCITY, CELL_SIZE, BOARD_WIDTH },
    setGame,
  ] = useState({
    INITIAL_SNAKE_LENGTH: 10,
    INITIAL_VELOCITY: 20,
    CELL_SIZE: 10,
    BOARD_WIDTH: 600,
  });

  const [gameHistory, setGameHistory] = useState([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const boardRef = useRef();

  const [gameState, setGameState] = useState({
    gameOver: false,
    gameWon: false,
    gameStarted: false,
  });

  const newGame = ({ attempt, time, gameState }) => {
    setGameHistory((state) => [
      ...state,
      { attempt: attempt + 1, time: time, gameState, score },
    ]);
    setScore(0);
    setTime(0);
    i++;
  };

  const screenWidthTarget = window.innerWidth - CELL_SIZE;
  const scale = screenWidthTarget / (BOARD_WIDTH + CELL_SIZE * 2);
  const newBoardWidth = BOARD_WIDTH * scale;
  //  get top of wINDOW

  return (
    <>
      <GameContext.Provider
        value={{ gameState, setGameState, newGame, gameHistory }}
      >
        <History />
      </GameContext.Provider>
      <div
        className={styles.game}
        ref={boardRef}
        style={{
          "--scale": screenWidthTarget / (BOARD_WIDTH + CELL_SIZE * 2),
          "--yOffset": `-${gameState.gameStarted ? newBoardWidth * 0.2 : 0}px`,
        }}
      >
        <div className={styles["game-board-info"]}>
          <GameContext.Provider value={{ gameState, i, score }}>
            <Header />
            {gameState.gameStarted && (
              <div className={styles["game-board-stats"]}>
                <div className={styles.score}> Score: {score}</div>
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
            value={{ setGameState, gameState, newGame, setGame, time, i }}
          >
            <Setup />
          </GameContext.Provider>
        </div>
      </div>
    </>
  );
}
