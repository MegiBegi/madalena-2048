import React, { ReactElement } from "react"
import { Cell } from "../styles/styled"

export const CELLS_NUMBER = 16

const allTilesIds = []
for (let i = 0; i < CELLS_NUMBER; i++) {
  allTilesIds.push(i)
}

export const getTwoRandomTileIds = () => {
  const allTilesIds: number[] = []
  for (let i = 0; i < CELLS_NUMBER; i++) {
    allTilesIds.push(i)
  }
  const firstId = Math.floor(Math.random() * (CELLS_NUMBER - 1))
  let secondId = Math.floor(Math.random() * (CELLS_NUMBER - 1))
  if (secondId === firstId) {
    secondId = Math.floor(Math.random() * (CELLS_NUMBER - 1))
  }
  console.log(firstId)
  console.log(secondId)
}

export const createGrid = (number: number) => {
  const cells: ReactElement[] = []
  for (let i = 1; i <= number; i++) {
    cells.push(
      <Cell key={i} color="red">
        {i}
      </Cell>
    )
  }
  return cells
}
