import {
  Actions,
  MOVE_UP,
  NEW_GAME,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  NEW_ROUND,
  UNDO,
  GET_SCORE,
  GAME_OVER
} from "redux/actions"
import {
  getRandomNumber,
  handleMoveUp,
  handleMoveDown,
  handleMoveLeft,
  handleMoveRight,
  bestScore,
  isGameOver,
  getBasicTiles
} from "app/utils"
import { equals } from "ramda"

declare global {
  interface TileInfo {
    position: number
    value: number
    merged?: boolean
    newNum?: boolean
  }
}
export interface RootState {
  numbers: TileInfo[]
  prevState: TileInfo[]
  undoCount: number
  lastAction: string
  bestScore: number
  gameIsOver: boolean
}
const tilesWithFirstNumber = getRandomNumber([])

export const initialState: RootState = {
  numbers: getRandomNumber(tilesWithFirstNumber),
  prevState: [],
  undoCount: 3,
  lastAction: "",
  bestScore: 0,
  gameIsOver: false
}

const mainReducer = (state: RootState = initialState, action: Actions) => {
  switch (action.type) {
    case NEW_GAME:
      const tilesWithFirstNumber = getRandomNumber([])
      return {
        ...state,
        numbers: getRandomNumber(tilesWithFirstNumber),
        undoCount: 3,
        lastAction: "NEW GAME",
        prevState: [],
        gameIsOver: false
      }

    case MOVE_UP:
      return {
        ...state,
        numbers: handleMoveUp(state.numbers),
        prevState: state.numbers,
        lastAction: "MOVE UP"
      }

    case MOVE_DOWN:
      return {
        ...state,
        numbers: handleMoveDown(state.numbers),
        prevState: state.numbers,
        lastAction: "MOVE DOWN"
      }

    case MOVE_LEFT:
      return {
        ...state,
        numbers: handleMoveLeft(state.numbers),
        prevState: state.numbers,
        lastAction: "MOVE LEFT"
      }

    case MOVE_RIGHT:
      return {
        ...state,
        numbers: handleMoveRight(state.numbers),
        prevState: state.numbers,
        lastAction: "MOVE RIGHT"
      }

    case NEW_ROUND:
      const newGrid: TileInfo[] = getRandomNumber(state.numbers)
      return state.numbers.length < 16 &&
        !equals(getBasicTiles(state.numbers), getBasicTiles(state.prevState))
        ? {
            ...state,
            numbers: newGrid,
            lastAction: "NEW ROUND"
          }
        : state

    case UNDO:
      const newState: RootState = {
        ...state,
        numbers: state.prevState,
        undoCount: state.undoCount > 0 ? state.undoCount - 1 : state.undoCount,
        lastAction: "UNDO"
      }
      return newState

    case GET_SCORE:
      return {
        ...state,
        bestScore:
          state.bestScore > bestScore(state.numbers)
            ? state.bestScore
            : bestScore(state.numbers)
      }

    case GAME_OVER:
      const gameOver: RootState = { ...state, gameIsOver: true }
      return isGameOver(state.numbers) ? gameOver : state

    default:
      return state
  }
}

export default mainReducer
