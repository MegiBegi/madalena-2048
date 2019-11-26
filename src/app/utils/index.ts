import { includes, sortBy } from "ramda"
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
  if (newPosition <= 4) return 1
  if (newPosition > 4 && newPosition <= 8) return 2
  if (newPosition > 8 && newPosition <= 12) return 3
  if (newPosition > 12 && newPosition <= 16) return 4
  return 5
}

const getColFromPosition = (newPosition: number): number => {
  if (
    newPosition === 1 ||
    newPosition === 5 ||
    newPosition === 9 ||
    newPosition === 13
  )
    return 1
  if (
    newPosition === 2 ||
    newPosition === 6 ||
    newPosition === 10 ||
    newPosition === 14
  )
    return 2
  if (
    newPosition === 3 ||
    newPosition === 7 ||
    newPosition === 11 ||
    newPosition === 15
  )
    return 3
  if (
    newPosition === 4 ||
    newPosition === 8 ||
    newPosition === 12 ||
    newPosition === 16
  )
    return 4
  return 5
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
    emptyPlaces[Math.floor(Math.random() * emptyPlaces.length)]

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

export const handleMoveUp = (currentGrid: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(currentGrid)
  const reUpdatedGrid = updatedGrid.map((tile: TileInfo) => {
    if (tile.value !== 0) {
      let oldRow = tile.row
      let newRow
      if (oldRow >= 2) {
        if (oldRow === 2) {
          newRow = oldRow - 1
        } else if (oldRow === 3) {
          newRow = oldRow - 2
        } else {
          newRow = oldRow - 3
        }
      } else {
        newRow = oldRow
      }

      return (tile = { row: newRow, col: tile.col, value: tile.value })
    } else return tile
  })
  console.log("reUpdatedGrid", reUpdatedGrid)

  const updatedNumbers: TileInfo[] = []
  for (let tile = 0; tile < reUpdatedGrid.length; tile++) {
    if (reUpdatedGrid[tile].value != 0) {
      updatedNumbers.push(reUpdatedGrid[tile])
    }
  }

  return updatedNumbers
}
