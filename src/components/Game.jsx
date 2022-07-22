import { createContext, useState } from "react";
import styles from "./Game.module.css";
import Board from "./Board";
import Setup from "./Setup";
import Header from "./Header";
import Timer from "./Timer";

export const GameContext = createContext();

let i = 0;

export default function Game() {
  const [{ cols, rows }, setGame] = useState({
    cols: 15,
    rows: 10,
  });

  const [gameHistory, setGameHistory] = useState([]);
  const [time, setTime] = useState(0);

  const [gameState, setGameState] = useState({
    gameOver: false,
    gameWon: false,
    gameStarted: false,
  });

  const newGame = ({ attempt, time, gameState }) => {
    setGameHistory((state) => [
      ...state,
      { attempt: attempt, time: time, gameState },
    ]);
    i++;
  };
  return (
    <>
      {gameState.gameStarted && (
        <div className={styles.history}>
          <h2>Card</h2>

          {/* Skip the first */}
          {gameHistory &&
            gameHistory.length > 1 &&
            gameHistory.slice(1).map((game, index) => (
              <div key={`history-${index}`}>
                <div className={styles["history-item"]}>
                  <div>
                    {/* long dash*/}
                    {game.attempt}
                  </div>
                  <div>
                    {/* long dash*/}
                    &nbsp;&mdash;&nbsp;
                  </div>
                  <div>
                    {`${Math.floor(game.time / 60)}:${
                      game.time % 60 < 10 ? "0" : ""
                    }${game.time % 60}`}
                  </div>
                  <div>
                    {/* long dash*/}
                    &nbsp;&mdash;&nbsp;
                  </div>
                  <div>
                    {game.gameState.gameOver
                      ? "L"
                      : game.gameState.gameWon
                      ? "W"
                      : "NC"}
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </div>
      )}

      <div className={styles.game}>
        <div className={styles["game-info"]}>
          <div className={styles.header}>
            {gameState.gameStarted && <h2>{`Board ${i}`}</h2>}
            {gameState.gameStarted && gameState.gameWon && <h2>: Win</h2>}
            {gameState.gameStarted && gameState.gameOver && <h2>: Loss</h2>}
            <Header />
          </div>
          {gameState.gameStarted && <Timer time={time} setTime={setTime} />}
        </div>
        <div className="game-board">
          {gameState.gameStarted && (
            <GameContext.Provider value={{ cols, rows, setGameState, i }}>
              <Board />
            </GameContext.Provider>
          )}
        </div>
        <div className={"game-info"}>
          <GameContext.Provider
            value={{ setGame, setGameState, gameState, newGame, time, i }}
          >
            <Setup />
          </GameContext.Provider>
        </div>
      </div>
    </>
  );
}
