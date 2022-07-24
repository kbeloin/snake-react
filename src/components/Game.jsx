import { createContext, useState } from "react";
import styles from "./Game.module.css";
import Board from "./Board";
import Header from "./Header";
import Timer from "./Timer";
import History from "./History";

export const GameContext = createContext();

let i = 0;

export default function Game() {
  const [{ INITIAL_SNAKE_LENGTH }, setGame] = useState({
    INITIAL_SNAKE_LENGTH: 10,
  });

  const [gameHistory, setGameHistory] = useState([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);

  const [gameState, setGameState] = useState({
    gameOver: false,
    gameWon: false,
    gameStarted: true,
  });

  const newGame = ({ attempt, time, gameState }) => {
    console.log(score);
    setGameHistory((state) => [
      ...state,
      { attempt: attempt + 1, time: time, gameState, score },
    ]);
    i++;
  };
  return (
    <>
      <GameContext.Provider
        value={{ gameState, setGameState, newGame, gameHistory }}
      >
        <History />
      </GameContext.Provider>
      <div className={styles.game}>
        <div className={styles["game-board-info"]}>
          <GameContext.Provider value={{ gameState, i, score }}>
            <Header />
            <div className={styles["game-board-stats"]}>
              <div className={styles.score}> Score: {score}</div>
              {gameState.gameStarted && <Timer time={time} setTime={setTime} />}
            </div>
          </GameContext.Provider>
        </div>
        <div className={styles["game-board-container"]}>
          <GameContext.Provider
            value={{
              INITIAL_SNAKE_LENGTH,
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
        </div>
      </div>
    </>
  );
}
