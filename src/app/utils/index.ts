import { equals } from "ramda"

export const CELLS_NUMBER = 16
export const ROWS_NUMBER = 4
export const COLS_NUMBER = 4
export const ZOOMED_GRID = "width: 370px;  height: 370px;"
export const ZOOMED_CELL = "width: 78px;  height: 78px;"

const NEXT_POSITION = 1
const FIRST_COL_OR_ROW = 1
const LAST_COL_OR_ROW = 4

type Direction = "up" | "down" | "right" | "left"

interface Condition {
  whileCondition: boolean
  moveCondition: number
  changeCondition: number
}

const getAllPositions = (): number[] => {
  let positions: number[] = []

  for (let i = 1; i <= CELLS_NUMBER; i++) {
    positions.push(i)
  }

  return positions
}

const getRandomValue = (): number => {
  const possibleRandomValues = [2, 4]
  const randomIndex = Math.floor(Math.random() * possibleRandomValues.length)
  return possibleRandomValues[randomIndex]
}

export const getRandomNumber = (takenTiles: TileInfo[]): TileInfo[] => {
  let places: number[] = getAllPositions()
  const takenPositions: number[] = takenTiles.map(
    (tile: TileInfo): number => tile.position
  )
  let takenPlaces: number[]
  takenPlaces = takenTiles.length === 0 ? [] : takenPositions
  let emptyPlaces = []

  for (let place of places) {
    if (!takenPlaces.includes(place)) {
      emptyPlaces.push(place)
    }
  }

  const newPosition: number =
    emptyPlaces[Math.floor(Math.random() * emptyPlaces.length)]

  const value = getRandomValue()
  const newRandomNumber: TileInfo = {
    position: newPosition,
    value: value,
    newNum: true
  }
  return [...takenTiles, newRandomNumber]
}

export const createEmptyTilesGrid = (): TileInfo[] => {
  const allPos = getAllPositions()
  const emptyTilesGrid = allPos.map(el => {
    return { position: el, value: 0 }
  })
  return emptyTilesGrid
}

export const getTileColor = (tile: TileInfo): string => {
  const colors = [
    "#303949",
    "#004a31",
    "#aab510",
    "#11ac98",
    "#70537a",
    "#70037a",
    "#09537a",
    "#20887f",
    "#33437a",
    "#11598a",
    "#56951c",
    "#00533a",
    "#00531a",
    "#44597a",
    "#074a2e",
    "#074e4e"
  ]

  let counter: number = 0
  let value: number = tile.value

  while (value > 1) {
    counter++
    value -= 0.5 * value
  }

  return colors[counter]
}

export const getTileFontSize = ({ value }: TileInfo): string => {
  switch (true) {
    case value < 128:
      return "100"
    case value >= 128 && value < 1024:
      return "75"
    case value >= 1024 && value < 16396:
      return "55"
    case value >= 16396:
      return "40"
    default:
      return "100"
  }
}

export const updateGrid = (updates: TileInfo[]): TileInfo[] => {
  const emptyGrid = createEmptyTilesGrid()
  const takenTiles = updates
  const updatedGrid = emptyGrid.map(
    (tile: TileInfo): TileInfo =>
      takenTiles.find(
        (takenTile: TileInfo): boolean => takenTile.position === tile.position
      ) || tile
  )

  return updatedGrid
}

const getRowFromPosition = (newPosition: number): number =>
  newPosition <= 4 ? 1 : Math.ceil(newPosition / ROWS_NUMBER)

const getColFromPosition = (newPosition: number): number => {
  if (newPosition <= COLS_NUMBER) return newPosition
  if (newPosition % COLS_NUMBER === 0) return COLS_NUMBER
  return newPosition % COLS_NUMBER
}

export const getBasicTiles = (takenTiles: TileInfo[]): TileInfo[] => {
  const basicTiles: TileInfo[] = takenTiles
    .map(
      ({ value, position }): TileInfo => ({
        value,
        position
      })
    )
    .sort((a, b) => (a.position > b.position ? 1 : -1))
  return basicTiles
}

