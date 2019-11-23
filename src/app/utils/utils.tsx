import React, { ReactElement } from "react"
import { Cell } from "../styles/styled"

export const CELLS_NUMBER = 16

export const getRandomCellId = (): number => {
  return Math.floor(Math.random() * (CELLS_NUMBER - 1))
}

const firstRandomId = getRandomCellId()
let secondRandomId = getRandomCellId()
if (secondRandomId === firstRandomId) {
  secondRandomId = getRandomCellId()
}

export const createGrid = (number: number) => {
  const cells: ReactElement[] = []
  for (let i = 1; i <= number; i++) {
    cells.push(<Cell key={i} />)
  }
  return cells
}
