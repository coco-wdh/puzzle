function Tile({ index, handleTileClick, top, left, width }) {
  return (
    <div
      style={{ top: `${top}em`, left: `${left}em`, width: `${width}em`, height: `${width}em` }}
      className="tile"
      onClick={handleTileClick}
    >{index + 1}</div>
  )
}

export default Tile