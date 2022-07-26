import { BoardContext } from "./Board";
import { useContext, useEffect } from "react";
import styles from "./Food.module.css";

export default function Food() {
  const { position, food, setFood, incrememtScore, gameState } =
    useContext(BoardContext);

  useEffect(() => {
    if (
      position.x === food.x &&
      position.y === food.y &&
      !food.collected &&
      !gameState.gameOver
    ) {
      setFood((state) => ({
        ...state,
        collected: true,
      }));
      incrememtScore();
    }
  }, [position, food, setFood, incrememtScore, gameState]);

  return (
    <div
      className={styles.food}
      style={{
        "--x": `${food.x}`,
        "--y": `${food.y}`,
      }}
    ></div>
  );
}