const moveOrMerge = ({
  updatedTiles,
  tile,
  direction
}: {
  updatedTiles: TileInfo[]
  direction: Direction
  tile: TileInfo
}): TileInfo[] => {
  let takenPositions: number[] = updatedTiles.map(tile => tile.position)
  const initialTilePosition: number = tile.position
  let position: number = tile.position
  const tileValue: number = tile.value

  const setCondition = (direction: string, pos: number): Condition | null => {
    switch (direction) {
      case "up":
        return {
          whileCondition:
            getRowFromPosition(pos) > FIRST_COL_OR_ROW &&
            getColFromPosition(pos - ROWS_NUMBER) ===
              getColFromPosition(initialTilePosition),
          moveCondition:
            getColFromPosition(pos - ROWS_NUMBER) ===
            getColFromPosition(initialTilePosition)
              ? pos - ROWS_NUMBER
              : 0,
          changeCondition: ROWS_NUMBER
        }
      case "down":
        return {
          whileCondition:
            getRowFromPosition(pos) < LAST_COL_OR_ROW &&
            getColFromPosition(pos + ROWS_NUMBER) ===
              getColFromPosition(initialTilePosition),
          moveCondition:
            getColFromPosition(pos + ROWS_NUMBER) ===
            getColFromPosition(initialTilePosition)
              ? pos + ROWS_NUMBER
              : 0,

          changeCondition: -ROWS_NUMBER
        }
      case "left":
        return {
          whileCondition:
            getColFromPosition(pos) > FIRST_COL_OR_ROW &&
            getRowFromPosition(pos - NEXT_POSITION) ===
              getRowFromPosition(initialTilePosition),
          moveCondition:
            getRowFromPosition(pos - NEXT_POSITION) ===
            getRowFromPosition(initialTilePosition)
              ? pos - NEXT_POSITION
              : 0,
          changeCondition: NEXT_POSITION
        }

      case "right":
        return {
          whileCondition:
            getColFromPosition(pos) < LAST_COL_OR_ROW &&
            getRowFromPosition(pos + NEXT_POSITION) ===
              getRowFromPosition(initialTilePosition),
          moveCondition:
            getRowFromPosition(pos + NEXT_POSITION) ===
            getRowFromPosition(initialTilePosition)
              ? pos + NEXT_POSITION
              : 0,
          changeCondition: -NEXT_POSITION
        }
      default:
        return null
    }
  }

  while (
    setCondition(direction, position)?.whileCondition &&
    !takenPositions.includes(
      Number(setCondition(direction, position)?.moveCondition)
    )
  ) {
    position -= Number(setCondition(direction, position)?.changeCondition)
  }

  const reUpdatedTiles: TileInfo[] = updatedTiles.map(
    (tile: TileInfo): TileInfo =>
      tile.position === initialTilePosition ? { ...tile, position } : tile
  )
  if (
    takenPositions.includes(
      Number(setCondition(direction, position)?.moveCondition)
    )
  ) {
    if (
      reUpdatedTiles.find(
        (tile: TileInfo): boolean =>
          tile.position ===
          Number(setCondition(direction, position)?.moveCondition)
      )?.value === tileValue &&
      !reUpdatedTiles.find(
        (tile: TileInfo): boolean =>
          tile.position ===
          Number(setCondition(direction, position)?.moveCondition)
      )?.merged
    ) {
      const reducedTiles: TileInfo[] = []
      reUpdatedTiles.forEach((tile: TileInfo): void => {
        if (!equals({ position, value: tileValue }, tile)) {
          reducedTiles.push(tile)
        }
      })
      return reducedTiles.map(
        (tile: TileInfo): TileInfo =>
          tile.position ===
          Number(setCondition(direction, position)?.moveCondition)
            ? { ...tile, value: tile.value * 2, merged: true }
            : tile
      )
    }

    return reUpdatedTiles
  }

  return reUpdatedTiles
}

