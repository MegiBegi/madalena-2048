import React, { ReactElement } from "react"
import { Cell } from "../styles/styled"

export const CELLS_NUMBER = 16

const allTilesIds = []
for (let i = 0; i < CELLS_NUMBER; i++) {
  allTilesIds.push(i)
}

const getRandomNumber = (numberOfCells: number): number => {
  return Math.floor(Math.random() * (numberOfCells - 1))
}

const getTwoRandomTileIds = (): number[] => {
  const allTilesIds: number[] = []
  for (let i = 0; i < CELLS_NUMBER; i++) {
    allTilesIds.push(i)
  }
  const firstId = getRandomNumber(CELLS_NUMBER)
  let secondId = getRandomNumber(CELLS_NUMBER)
  if (secondId === firstId) {
    secondId = getRandomNumber(CELLS_NUMBER)
  }
  return [firstId, secondId]
}

const determinePoppingTiles = (): number[] => {
  const possibleVariants: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 4, 4]
  const poppingTiles: number[] = []
  for (let i = 0; i < 2; i++) {
    poppingTiles.push(possibleVariants[getRandomNumber(11)])
  }
  return poppingTiles
}

export const createGrid = (number: number) => {
  const cells: ReactElement[] = []
  const randomIds = getTwoRandomTileIds()
  const poppingTiles = determinePoppingTiles()
  for (let i = 0; i <= number - 1; i++) {
    if (i === randomIds[0]) {
      cells.push(
        <Cell key={i} color="white">
          {poppingTiles[0]}
        </Cell>
      )
    } else if (i === randomIds[1]) {
      cells.push(
        <Cell key={i} color="white">
          {poppingTiles[1]}
        </Cell>
      )
    } else {
      cells.push(<Cell key={i} />)
    }
  }
  return cells
}
