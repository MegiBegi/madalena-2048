import { Actions, UPDATE_SCORE, RESET_GAME } from "../actions"

export interface RootState {}

const initialState: RootState = {}

const mainReducer = (state: RootState = initialState, action: Actions) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return {
        state
      }
    default:
      return state
  }
}

export default mainReducer
