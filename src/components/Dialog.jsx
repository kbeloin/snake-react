import { GameContext } from "./Game";
import { useContext } from "react";
import styles from "./Dialog.module.css";

export default function Dialog() {
  const {
    gameState,
    setGameState,
    newGame,
    setTime,
    i,
    time,
    setScore,
    score,
  } = useContext(GameContext);

  return (
    <>
      {gameState.gameOver && (
        <dialog open className={styles.dialog}>
          <form method="dialog">
            <h2>Game Over</h2>
            <p>
              Score: {score} Time:{" "}
              {`${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${
                time % 60
              }`}
              .
            </p>
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
                setScore(0);
              }}
            >
              Try Again
            </button>
          </form>
        </dialog>
      )}
    </>
  );
}
