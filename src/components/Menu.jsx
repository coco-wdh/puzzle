function Menu({ moves, time, changeSize, size }) {
  const selects = [3, 4, 5];
  const selectElements = selects.map(select => (
    <div
      className="dropdown--item"
      style={{ display: select === size ? "none" : "block" }}
      onClick={() => changeSize(select)}
      key={select}
    >{select}×{select}</div>
  ))
  return (
    <div className="menu">
      <span className="menu--title">PUZZLE GAME</span>
      <div className="menu--info">
        <span>MOVES {moves}</span>
        <span>TIME {time}</span>
      </div>
      <div className="size--btn">
        <div className="dropdown">
          <div className="dropbtn">
            {size}×{size}
            <div className="arrow"></div>
          </div>
          <div className="dropdown--content">
            {selectElements}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu