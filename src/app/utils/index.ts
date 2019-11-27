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
  let places: number[] = getAllPositions()
  const mapTakenPlaces = takenTiles.map((tile: TileInfo): number => {
    if (tile.row === 1) {
      if (tile.col === 1) return 1
      if (tile.col === 2) return 2
      if (tile.col === 3) return 3
      if (tile.col === 4) return 4
    }
    if (tile.row === 2) {
      if (tile.col === 1) return 5
      if (tile.col === 2) return 6
      if (tile.col === 3) return 7
      if (tile.col === 4) return 8
    }
    if (tile.row === 3) {
      if (tile.col === 1) return 9
      if (tile.col === 2) return 10
      if (tile.col === 3) return 11
      if (tile.col === 4) return 12
    } else if (tile.row === 4) {
      if (tile.col === 1) return 13
      if (tile.col === 2) return 14
      if (tile.col === 3) return 15
      if (tile.col === 4) return 16
    }
    return 90
  })
  let takenPlaces: number[]
  takenPlaces = takenTiles.length === 0 ? [] : mapTakenPlaces
  console.log("takenTiles", takenTiles)
  console.log("takenPlaces", takenPlaces)
  let emptyPlaces = []

  for (let place of places) {
    if (!takenPlaces.includes(place)) {
      emptyPlaces.push(place)
    }
  }
  console.log("emptyPlaces", emptyPlaces)

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

export const handleMoveUp = (takenTiles: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(takenTiles)
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

  const tilesWithPosVal: TileInfo[] = []
  for (let i = 0; i < reUpdatedGrid.length; i++) {
    if (reUpdatedGrid[i].value !== 0) {
      tilesWithPosVal.push(reUpdatedGrid[i])
    }
  }
  console.log("tilesWithPosVal", tilesWithPosVal)
  let newArray: TileInfo[] = []
  if (tilesWithPosVal.length === 1) {
    newArray.push(tilesWithPosVal[0])
  } else {
    for (let i = 0; i < tilesWithPosVal.length - 1; i++) {
      if (
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].col === tilesWithPosVal[i + 1].col &&
        tilesWithPosVal[i].value === tilesWithPosVal[i + 1].value
      ) {
        newArray.push({
          ...tilesWithPosVal[1],
          value: tilesWithPosVal[1].value * 2
        })
      } else if (
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].col === tilesWithPosVal[i + 1].col &&
        tilesWithPosVal[i].value !== tilesWithPosVal[i + 1].value
      ) {
        newArray.push(tilesWithPosVal[i], {
          ...tilesWithPosVal[i + 1],
          row: tilesWithPosVal[i + 1].row + 1
        })
      } else {
        newArray = tilesWithPosVal
      }
    }
  }
  console.log("tilesWithPosVal", tilesWithPosVal)
  console.log("newArray", newArray)
  return newArray
}

export const handleMoveDown = (takenTiles: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(takenTiles)
  const reUpdatedGrid = updatedGrid.map((tile: TileInfo) => {
    if (tile.value !== 0) {
      let oldRow = tile.row
      let newRow
      if (oldRow <= 3) {
        if (oldRow === 3) {
          newRow = oldRow + 1
        } else if (oldRow === 2) {
          newRow = oldRow + 2
        } else {
          newRow = oldRow + 3
        }
      } else {
        newRow = oldRow
      }

      return (tile = { row: newRow, col: tile.col, value: tile.value })
    } else return tile
  })
  console.log("reUpdatedGrid", reUpdatedGrid)

  const tilesWithPosVal: TileInfo[] = []
  for (let i = 0; i < reUpdatedGrid.length; i++) {
    if (reUpdatedGrid[i].value !== 0) {
      tilesWithPosVal.push(reUpdatedGrid[i])
    }
  }
  console.log("tilesWithPosVal", tilesWithPosVal)
  let newArray: TileInfo[] = []
  if (tilesWithPosVal.length === 1) {
    newArray.push(tilesWithPosVal[0])
  } else {
    for (let i = 0; i < tilesWithPosVal.length - 1; i++) {
      if (
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].col === tilesWithPosVal[i + 1].col &&
        tilesWithPosVal[i].value === tilesWithPosVal[i + 1].value
      ) {
        newArray.push({
          ...tilesWithPosVal[1],
          value: tilesWithPosVal[1].value * 2
        })
      } else if (
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].col === tilesWithPosVal[i + 1].col &&
        tilesWithPosVal[i].value !== tilesWithPosVal[i + 1].value
      ) {
        newArray.push(tilesWithPosVal[i + 1], {
          ...tilesWithPosVal[i],
          row: tilesWithPosVal[i].row - 1
        })
      } else {
        newArray = tilesWithPosVal
      }
    }
  }
  console.log("tilesWithPosVal", tilesWithPosVal)
  console.log("newArray", newArray)
  return newArray
}

