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

export const getTwoRandomTileIds = () => {
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

export const createGrid = (number: number) => {
  const cells: ReactElement[] = []
  const randomIds = getTwoRandomTileIds()
  console.log("randomIds", randomIds)
  for (let i = 0; i <= number - 1; i++) {
    if (i === randomIds[0]) {
      console.log(randomIds[0])
      cells.push(
        <Cell key={i} color="white">
          2
        </Cell>
      )
    } else if (i === randomIds[1]) {
      console.log(randomIds[1])
      cells.push(
        <Cell key={i} color="white">
          4
        </Cell>
      )
    } else {
      cells.push(<Cell key={i} />)
    }
  }
  return cells
}
