import { Actions, UPDATE_SCORE, RESET_GAME } from "../actions"

export interface RootState {
  test: string
}

const initialState: RootState = {
  test: "magdusia"
}

const mainReducer = (state: RootState = initialState, action: Actions) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return {
        ...state
      }
    default:
      return state
  }
}

export default mainReducer
