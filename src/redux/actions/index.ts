export const UPDATE_SCORE = "UPDATE SCORE"
export const NEW_GAME = "NEW GAME"
export const MOVE_UP = "MOVE UP"
export const MOVE_DOWN = "MOVE DOWN"
export const MOVE_LEFT = "MOVE LEFT"
export const MOVE_RIGHT = "MOVE RIGHT"
export const NEW_ROUND = "NEW ROUND"

interface UpdateScore {
  type: "UPDATE SCORE"
}

interface NewGame {
  type: "NEW GAME"
}
interface MoveUp {
  type: "MOVE UP"
}

interface MoveDown {
  type: "MOVE DOWN"
}

interface MoveLeft {
  type: "MOVE LEFT"
}

interface MoveRight {
  type: "MOVE RIGHT"
}

interface NewRound {
  type: "NEW ROUND"
}

export type Actions =
  | UpdateScore
  | NewGame
  | MoveUp
  | MoveDown
  | MoveLeft
  | MoveRight
  | NewRound

export const updateScore = (): UpdateScore => ({
  type: UPDATE_SCORE
})

export const newGame = (): NewGame => ({
  type: NEW_GAME
})

export const moveUp = (): MoveUp => ({
  type: MOVE_UP
})

export const moveDown = (): MoveDown => ({
  type: MOVE_DOWN
})

export const moveLeft = (): MoveLeft => ({
  type: MOVE_LEFT
})

export const moveRight = (): MoveRight => ({
  type: MOVE_RIGHT
})

export const newRound = (): NewRound => ({
  type: NEW_ROUND
})
