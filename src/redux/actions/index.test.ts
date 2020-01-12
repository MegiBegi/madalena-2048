import * as actions from "redux/actions"

describe("actions", (): void => {
  it("should create an action to start a new game", (): void => {
    const expectedAction = {
      type: actions.NEW_GAME
    }
    expect(actions.newGame()).toEqual(expectedAction)
  })
})

describe("actions", (): void => {
  it("should create an action to move the tiles up", (): void => {
    const expectedAction = {
      type: actions.MOVE_UP
    }
    expect(actions.moveUp()).toEqual(expectedAction)
  })
})

describe("actions", (): void => {
  it("should create an action to move the tiles down", (): void => {
    const expectedAction = {
      type: actions.MOVE_DOWN
    }
    expect(actions.moveDown()).toEqual(expectedAction)
  })
})

describe("actions", (): void => {
  it("should create an action to move the tiles left", (): void => {
    const expectedAction = {
      type: actions.MOVE_LEFT
    }
    expect(actions.moveLeft()).toEqual(expectedAction)
  })
})

describe("actions", (): void => {
  it("should create an action to start a new round", (): void => {
    const expectedAction = {
      type: actions.NEW_ROUND
    }
    expect(actions.newRound()).toEqual(expectedAction)
  })
})

describe("actions", (): void => {
  it("should create an action to undo the previous move", (): void => {
    const expectedAction = {
      type: actions.UNDO
    }
    expect(actions.undo()).toEqual(expectedAction)
  })
})

describe("actions", (): void => {
  it("should create an action to get the score", (): void => {
    const expectedAction = {
      type: actions.GET_SCORE
    }
    expect(actions.getScore()).toEqual(expectedAction)
  })
})

describe("actions", (): void => {
  it("should create an action to detect when the game is over", (): void => {
    const expectedAction = {
      type: actions.GAME_OVER
    }
    expect(actions.gameOver()).toEqual(expectedAction)
  })
})
