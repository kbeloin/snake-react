import { createContext, useState } from "react";
import styles from "./Game.module.css";
import Board from "./Board";
import Header from "./Header";
import Timer from "./Timer";

export const GameContext = createContext();

let i = 0;

export default function Game() {
  const [
    { CELL_SIZE, BOARD_WIDTH, INNITAL_VELOCITY, INITIAL_SNAKE_LENGTH },
    setGame,
  ] = useState({
    CELL_SIZE: 15,
    BOARD_WIDTH: 10,
    INNITAL_VELOCITY: 20,
    INITIAL_SNAKE_LENGTH: 10,
  });

  const [gameHistory, setGameHistory] = useState([]);
  const [time, setTime] = useState(0);

  const [gameState, setGameState] = useState({
    gameOver: false,
    gameWon: false,
    gameStarted: true,
  });

  const newGame = ({ attempt, time, gameState }) => {
    setGameHistory((state) => [
      ...state,
      { attempt: attempt + 1, time: time, gameState },
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
            gameHistory.length > 0 &&
            gameHistory.map((game, index) => (
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
        <div className={styles["game-board-info"]}>
          <GameContext.Provider value={{ gameState, i }}>
            <Header />
            {gameState.gameStarted && <Timer time={time} setTime={setTime} />}
          </GameContext.Provider>
        </div>
        <div className={styles["game-board-container"]}>
          <GameContext.Provider
            value={{
              CELL_SIZE,
              BOARD_WIDTH,
              INNITAL_VELOCITY,
              INITIAL_SNAKE_LENGTH,
              setGameState,
              gameState,
              setGame,
              i,
            }}
          >
            <Board />
            {gameState.gameOver && (
              <dialog open>
                <form method="dialog">
                  <button
                    tabIndex={0}
                    onClick={() => {
                      newGame({ attempt: i, time: time, gameState });
                      setGameState((state) => ({
                        ...state,
                        gameOver: false,
                        gameWon: false,
                        gameStarted: true,
                      }));
                      setTime(0);
                    }}
                  >
                    OK
                  </button>
                </form>
              </dialog>
            )}
          </GameContext.Provider>
        </div>
      </div>
    </>
  );
}