export const handleMoveUp = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = getBasicTiles(takenTiles)
  let updatedTiles: TileInfo[] = []

  // first pushes all tiles into a new array so that first row is included unspoiled, other row are changed by moveOrMerge
  sortedTiles.forEach((tile: TileInfo): void => {
    updatedTiles.push(tile)
  })
  updatedTiles.forEach((tile: TileInfo): void => {
    if (getRowFromPosition(tile.position) !== FIRST_COL_OR_ROW) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "up"
      })
    }
  })

  return updatedTiles.sort((a, b) => (a.position > b.position ? 1 : -1))
}

export const handleMoveDown = (takenTiles: TileInfo[]): TileInfo[] => {
  const basicTiles: TileInfo[] = getBasicTiles(takenTiles)
  const sortedTiles: TileInfo[] = basicTiles.sort((a, b) =>
    b.position > a.position ? 1 : -1
  )
  let updatedTiles: TileInfo[] = []

  // first pushes all tiles into a new array so that last row is included unspoiled, other row are changed by moveOrMerge
  sortedTiles.forEach((tile: TileInfo): void => {
    updatedTiles.push(tile)
  })
  updatedTiles.forEach((tile: TileInfo): void => {
    if (getRowFromPosition(tile.position) !== LAST_COL_OR_ROW) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "down"
      })
    }
  })

  return updatedTiles.sort((a, b) => (a.position > b.position ? 1 : -1))
}
export const handleMoveLeft = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = getBasicTiles(takenTiles)

  let updatedTiles: TileInfo[] = []
  // first pushes all tiles into a new array so that last row is included unspoiled, other row are changed by moveOrMerge
  sortedTiles.forEach((tile: TileInfo): void => {
    updatedTiles.push(tile)
  })
  updatedTiles.forEach((tile: TileInfo): void => {
    if (getColFromPosition(tile.position) !== FIRST_COL_OR_ROW) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "left"
      })
    }
  })

  return updatedTiles.sort((a, b) => (a.position > b.position ? 1 : -1))
}

export const handleMoveRight = (takenTiles: TileInfo[]): TileInfo[] => {
  const basicTiles: TileInfo[] = getBasicTiles(takenTiles)
  const sortedTiles: TileInfo[] = basicTiles.sort((a, b) =>
    b.position > a.position ? 1 : -1
  )
  let updatedTiles: TileInfo[] = []

  // first pushes all tiles into a new array so that last row is included unspoiled, other rows are changed by moveOrMerge
  sortedTiles.forEach((tile: TileInfo): void => {
    updatedTiles.push(tile)
  })
  updatedTiles.forEach((tile: TileInfo): void => {
    if (getColFromPosition(tile.position) !== LAST_COL_OR_ROW) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "right"
      })
    }
  })

  return updatedTiles.sort((a, b) => (a.position > b.position ? 1 : -1))
}

export const bestScore = (takenTiles: TileInfo[]): number => {
  const sortedTiles: TileInfo[] = takenTiles.sort((a, b) =>
    b.value > a.value ? 1 : -1
  )
  return sortedTiles[0].value
}

export const isGameOver = (takenTiles: TileInfo[]): boolean => {
  const sortedTiles: TileInfo[] = getBasicTiles(takenTiles)
  const afterUp: TileInfo[] = getBasicTiles(handleMoveUp(takenTiles))
  const afterDown: TileInfo[] = getBasicTiles(handleMoveDown(takenTiles))
  const afterLeft: TileInfo[] = getBasicTiles(handleMoveLeft(takenTiles))
  const afterRight: TileInfo[] = getBasicTiles(handleMoveRight(takenTiles))

  const upAndDown: boolean = equals(afterUp, afterDown)
  const leftAndRight: boolean = equals(afterRight, afterLeft)
  const moves: boolean =
    upAndDown && leftAndRight ? equals(afterUp, afterLeft) : false
  const gameIsOver: boolean = moves && equals(afterUp, sortedTiles)

  return Boolean(gameIsOver)
}
