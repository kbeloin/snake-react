import { GameContext } from "./Game";
import styles from "./Board.module.css";
import { useContext, useState } from "react";

export default function Setup() {
  const {
    SHOW_MOBILE_CONTROLS,
    setGameState,
    gameState,
    newGame,
    setGame,
    time,
    i,
  } = useContext(GameContext);
  const [settings, setSettings] = useState({
    INITIAL_VELOCITY: 20,
    INITIAL_SNAKE_LENGTH: 10,
    CELL_SIZE: 10,
    BOARD_WIDTH: 600,
    SHOW_MOBILE_CONTROLS: false,
  });

  const handleChange = (e) => {
    // convert the value of the input to a number
    if (e.target.type === "number") {
      e.preventDefault();
      setSettings((state) => ({
        ...state,
        [e.target.name]: Number(e.target.value),
      }));
    }
    // convert the value of the input to a boolean
    if (e.target.type === "checkbox") {
      setSettings((state) => ({
        ...state,
        [e.target.name]: !state[e.target.name],
      }));
    }
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

    setGame((state) => ({
      ...state,
      INITIAL_SNAKE_LENGTH: settings.INITIAL_SNAKE_LENGTH,
      INITIAL_VELOCITY: settings.INITIAL_VELOCITY,
      CELL_SIZE: settings.CELL_SIZE,
      BOARD_WIDTH: settings.BOARD_WIDTH,
      SHOW_MOBILE_CONTROLS: settings.SHOW_MOBILE_CONTROLS,
    }));

    if (i !== 0) {
      newGame({
        attempt: i,
        time: time,
        gameState: gameState,
      });
    }
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
            <label
              style={{
                flexDirection: "row",
                gap: "1em",
              }}
            >
              Touch Controls:
              <input
                type="checkbox"
                name="SHOW_MOBILE_CONTROLS"
                style={{
                  width: "min-content",
                  minWidth: "0",
                }}
                onChange={handleChange}
                checked={settings.SHOW_MOBILE_CONTROLS}
              />
            </label>
          </>
        )}
        <button className={styles.button} onClick={startGame}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ width: "20px" }}
          >
            <path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z" />
          </svg>
        </button>
        {gameState.gameStarted && (
          <button className={styles.button} onClick={resetGame}>
            {/* Close X */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              style={{ width: "20px" }}
            >
              <path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z" />
            </svg>
          </button>
        )}
      </form>
      {gameState.gameStarted && SHOW_MOBILE_CONTROLS && (
        <div className={styles["mobile-controls"]}>
          <button onClick={handleDirectionalButtonPress} name="up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style={{
                width: "20px",
                transform: "rotate(-45deg)",
              }}
            >
              <path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
            </svg>
          </button>
          <button onClick={handleDirectionalButtonPress} name="right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style={{
                width: "20px",
                transform: "rotate(45deg)",
              }}
            >
              <path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
            </svg>
          </button>

          <button onClick={handleDirectionalButtonPress} name="left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style={{
                width: "20px",
                transform: "rotate(225deg)",
              }}
            >
              <path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
            </svg>
          </button>
          <button onClick={handleDirectionalButtonPress} name="down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style={{
                width: "20px",
                transform: "rotate(135deg)",
              }}
            >
              <path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
            </svg>
          </button>
          <div></div>
        </div>
      )}
    </>
  );
}
