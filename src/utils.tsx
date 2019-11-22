import React, { ReactElement } from "react"
import { Cell } from "./styled"

export const CELLS_NUMBER = 16

export const createGrid = (number: number) => {
  const cells: ReactElement[] = []
  for (let i = 1; i <= number; i++) {
    cells.push(<Cell key="id" id="id" />)
  }
  return cells
}

export const getRandomCell = (): number => {
  return Math.floor(Math.random() * (CELLS_NUMBER - 1))
}
