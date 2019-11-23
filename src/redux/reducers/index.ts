import { Actions, UPDATE_SCORE, NEW_GAME } from "../actions"
import {
  firstInitial,
  secondInitial,
  getRandomGridPosition,
  isTheDigitDrawn
} from "../../app/utils/utils"

export interface RootState {
  isPlaying: boolean
  firstInitialTile: Grid
  secondInitialTile: Grid
}
interface Grid {
  row: number
  col: number
  isTwo?: boolean
  isFour?: boolean
}

const initialState: RootState = {
  isPlaying: false,
  firstInitialTile: {
    ...firstInitial,
    isTwo: isTheDigitDrawn(2),
    isFour: !firstInitial.isTwo
  },
  secondInitialTile: {
    ...secondInitial,
    isTwo: isTheDigitDrawn(2),
    isFour: !secondInitial.isTwo
  }
}

const mainReducer = (state: RootState = initialState, action: Actions) => {
  switch (action.type) {
    case NEW_GAME:
      return {
        ...state,
        firstInitialTile: {
          ...getRandomGridPosition(4),
          isTwo: isTheDigitDrawn(2),
          isFour: !firstInitial.isTwo
        },
        secondInitialTile: {
          ...getRandomGridPosition(4),
          isTwo: isTheDigitDrawn(2),
          isFour: !secondInitial.isTwo
        },
        isPlaying: true
      }
    default:
      return state
  }
}

export default mainReducer
