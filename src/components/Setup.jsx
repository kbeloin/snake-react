import { GameContext } from "./Game";
import styles from "./Board.module.css";
import { useContext, useState } from "react";

export default function Setup() {
  const { setGame, setGameState, gameState, newGame, time, i } =
    useContext(GameContext);
  const [settings, setSettings] = useState({
    cols: 15,
    rows: 15,
  });

  const handleChange = (e) => {
    e.preventDefault();

    // convert the value of the input to a number
    setSettings((state) => ({
      ...state,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const startGame = (e) => {
    e.preventDefault();
    setGame((state) => ({
      ...state,
      cols: settings.cols,
      rows: settings.rows,
    }));
    setGameState((state) => ({
      ...state,
      gameStarted: true,
      gameOver: false,
      gameWon: false,
    }));
    newGame({ attempt: i, time: time, gameState });
  };

  const resetGame = (e) => {
    e.preventDefault();
    setGame((state) => ({
      ...state,
      cols: settings.cols,
      rows: settings.rows,
      bees: settings.bees,
    }));
    setGameState((state) => ({
      ...state,
      gameStarted: false,
      gameOver: false,
      gameWon: false,
    }));
  };

  return (
    <form
      className={`${styles.form} ${gameState.gameStarted ? styles.row : ""}`}
    >
      {!gameState.gameStarted && (
        <>
          <label>
            Cols:
            <input
              type="number"
              name="cols"
              onChange={handleChange}
              value={settings.cols}
            />
          </label>
          <label>
            Rows:
            <input
              type="number"
              name="rows"
              onChange={handleChange}
              value={settings.rows}
            />
          </label>
        </>
      )}
      <button onClick={startGame}>
        {gameState.gameStarted ? "Restart" : "Start"}
      </button>
      <button onClick={resetGame}>Reset</button>
    </form>
  );
}
