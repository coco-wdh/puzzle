import { useEffect, useState } from "react"
import Board from "./Board"
import Menu from "./Menu"
import { reversePairs, shuffle } from "../utils/utils"
import { BOARD_WIDTH, GAME_IDLE, GAME_STARTED, GAME_OVER, GAME_PAUSED } from "../utils/constants"
import JSConfetti from 'js-confetti'

function Game() {
  const [status, setStatus] = useState(GAME_IDLE);
  const [size, setSize] = useState(4);

  const count = size * size;
  const directions = [1, size, -1, -size];
  const tileWidth = BOARD_WIDTH / size;

  const initialTiles = Array.from({ length: count }, (val, i) => i);

  const [tiles, setTiles] = useState(initialTiles);
  const tilePositions = tiles.map(tile => [Math.floor((tile) / size), tile % size]);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState({ m: 0, s: 0 });
  const [isActive, setIsActive] = useState(false);
  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setTime({ m: 0, s: 0 });
    setIsActive(false);
  }
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(oldTime => {
          const carry = oldTime.s === 59 ? 1 : 0;
          return { m: oldTime.m + carry, s: (carry ? 0 : oldTime.s + 1) }
        });
      }, 1000);
    } else if (!isActive && (time.m !== 0 || time.s !== 0)) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    //改变size
    getNewGame()
  }, [size])
  const confetti = new JSConfetti()

  function showConfetti() {
    confetti.addConfetti()
  }
    /* 判定成功 */
  useEffect(() => {
    let over = tiles.every((tile, index) => tile === index);
    if (over && status === GAME_STARTED) {
      setStatus(GAME_OVER);
      showConfetti();
      setIsActive(false);
    }
  }, [tiles])

  function generateRandomNums() {
    const nums = initialTiles.slice(0, -1);
    let randomNums = shuffle(nums);
    while (reversePairs(nums) % 2 === 1) {
      randomNums = shuffle(nums);
    }
    randomNums.push(count - 1);
    return randomNums;
  }
  function handleTileClick(index) {
    //index为数组下标和显示的数字，数组内容为位置，点击交换该元素与空元素的位置
    const pos = tiles[index];
    const blankPos = tiles[count - 1];
    //是否可以移动
    for (let key of directions) {
      if (pos + key === blankPos) {
        setTiles(oldTiles => {
          const newTiles = oldTiles.slice();
          newTiles[count - 1] = pos;
          newTiles[index] = blankPos;
          return newTiles;
        })
        setMoves(moves + 1);
        break;
      }
    }
  }
  function handlePlay() {
    setStatus(GAME_STARTED);
    setTiles(generateRandomNums());
    setIsActive(true);
  }
  function handlePaused() {
    toggle();
    setStatus(oldStatus => oldStatus === GAME_PAUSED ? GAME_STARTED : GAME_PAUSED);
  }
  function getNewGame() {
    setStatus(GAME_IDLE);
    setTiles(initialTiles);
    setMoves(0);
    reset();
  }
  /* 切换标签页计时暂停 */
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [status]);
  function handleVisibilityChange() {
    if (document.hidden) {
      if (status === GAME_STARTED) {
        setStatus(GAME_PAUSED);
        setIsActive(false);
      }
    }
  }
  function formatTime(obj) {
    return Object.values(obj).map(item => item.toString().padStart(2, "0")).join(":");
  }

  return (
    <div className={`game ${moves ? "" : "nomove"}`}>
      <Menu
        moves={moves}
        time={formatTime(time)}
        status={status}
        size={size}
        changeSize={setSize}
        getNewGame={getNewGame}
        pauseTime={handlePaused}
      />
      <main>
        <div
          className="board--container"
          style={{ width: `${BOARD_WIDTH}em`, height: `${BOARD_WIDTH}em` }}
        >
          <Board
            tileWidth={tileWidth}
            tilePositions={tilePositions}
            handleTileClick={handleTileClick}
          />
          {status === GAME_IDLE && <div className="paused">
            <div
              onClick={handlePlay}
            >play</div>
          </div>}
          {status === GAME_PAUSED && <div className="paused">
            <div
              onClick={handlePaused}
            >paused</div>
          </div>}
        </div>
        <div className={`handle ${status === GAME_IDLE ? "start" : ""}`}>
          {status === GAME_IDLE ? <span onClick={handlePlay}>start </span> : <span onClick={getNewGame}>New Game</span>}
          {status !== GAME_IDLE && <span onClick={handlePaused}>Pause</span>}
        </div>
      </main>
      {status === GAME_OVER &&
        <div className="over">
          <div className="over--content">
            <div className="over--text">
              <p>YOU WIN THE GAME! </p>
              <p>time: {formatTime(time)}</p>
              <p>moves: {moves}</p>
            </div>
            <span className="over--btn" onClick={getNewGame}>New Game</span>
          </div>
        </div>
      }
    </div>
  )
}
export default Game