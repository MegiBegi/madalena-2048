import { Actions } from "../actions"
import { RESET_GAME } from "../actions"
import { CELLS_NUMBER, getRandomCell } from "../../utils"

export interface RootState {
  score: number
  firstRandomTileId: number | null
  secondRandomTileId: number | null
}

const initialState: RootState = {
  score: 4,
  firstRandomTileId: getRandomCell(),
  secondRandomTileId: getRandomCell()
}

const mainReducer = (state: RootState = initialState, action: Actions) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        state
      }

    default:
      return {
        state
      }
  }
}

export default mainReducer
