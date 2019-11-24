import { Actions, UPDATE_SCORE, NEW_GAME } from "../actions"
import { getRandomNumber } from "../../app/utils"

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
      return { ...state, numbers: getRandomNumber(tilesWithFirstNumber) }
    }
    default:
      return state
  }
}

export default mainReducer
