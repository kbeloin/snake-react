import { useState, useEffect, useContext } from "react";
import { GameContext } from "./Game";
import styles from "./Board.module.css";

export const Board = () => {
  const { cols, rows, bees, i, setGameState } = useContext(GameContext);
  const [{ cells }, setBoard] = useState({
    cells: [],
  });

  const handleClick = (cell) => {
    let newCells = [...cells];

    if (cell.isBee) {
      newCells = newCells.map((row, i) => {
        return row.map((cell, j) => {
          return { ...cell, revealed: true };
        });
      });

      setBoard((state) => ({
        ...state,
        cells: newCells,
      }));
      setGameState((state) => ({
        ...state,
        gameOver: true,
        gameWon: false,
      }));
    } else {
      let o = 1;
      const c = cell;
      newCells[cell.y][cell.x].revealed = true;
      newCells[cell.y][cell.x].order = o;
      const revealNeighbors = (cell) => {
        if (cell.total === 0) {
          for (let i = cell.y - 1; i <= cell.y + 1; i++) {
            for (let j = cell.x - 1; j <= cell.x + 1; j++) {
              if (i >= 0 && i < rows && j >= 0 && j < cols) {
                if (
                  newCells[i][j].total === 0 &&
                  !newCells[i][j].revealed &&
                  !newCells[i][j].flagged
                ) {
                  newCells[i][j].revealed = true;
                  // get distance from clicked cell
                  const distance = Math.floor(
                    Math.sqrt(Math.pow(i - c.y, 2) + Math.pow(j - c.x, 2))
                  );

                  newCells[i][j].order = Math.floor(distance * o++);

                  revealNeighbors(newCells[i][j]);
                } else if (newCells[i][j].total > 0) {
                  const distance = Math.floor(
                    Math.sqrt(Math.pow(i - c.y, 2) + Math.pow(j - c.x, 2))
                  );

                  newCells[i][j].revealed = true;
                  newCells[i][j].order = Math.floor(distance * o++);
                }
              }
            }
          }
        }
      };

      revealNeighbors(newCells[cell.y][cell.x]);
      // if all cells revealed are not bees, game over

      setBoard((state) => ({
        ...state,
        newCells,
      }));
      if (
        newCells.every((row) =>
          row.every((cell) => cell.revealed || cell.isBee)
        )
      ) {
        setGameState((state) => ({
          ...state,
          gameWon: true,
        }));
      }
    }
  };

  useEffect(() => {
    const cells = [];
    for (let i = 0; i < rows; i++) {
      cells.push([]);
      for (let j = 0; j < cols; j++) {
        cells[i].push({
          x: j,
          y: i,
          revealed: false,
          flagged: false,
          isBee: false,
          total: 0,
        });
      }
    }

    // assign bees to cells
    for (let i = 0; i < (bees > cols * rows ? cols * rows : bees); i++) {
      const x = Math.floor(Math.random() * cols);
      const y = Math.floor(Math.random() * rows);
      if (cells[y][x].isBee) {
        i--;
        continue;
      }
      cells[y][x].isBee = true;
    }

    // set totals for each cell - number represents number of adjacent bees
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let cell = cells[i][j];
        if (cell.isBee) continue;
        let total = 0;
        for (let x = j - 1; x <= j + 1; x++) {
          for (let y = i - 1; y <= i + 1; y++) {
            if (x === j && y === i) continue;
            if (x < 0 || x >= cols || y < 0 || y >= rows) continue;
            if (cells[y][x] && cells[y][x].isBee) total++;
          }
        }
        cells[i][j].total = total;
      }
    }

    setBoard((state) => ({
      ...state,
      cells,
    }));
    return () => {
      setBoard((state) => ({
        ...state,
        cells: [],
      }));
    };
  }, [rows, cols, bees, i]);

  const screenWidth = window.innerWidth;
  const boardSize = cols * 30 + 22;

  return (
    <div
      className={styles.container}
      style={{
        transform: `scale(${
          boardSize > screenWidth ? screenWidth / boardSize : 1
        })`,
      }}
    >
      <div
        className={styles.board}
        style={{
          "--column-number": `${cols}`,
        }}
      >
        {cells &&
          cells.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${j}-${i}`}
                className={`${styles.cell} ${
                  cell.revealed ? styles.revealed : ""
                }`}
                onClick={() => {
                  handleClick(cell);
                }}
                tabIndex={0}
                style={{
                  "--order": `${cell.order ? cell.order : j}`,
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (!cell.revealed) {
                    const newCells = [...cells];
                    newCells[i][j].flagged = !newCells[i][j].flagged;
                    setBoard((state) => ({
                      ...state,
                      cells: newCells,
                    }));
                  }
                }}
              >
                {cell.revealed && cell.isBee && (
                  <div className={styles.bee}></div>
                )}
                {cell.revealed && cell.total > 0 && (
                  <div className={styles.total}>{cell.total}</div>
                )}
                {!cell.revealed && cell.flagged && (
                  <div className={styles.flag}>🚩</div>
                )}
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default Board;
