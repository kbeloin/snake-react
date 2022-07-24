import { useContext } from "react";

import { GameContext } from "./Game";
import styles from "./History.module.css";

export default function History() {
  const { gameState, gameHistory } = useContext(GameContext);
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
                  <div>{`${game.score}`}</div>
                </div>
                <hr />
              </div>
            ))}
        </div>
      )}
    </>
  );
}
