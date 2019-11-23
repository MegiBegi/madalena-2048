import { Actions, UPDATE_SCORE, NEW_GAME } from "../actions"

export interface RootState {
  test: string
}

const initialState: RootState = {
  test: "magdusia"
}

const mainReducer = (state: RootState = initialState, action: Actions) => {
  switch (action.type) {
    case NEW_GAME:
      return state
    default:
      return state
  }
}

export default mainReducer
