export const CELLS_NUMBER = 16
export const ROWS_NUM = 4
export const COLS_NUM = CELLS_NUMBER / ROWS_NUM

const getAllPositions = () => {
  let positions: number[] = []

  for (let i = 1; i <= CELLS_NUMBER; i++) {
    positions.push(i)
  }

  return positions
}

const getRowFromPosition = (newPosition: number): number => {
  if (newPosition <= ROWS_NUM) return 1
  return Math.ceil(newPosition / ROWS_NUM)
}

const getColFromPosition = (newPosition: number): number => {
  if ((newPosition - 1) % COLS_NUM === 0) return 1
  return newPosition % ROWS_NUM
}

const getRandomValue = (): number => {
  const possibleRandomValues = [2, 4]
  const randomIndex = Math.floor(Math.random() * possibleRandomValues.length)
  return possibleRandomValues[randomIndex]
}

export const getRandomNumber = (takenTiles: TileInfo[]): TileInfo[] | [] => {
  let places = getAllPositions()
  const takenPlaces =
    takenTiles.length === 0 ? [] : takenTiles.map(tile => tile.row * tile.col)
  let emptyPlaces = []

  for (let place of places) {
    if (!takenPlaces.includes(place)) {
      emptyPlaces.push(place)
    }
  }

  const newPosition =
    emptyPlaces[Math.floor(Math.random() * emptyPlaces.length - 1)]
  console.log("new position w get random num", newPosition)

  const row = getRowFromPosition(newPosition)
  console.log(row)
  const col = getColFromPosition(newPosition)
  console.log(col)

  const value = getRandomValue()

  const newRandomNumber: TileInfo = {
    row: row,
    col: col,
    value: value
  }

  return [...takenTiles, newRandomNumber]
}
export const createEmptyTilesGrid = (
  rows: number,
  cols: number
): TileInfo[] => {
  const emptyTilesGrid: TileInfo[] = []
  let row: number = 1
  for (row; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      emptyTilesGrid.push({
        row: row,
        col,
        value: 0
      })
    }
  }
  return emptyTilesGrid
}

export const getTileColor = (tile: TileInfo): string => {
  switch (tile.value) {
    case 0:
      return "#8b9ab3"
    case 2:
      return "#6b7585"
    case 4:
      return "#d5e317"
    case 8:
      return "#17e3c8"
    case 16:
      return "#70537a"
    default:
      return "#8b9ab3"
  }
}

export const updateGrid = (updates: TileInfo[]): TileInfo[] => {
  const emptyGrid = createEmptyTilesGrid(4, 4)
  const takenTiles = updates
  const updatedGrid = emptyGrid.map(
    (tile: TileInfo): TileInfo =>
      takenTiles.find(
        (takenTile: TileInfo): boolean =>
          takenTile.row === tile.row && takenTile.col === tile.col
      ) || tile
  )

  return updatedGrid
}