export const handleMoveLeft = (takenTiles: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(takenTiles)
  const reUpdatedGrid = updatedGrid.map((tile: TileInfo) => {
    if (tile.value !== 0) {
      let oldCol = tile.col
      let newCol
      if (oldCol >= 2) {
        if (oldCol === 2) {
          newCol = oldCol - 1
        } else if (oldCol === 3) {
          newCol = oldCol - 2
        } else {
          newCol = oldCol - 3
        }
      } else {
        newCol = oldCol
      }

      return (tile = { row: tile.row, col: newCol, value: tile.value })
    } else return tile
  })
  console.log("reUpdatedGrid", reUpdatedGrid)

  const tilesWithPosVal: TileInfo[] = []
  for (let i = 0; i < reUpdatedGrid.length; i++) {
    if (reUpdatedGrid[i].value !== 0) {
      tilesWithPosVal.push(reUpdatedGrid[i])
    }
  }
  console.log("tilesWithPosVal", tilesWithPosVal)
  let newArray: TileInfo[] = []
  if (tilesWithPosVal.length === 1) {
    newArray.push(tilesWithPosVal[0])
  } else {
    for (let i = 0; i < tilesWithPosVal.length - 1; i++) {
      if (
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].value === tilesWithPosVal[i + 1].value
      ) {
        newArray.push({
          ...tilesWithPosVal[1],
          value: tilesWithPosVal[1].value * 2
        })
      } else if (
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].value !== tilesWithPosVal[i + 1].value
      ) {
        newArray.push(tilesWithPosVal[i], {
          ...tilesWithPosVal[i + 1],
          col: tilesWithPosVal[i + 1].col + 1
        })
      } else {
        newArray = tilesWithPosVal
      }
    }
  }
  console.log("tilesWithPosVal", tilesWithPosVal)
  console.log("newArray", newArray)
  return newArray
}

export const handleMoveRight = (takenTiles: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(takenTiles)
  const reUpdatedGrid = updatedGrid.map((tile: TileInfo) => {
    if (tile.value !== 0) {
      let oldCol = tile.col
      let newCol
      if (oldCol <= 3) {
        if (oldCol === 3) {
          newCol = oldCol + 1
        } else if (oldCol === 2) {
          newCol = oldCol + 2
        } else {
          newCol = oldCol + 3
        }
      } else {
        newCol = oldCol
      }

      return (tile = { row: tile.row, col: newCol, value: tile.value })
    } else return tile
  })
  console.log("reUpdatedGrid", reUpdatedGrid)

  const tilesWithPosVal: TileInfo[] = []
  for (let i = 0; i < reUpdatedGrid.length; i++) {
    if (reUpdatedGrid[i].value !== 0) {
      tilesWithPosVal.push(reUpdatedGrid[i])
    }
  }
  console.log("tilesWithPosVal", tilesWithPosVal)
  let newArray: TileInfo[] = []
  if (tilesWithPosVal.length === 1) {
    newArray.push(tilesWithPosVal[0])
  } else {
    for (let i = 0; i < tilesWithPosVal.length - 1; i++) {
      if (
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].value === tilesWithPosVal[i + 1].value
      ) {
        newArray.push({
          ...tilesWithPosVal[1],
          value: tilesWithPosVal[1].value * 2
        })
      } else if (
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].row === tilesWithPosVal[i + 1].row &&
        tilesWithPosVal[i].value !== tilesWithPosVal[i + 1].value
      ) {
        newArray.push(tilesWithPosVal[i + 1], {
          ...tilesWithPosVal[i],
          col: tilesWithPosVal[i].col - 1
        })
      } else {
        newArray = tilesWithPosVal
      }
    }
  }
  console.log("tilesWithPosVal", tilesWithPosVal)
  console.log("newArray", newArray)
  return newArray
}
