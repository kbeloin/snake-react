import styles from "./Board.module.css";
import Snake from "./Snake";
import Food from "./Food";
import {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { GameContext } from "./Game";
import Dialog from "./Dialog";

export const BoardContext = createContext({});

export const Board = () => {
  const { INITIAL_SNAKE_LENGTH, gameState, score, setScore } =
    useContext(GameContext);
  const boardRef = useRef();
  const [position, setPosition] = useState({
    x: 60,
    y: 30,
  });

  const [food, setFood] = useState({
    x: 30,
    y: 30,
    collected: false,
  });

  const [snake, setSnake] = useState([]);

  const incrememtScore = useCallback(() => {
    setScore((state) => score + 1);
  }, [score, setScore]);

  useEffect(() => {
    if (gameState.gameStarted) {
      setSnake(Array(INITIAL_SNAKE_LENGTH).fill({ x: 0, y: 30 }));
      setPosition({ x: 60, y: 30 });
    }
  }, [gameState, INITIAL_SNAKE_LENGTH]);

  return (
    <div ref={boardRef} className={styles.board}>
      <BoardContext.Provider
        value={{ position, food, setFood, incrememtScore }}
      >
        <Food />
      </BoardContext.Provider>
      <BoardContext.Provider
        value={{
          position,
          food,
          setFood,
          setPosition,
          snake,
          setSnake,
        }}
      >
        <Snake />
        <Dialog />
      </BoardContext.Provider>
    </div>
  );
};

export default Board;
