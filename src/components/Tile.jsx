function Tile({ index, handleTileClick, top, left, width, height }) {
  return (
    <div
      style={{ top, left, width, height }}
      className="tile"
      onClick={handleTileClick}
    >{index + 1}</div>
  )
}

export default Tile