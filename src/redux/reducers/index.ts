import { Actions } from "../actions"

export interface RootState {
  score: number
}

const initialState: RootState = {
  score: 4
}

const mainReducer = (state: RootState = initialState, action: Actions) => {
  return state
}

export default mainReducer
