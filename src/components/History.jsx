import { useContext } from "react";

import { GameContext } from "./Game";
import styles from "./History.module.css";

export default function History() {
  const { gameState, gameHistory, setShowHistory } = useContext(GameContext);
  return (
    <>
      {gameState.gameStarted && (
        <dialog open className={styles.dialog}>
          <button
            className={styles.button}
            onClick={() => setShowHistory(false)}
          >
            {/* Close X */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <form method="dialog">
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
                        <div>{`${game.score}`}</div>
                      </div>
                      <hr />
                    </div>
                  ))}
              </div>
            )}
          </form>
        </dialog>
      )}
    </>
  );
}
