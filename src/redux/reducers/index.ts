import {
  Actions,
  MOVE_UP,
  NEW_GAME,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT
} from "../actions"
import {
  getRandomNumber,
  handleMoveUp,
  handleMoveDown,
  handleMoveLeft,
  handleMoveRight
} from "../../app/utils"

declare global {
  interface TileInfo {
    row: number
    col: number
    value: number
  }
}
export interface RootState {
  isPlaying: boolean
  numbers: TileInfo[]
}

const initialState: RootState = {
  numbers: [],
  isPlaying: true
}

const mainReducer = (state: RootState = initialState, action: Actions) => {
  switch (action.type) {
    case NEW_GAME: {
      const tilesWithFirstNumber = getRandomNumber([])
      //here is a bag as sometimes only one number is picked
      return { ...state, numbers: getRandomNumber(tilesWithFirstNumber) }
    }
    case MOVE_UP:
      return { ...state, numbers: handleMoveUp(state.numbers) }

    case MOVE_DOWN:
      return { ...state, numbers: handleMoveDown(state.numbers) }

    case MOVE_LEFT:
      return { ...state, numbers: handleMoveLeft(state.numbers) }

    case MOVE_RIGHT:
      return { ...state, numbers: handleMoveRight(state.numbers) }

    default:
      return state
  }
}

export default mainReducer
