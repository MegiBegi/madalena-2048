export const UPDATE_SCORE = "UPDATE SCORE"
export const RESET_GAME = "RESET GAME"

interface UpdateScore {
  type: "UPDATE SCORE"
}

interface ResetGame {
  type: "RESET GAME"
}

export type Actions = UpdateScore | ResetGame

export const updateScore = (): UpdateScore => ({
  type: UPDATE_SCORE
})

export const resetGame = (): ResetGame => ({
  type: RESET_GAME
})
