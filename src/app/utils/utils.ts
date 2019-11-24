export const CELLS_NUMBER = 16
export const ROWS_NUM = 4
const COLS_NUM = CELLS_NUMBER / ROWS_NUM

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

  const row = getRowFromPosition(newPosition)
  const col = getColFromPosition(newPosition)
  const value = getRandomValue()

  const newRandomNumber: TileInfo = {
    row: row,
    col: col,
    value: value
  }

  return [...takenTiles, newRandomNumber]
}
