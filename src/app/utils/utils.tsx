import React, { ReactElement } from "react"
import { Cell } from "../styles/styled"

export const CELLS_NUMBER = 16
export const ROWS_NUM = 4

interface Grid {
  row: number
  col: number
  isTwo?: boolean
}

const allTilesIds = []
for (let i = 0; i < CELLS_NUMBER; i++) {
  allTilesIds.push(i)
}

const getRandomNumber = (numberOfCells: number): number => {
  return Math.floor(Math.random() * (numberOfCells - 1))
}

export const getRandomGridPosition = (numberOfCells: number): Grid => {
  return {
    row: Math.floor(Math.random() * (numberOfCells - 1)),
    col: Math.floor(Math.random() * (numberOfCells - 1))
  }
}

export const isTheDigitDrawn = (digit: number): boolean => {
  const probability = [2, 2, 2, 4, 4]
  const randomPosition = Math.floor(Math.random() * 4)
  if (probability[randomPosition] === digit) {
    return true
  } else return false
}

export const firstInitial: Grid = getRandomGridPosition(4)
export let secondInitial: Grid = getRandomGridPosition(4)
if (secondInitial === firstInitial) {
  secondInitial = getRandomGridPosition(4)
}
