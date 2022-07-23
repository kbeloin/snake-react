import { useState, useEffect, useCallback } from "react";

const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

export default function useControls() {
  // Sets up the game controls using up/w, down/s, left/a, and right/d keys.

  const [controls, setControls] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  const handleKeyDown = useCallback(
    (e) => {
      if (keys.includes(e.key)) {
        e.preventDefault();

        switch (e.key) {
          case "ArrowUp":
            !controls.down &&
              setControls((state) => ({
                ...state,
                up: true,
                down: false,
                left: false,
                right: false,
              }));
            break;
          case "ArrowDown":
            !controls.up &&
              setControls((state) => ({
                ...state,
                down: true,
                up: false,
                left: false,
                right: false,
              }));
            break;
          case "ArrowLeft" || "A":
            !controls.right &&
              setControls((state) => ({
                ...state,
                left: true,
                right: false,
                up: false,
                down: false,
              }));
            break;
          case "ArrowRight" || "D":
            !controls.left &&
              setControls((state) => ({
                ...state,
                right: true,
                left: false,
                up: false,
                down: false,
              }));
            break;
          default:
            break;
        }
      }
    },
    [controls, setControls]
  );

  const handleKeyUp = useCallback(
    (e) => {
      if (keys.includes(e.key)) {
        e.preventDefault();

        switch (e.key) {
          case "ArrowUp":
            setControls((state) => ({
              ...state,
              up: false,
            }));
            break;
          case "ArrowDown":
            setControls((state) => ({
              ...state,
              down: false,
            }));
            break;
          case "ArrowLeft":
            setControls((state) => ({
              ...state,
              left: false,
            }));
            break;
          case "ArrowRight":
            setControls((state) => ({
              ...state,
              right: false,
            }));
            break;
          default:
            break;
        }
      }
    },
    [setControls]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controls, handleKeyDown, handleKeyUp]);

  return controls;
}
