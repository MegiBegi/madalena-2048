export const UPDATE_SCORE = "UPDATE SCORE"
export const NEW_GAME = "RESET GAME"

interface UpdateScore {
  type: "UPDATE SCORE"
}

interface NewGame {
  type: "RESET GAME"
}

export type Actions = UpdateScore | NewGame

export const updateScore = (): UpdateScore => ({
  type: UPDATE_SCORE
})

export const newGame = (): NewGame => ({
  type: NEW_GAME
})
