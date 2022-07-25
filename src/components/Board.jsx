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
  const {
    INITIAL_SNAKE_LENGTH,
    BOARD_WIDTH,
    CELL_SIZE,
    gameState,
    score,
    setScore,
  } = useContext(GameContext);
  const boardRef = useRef();
  const [position, setPosition] = useState({
    x: 0.5 * (BOARD_WIDTH / CELL_SIZE),
    y: 0.5 * (BOARD_WIDTH / CELL_SIZE),
  });

  const [food, setFood] = useState({
    x: 0.5 * (BOARD_WIDTH / CELL_SIZE),
    y: 0.5 * (BOARD_WIDTH / CELL_SIZE),
    collected: false,
  });

  const [snake, setSnake] = useState([]);

  const incrememtScore = useCallback(() => {
    setScore((state) => score + 1);
  }, [score, setScore]);

  useEffect(() => {
    if (gameState.gameStarted) {
      setSnake(
        Array(INITIAL_SNAKE_LENGTH).fill({
          x: 0,
          y: 0.5 * (BOARD_WIDTH / CELL_SIZE),
        })
      );
      setPosition({
        x: BOARD_WIDTH / CELL_SIZE,
        y: 0.5 * (BOARD_WIDTH / CELL_SIZE),
      });
      setFood({
        x: 0.5 * (BOARD_WIDTH / CELL_SIZE),
        y: 0.5 * (BOARD_WIDTH / CELL_SIZE),
        collected: false,
      });
    }
  }, [gameState, INITIAL_SNAKE_LENGTH, BOARD_WIDTH, CELL_SIZE]);

  const screenWidth = window.innerWidth;
  const boardSize = BOARD_WIDTH + 22;

  return (
    <div
      className={styles.container}
      style={{
        transform: `scale(${
          boardSize > screenWidth ? screenWidth / boardSize : 1
        })`,
      }}
    >
      {gameState.gameStarted && (
        <div
          ref={boardRef}
          className={styles.board}
          style={{
            "--board-width": `${BOARD_WIDTH}`,
            "--cell-size": `${CELL_SIZE}`,
          }}
        >
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
      )}
    </div>
  );
};

export default Board;
