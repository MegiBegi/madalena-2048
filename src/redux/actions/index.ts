export const UPDATE_SCORE = "UPDATE SCORE"

interface UpdateScore {
  type: "UPDATE SCORE"
}

export type Actions = UpdateScore

export const updateScore = (): UpdateScore => ({
  type: UPDATE_SCORE
})
