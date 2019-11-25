export const UPDATE_SCORE = "UPDATE SCORE"
export const NEW_GAME = "RESET GAME"
export const MOVE_UP = "MOVE UP"

interface UpdateScore {
  type: "UPDATE SCORE"
}

interface NewGame {
  type: "RESET GAME"
}

interface MoveUp {
  type: "MOVE UP"
}

export type Actions = UpdateScore | NewGame | MoveUp

export const updateScore = (): UpdateScore => ({
  type: UPDATE_SCORE
})

export const newGame = (): NewGame => ({
  type: NEW_GAME
})

export const moveUp = (): MoveUp => ({
  type: MOVE_UP
})
