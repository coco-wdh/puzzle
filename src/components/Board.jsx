import Tile from "./Tile"

function Board({ tilePositions, handleTileClick, tileWidth }) {
  const tileElements = tilePositions.slice(0, -1).map((pos, index) => {
    return <Tile
      // key={tile} // 设为tile动画效果不生效，设为index可以
      key={index}
      index={index}
      top={pos[0] * tileWidth}
      left={pos[1] * tileWidth}
      width={tileWidth}
      height={tileWidth}
      handleTileClick={() => handleTileClick(index)}
    />
  }

  )
  return (
    <div className="board">
      {tileElements}
    </div>
  )
}

export default Board
