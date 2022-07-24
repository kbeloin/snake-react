import { GameContext } from "./Game";
import styles from "./Board.module.css";
import { useContext, useState } from "react";

export default function Setup() {
  const { setGameState, gameState, newGame, setGame, time, i } =
    useContext(GameContext);
  const [settings, setSettings] = useState({
    INITIAL_VELOCITY: 20,
    INITIAL_SNAKE_LENGTH: 10,
    CELL_SIZE: 10,
    BOARD_WIDTH: 600,
  });

  const handleChange = (e) => {
    e.preventDefault();

    // convert the value of the input to a number
    setSettings((state) => ({
      ...state,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleDirectionalButtonPress = (e) => {
    e.preventDefault();

    switch (e.target.name) {
      case "up":
        requestAnimationFrame(
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
        );
        requestAnimationFrame(
          window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowUp" }))
        );
        break;
      case "down":
        requestAnimationFrame(
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowDown" })
          )
        );
        requestAnimationFrame(
          window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowDown" }))
        );
        break;
      case "left":
        requestAnimationFrame(
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowLeft" })
          )
        );
        requestAnimationFrame(
          window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowLeft" }))
        );
        break;
      case "right":
        requestAnimationFrame(
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowRight" })
          )
        );
        requestAnimationFrame(
          window.dispatchEvent(
            new KeyboardEvent("keyup", { key: "ArrowRight" })
          )
        );
        break;
      default:
        break;
    }
  };

  const startGame = (e) => {
    e.preventDefault();

    setGameState((state) => ({
      ...state,
      gameStarted: true,
      gameOver: false,
      gameWon: false,
    }));

    newGame({ attempt: i, time: time, gameState });
    setGame((state) => ({
      ...state,
      INITIAL_SNAKE_LENGTH: settings.INITIAL_SNAKE_LENGTH,
      INITIAL_VELOCITY: settings.INITIAL_VELOCITY,
      CELL_SIZE: settings.CELL_SIZE,
      BOARD_WIDTH: settings.BOARD_WIDTH,
    }));
  };

  const resetGame = (e) => {
    e.preventDefault();

    setGameState((state) => ({
      ...state,
      gameStarted: false,
      gameOver: false,
      gameWon: false,
    }));
  };

  return (
    <>
      <form
        className={`${styles.form} ${gameState.gameStarted ? styles.row : ""}`}
      >
        {!gameState.gameStarted && (
          <>
            <label>
              Speed:
              <input
                type="number"
                name="INITIAL_VELOCITY"
                onChange={handleChange}
                value={settings.INITIAL_VELOCITY}
              />
            </label>
            <label>
              Snake Length:
              <input
                type="number"
                name="INITIAL_SNAKE_LENGTH"
                onChange={handleChange}
                value={settings.INITIAL_SNAKE_LENGTH}
                max={settings.BOARD_WIDTH / settings.CELL_SIZE}
              />
            </label>

            <label>
              Snake Size:
              <input
                type="number"
                name="CELL_SIZE"
                onChange={handleChange}
                value={settings.CELL_SIZE}
                step={5}
              />
            </label>
          </>
        )}
        <button onClick={startGame}>
          {gameState.gameStarted ? "Restart" : "Start"}
        </button>
        <button onClick={resetGame}>Reset</button>
      </form>
      {gameState.gameStarted && (
        <div className={styles["mobile-controls"]}>
          <button onClick={handleDirectionalButtonPress} name="up">
            Up
          </button>
          <button onClick={handleDirectionalButtonPress} name="down">
            Down
          </button>
          <button onClick={handleDirectionalButtonPress} name="left">
            Left
          </button>
          <button onClick={handleDirectionalButtonPress} name="right">
            Right
          </button>
        </div>
      )}
    </>
  );
}
