import styles from "./Snake.module.css";
import useControls from "../hooks/useControls";
import { useState, useEffect, useContext, useCallback } from "react";
import { BoardContext } from "./Board";
import { GameContext } from "./Game";

const ROUNDED_SEGMENT = {
  top: "50% 50% 0 0",
  right: "0 50% 50% 0",
  bottom: "0 0 50% 50%",
  left: "50% 0 0 50%",
};

export default function Snake() {
  const { gameState, setGameState, INITIAL_VELOCITY, CELL_SIZE, BOARD_WIDTH } =
    useContext(GameContext);
  const { position, setPosition, snake, setSnake, food, setFood } =
    useContext(BoardContext);
  const { up, down, left, right } = useControls();
  const [direction, setDirection] = useState({
    x: -1,
    y: 0,
  });

  const checkCollision = useCallback(() => {
    const s = snake.slice(0, -1);
    const collisions = s.filter((segment, i) => {
      if (segment.x === position.x && segment.y === position.y) {
        return { ...segment, i: i };
      } else {
        return false;
      }
    });
    //   collision is snake, game over}
    if (collisions.length > 0 && !collisions.every((c) => c === false)) {
      return true;
    }
  }, [position, snake]);

  const roundSnake = (segment, segmentPos) => {
    const { x, y, prevX, prevY } = segment;
    const dx = x - prevX;
    const dy = y - prevY;
    if (dx === 0 && dy === -1) {
      if (segmentPos === 0) {
        return ROUNDED_SEGMENT.top;
      }
      if (segmentPos === 1) {
        return ROUNDED_SEGMENT.bottom;
      }
    }
    if (dx === 0 && dy === 1) {
      if (segmentPos === 0) {
        return ROUNDED_SEGMENT.bottom;
      }
      if (segmentPos === 1) {
        return ROUNDED_SEGMENT.top;
      }
    }
    if (dx === -1 && dy === 0) {
      if (segmentPos === 0) {
        return ROUNDED_SEGMENT.left;
      }
      if (segmentPos === 1) {
        return ROUNDED_SEGMENT.right;
      }
    }
    if (dx === 1 && dy === 0) {
      if (segmentPos === 0) {
        return ROUNDED_SEGMENT.right;
      }
      if (segmentPos === 1) {
        return ROUNDED_SEGMENT.left;
      }
    }
  };

  const updatePosition = useCallback(() => {
    let newX = position.x + direction.x;
    let newY = position.y + direction.y;

    // Check if the new position is out of bounds, if so, wrap around.

    if (newX < 1) {
      newX = BOARD_WIDTH / CELL_SIZE;
    }
    if (newX > BOARD_WIDTH / CELL_SIZE) {
      newX = 1;
    }
    if (newY < 1) {
      newY = BOARD_WIDTH / CELL_SIZE;
    }
    if (newY > BOARD_WIDTH / CELL_SIZE) {
      newY = 1;
    }
    setPosition({ x: newX, y: newY });

    if (snake.length > 0) {
      const newSnake = [...snake];
      newSnake.pop();
      if (food.collected) {
        newSnake.push({ x: newX, y: newY });
        // TODO: move food outside of snake
        setFood({
          x: Math.max(Math.floor((Math.random() * BOARD_WIDTH) / CELL_SIZE), 1),
          y: Math.max(Math.floor((Math.random() * BOARD_WIDTH) / CELL_SIZE), 1),
          collected: false,
        });
      }
      newSnake.unshift({
        x: position.x,
        y: position.y,
        prevX: snake[0].x,
        prevY: snake[0].y,
      });
      setSnake(newSnake);
    }
  }, [
    position,
    direction,
    snake,
    food,
    setFood,
    setPosition,
    setSnake,
    BOARD_WIDTH,
    CELL_SIZE,
  ]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (!checkCollision()) {
        window.requestAnimationFrame(updatePosition);
      } else {
        setGameState((state) => ({
          ...state,
          gameOver: true,
          gameWon: false,
          gameStarted: true,
        }));
      }
    }, 1000 / INITIAL_VELOCITY);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    position,
    direction,
    updatePosition,
    checkCollision,
    snake,
    setGameState,
    INITIAL_VELOCITY,
  ]);

  useEffect(() => {
    if (up) {
      setDirection({ x: 0, y: -1 });
    } else if (down) {
      setDirection({ x: 0, y: 1 });
    } else if (left) {
      setDirection({ x: -1, y: 0 });
    } else if (right) {
      setDirection({ x: 1, y: 0 });
    }
  }, [up, down, left, right]);

  useEffect(() => {
    if (gameState.gameStarted) {
      setDirection({ x: -1, y: 0 });
    }
  }, [gameState, INITIAL_VELOCITY]);

  return (
    <>
      {!gameState.gameOver &&
        snake.map((body, index) => {
          // if its the head
          if (index === 0) {
            const r = roundSnake(body, 0);
            return (
              <div
                key={index}
                className={`${styles.head}`}
                style={{
                  "--x": `${body.x}`,
                  "--y": `${body.y}`,
                  "--prevX": `${body.prevX}`,
                  "--prevY": `${body.prevY}`,
                  "--round": r,
                }}
              ></div>
            );
          }
          // if its the body
          return (
            <div
              key={index}
              className={`${styles.body}`}
              style={{
                "--x": `${body.x}`,
                "--y": `${body.y}`,
                "--prevX": `${body.prevX}`,
                "--prevY": `${body.prevY}`,
                "--round": `${
                  index === snake.length - 1 ? roundSnake(body, 1) : "0 0 0 0"
                }`,
              }}
            ></div>
          );
        })}
    </>
  );
}
