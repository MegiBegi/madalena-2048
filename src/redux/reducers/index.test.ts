import reducer, { initialState, RootState } from "redux/reducers"
import * as actions from "redux/actions"

describe("mainReducer", (): void => {
  let state: RootState = initialState

  const actionNoop = { type: "NOOP" }

  beforeEach((): void => {
    state = initialState
  })

  it("has a default state", () => {
    // @ts-ignore
    expect(reducer(undefined, actionNoop)).toEqual(state)
  })

  it("returns the initial state", () => {
    // @ts-ignore
    expect(reducer(state, actionNoop)).toEqual(state)
  })

  it("handles move up wth 3 digits, last 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 5, value: 4 },
            { position: 9, value: 2 },
            { position: 13, value: 2 }
          ]
        },
        {
          type: actions.MOVE_UP
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 4 },
        { position: 5, value: 4, merged: true }
      ],
      prevState: [
        { position: 5, value: 4 },
        { position: 9, value: 2 },
        { position: 13, value: 2 }
      ],
      lastAction: "MOVE UP"
    })
  })

  it("handles move up wth 3 digits, first 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 5, value: 2 },
            { position: 9, value: 2 },
            { position: 13, value: 4 }
          ]
        },
        {
          type: actions.MOVE_UP
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 4, merged: true },
        { position: 5, value: 4 }
      ],
      prevState: [
        { position: 5, value: 2 },
        { position: 9, value: 2 },
        { position: 13, value: 4 }
      ],
      lastAction: "MOVE UP"
    })
  })

  it("handles move up with 4 digits, all to remain untouched", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 5, value: 8 },
            { position: 9, value: 2 },
            { position: 13, value: 4 }
          ]
        },
        {
          type: actions.MOVE_UP
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 4 },
        { position: 5, value: 8 },
        { position: 9, value: 2 },
        { position: 13, value: 4 }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 5, value: 8 },
        { position: 9, value: 2 },
        { position: 13, value: 4 }
      ],
      lastAction: "MOVE UP"
    })
  })

  it("handles move up with 4 digits, first 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 2 },
            { position: 5, value: 2 },
            { position: 9, value: 4 },
            { position: 13, value: 8 }
          ]
        },
        {
          type: actions.MOVE_UP
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 4, merged: true },
        { position: 5, value: 4 },
        { position: 9, value: 8 }
      ],
      prevState: [
        { position: 1, value: 2 },
        { position: 5, value: 2 },
        { position: 9, value: 4 },
        { position: 13, value: 8 }
      ],
      lastAction: "MOVE UP"
    })
  })

  it("handles move up with 4 digits, 2 in the middle to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 5, value: 2 },
            { position: 9, value: 2 },
            { position: 13, value: 8 }
          ]
        },
        {
          type: actions.MOVE_UP
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 4 },
        { position: 5, value: 4, merged: true },
        { position: 9, value: 8 }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 5, value: 2 },
        { position: 9, value: 2 },
        { position: 13, value: 8 }
      ],
      lastAction: "MOVE UP"
    })
  })

  it("handles move up with 4 digits, last 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 5, value: 8 },
            { position: 9, value: 2 },
            { position: 13, value: 2 }
          ]
        },
        {
          type: actions.MOVE_UP
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 4 },
        { position: 5, value: 8 },
        { position: 9, value: 4, merged: true }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 5, value: 8 },
        { position: 9, value: 2 },
        { position: 13, value: 2 }
      ],
      lastAction: "MOVE UP"
    })
  })

  it("handles move up with 4 digits, 2 pairs to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 5, value: 4 },
            { position: 9, value: 8 },
            { position: 13, value: 8 }
          ]
        },
        {
          type: actions.MOVE_UP
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 8, merged: true },
        { position: 5, value: 16, merged: true }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 5, value: 4 },
        { position: 9, value: 8 },
        { position: 13, value: 8 }
      ],
      lastAction: "MOVE UP"
    })
  })

  it("handles move down with 3 digits, last 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 2, value: 4 },
            { position: 6, value: 4 },
            { position: 10, value: 2 }
          ]
        },
        {
          type: actions.MOVE_DOWN
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 10, value: 8, merged: true },
        { position: 14, value: 2 }
      ],
      prevState: [
        { position: 2, value: 4 },
        { position: 6, value: 4 },
        { position: 10, value: 2 }
      ],
      lastAction: "MOVE DOWN"
    })
  })

  it("handles move down with 3 digits, first 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 2, value: 2 },
            { position: 6, value: 16 },
            { position: 10, value: 16 }
          ]
        },
        {
          type: actions.MOVE_DOWN
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 10, value: 2 },
        { position: 14, value: 32, merged: true }
      ],
      prevState: [
        { position: 2, value: 2 },
        { position: 6, value: 16 },
        { position: 10, value: 16 }
      ],
      lastAction: "MOVE DOWN"
    })
  })

  it("handles move down with 4 digits, all to remain untouched", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 5, value: 8 },
            { position: 9, value: 2 },
            { position: 13, value: 4 }
          ]
        },
        {
          type: actions.MOVE_DOWN
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 4 },
        { position: 5, value: 8 },
        { position: 9, value: 2 },
        { position: 13, value: 4 }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 5, value: 8 },
        { position: 9, value: 2 },
        { position: 13, value: 4 }
      ],
      lastAction: "MOVE DOWN"
    })
  })

  it("handles move down with 4 digits, last 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 2, value: 2 },
            { position: 6, value: 2 },
            { position: 10, value: 4 },
            { position: 14, value: 8 }
          ]
        },
        {
          type: actions.MOVE_DOWN
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 6, value: 4, merged: true },
        { position: 10, value: 4 },
        { position: 14, value: 8 }
      ],
      prevState: [
        { position: 2, value: 2 },
        { position: 6, value: 2 },
        { position: 10, value: 4 },
        { position: 14, value: 8 }
      ],
      lastAction: "MOVE DOWN"
    })
  })

  it("handles move down with 4 digits, 2 in the middle to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 2, value: 4 },
            { position: 6, value: 2 },
            { position: 10, value: 2 },
            { position: 14, value: 8 }
          ]
        },
        {
          type: actions.MOVE_DOWN
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 6, value: 4 },
        { position: 10, value: 4, merged: true },
        { position: 14, value: 8 }
      ],
      prevState: [
        { position: 2, value: 4 },
        { position: 6, value: 2 },
        { position: 10, value: 2 },
        { position: 14, value: 8 }
      ],
      lastAction: "MOVE DOWN"
    })
  })

  it("handles move down with 4 digits, first 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 2, value: 4 },
            { position: 6, value: 8 },
            { position: 10, value: 2 },
            { position: 14, value: 2 }
          ]
        },
        {
          type: actions.MOVE_DOWN
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 6, value: 4 },
        { position: 10, value: 8 },
        { position: 14, value: 4, merged: true }
      ],
      prevState: [
        { position: 2, value: 4 },
        { position: 6, value: 8 },
        { position: 10, value: 2 },
        { position: 14, value: 2 }
      ],
      lastAction: "MOVE DOWN"
    })
  })

  it("handles move down with 4 digits, 2 pairs to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 2, value: 4 },
            { position: 6, value: 4 },
            { position: 10, value: 8 },
            { position: 14, value: 8 }
          ]
        },
        {
          type: actions.MOVE_DOWN
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 10, value: 8, merged: true },
        { position: 14, value: 16, merged: true }
      ],
      prevState: [
        { position: 2, value: 4 },
        { position: 6, value: 4 },
        { position: 10, value: 8 },
        { position: 14, value: 8 }
      ],
      lastAction: "MOVE DOWN"
    })
  })

  it("handles move right with 3 digits, first 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 2, value: 2 },
            { position: 3, value: 2 }
          ]
        },
        {
          type: actions.MOVE_RIGHT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 3, value: 4 },
        { position: 4, value: 4, merged: true }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 2, value: 2 },
        { position: 3, value: 2 }
      ],
      lastAction: "MOVE RIGHT"
    })
  })

  it("handles move right wth 3 digits, last 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 2 },
            { position: 2, value: 16 },
            { position: 3, value: 16 }
          ]
        },
        {
          type: actions.MOVE_RIGHT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 3, value: 2 },
        { position: 4, value: 32, merged: true }
      ],
      prevState: [
        { position: 1, value: 2 },
        { position: 2, value: 16 },
        { position: 3, value: 16 }
      ],
      lastAction: "MOVE RIGHT"
    })
  })

  it("handles move right with 4 digits, all to remain untouched", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 2, value: 8 },
            { position: 3, value: 2 },
            { position: 4, value: 4 }
          ]
        },
        {
          type: actions.MOVE_RIGHT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 4 },
        { position: 2, value: 8 },
        { position: 3, value: 2 },
        { position: 4, value: 4 }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 2, value: 8 },
        { position: 3, value: 2 },
        { position: 4, value: 4 }
      ],
      lastAction: "MOVE RIGHT"
    })
  })

  it("handles move right with 4 digits, last 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 2 },
            { position: 2, value: 2 },
            { position: 3, value: 4 },
            { position: 4, value: 8 }
          ]
        },
        {
          type: actions.MOVE_RIGHT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 2, value: 4, merged: true },
        { position: 3, value: 4 },
        { position: 4, value: 8 }
      ],
      prevState: [
        { position: 1, value: 2 },
        { position: 2, value: 2 },
        { position: 3, value: 4 },
        { position: 4, value: 8 }
      ],
      lastAction: "MOVE RIGHT"
    })
  })

  it("handles move right with 4 digits, 2 in the middle to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 2, value: 2 },
            { position: 3, value: 2 },
            { position: 4, value: 8 }
          ]
        },
        {
          type: actions.MOVE_RIGHT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 2, value: 4 },
        { position: 3, value: 4, merged: true },
        { position: 4, value: 8 }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 2, value: 2 },
        { position: 3, value: 2 },
        { position: 4, value: 8 }
      ],
      lastAction: "MOVE RIGHT"
    })
  })

  it("handles move right with 4 digits, first 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 2, value: 8 },
            { position: 3, value: 2 },
            { position: 4, value: 2 }
          ]
        },
        {
          type: actions.MOVE_RIGHT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 2, value: 4 },
        { position: 3, value: 8 },
        { position: 4, value: 4, merged: true }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 2, value: 8 },
        { position: 3, value: 2 },
        { position: 4, value: 2 }
      ],
      lastAction: "MOVE RIGHT"
    })
  })

  it("handles move right with 4 digits, 2 pairs to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 4 },
            { position: 2, value: 4 },
            { position: 3, value: 8 },
            { position: 4, value: 8 }
          ]
        },
        {
          type: actions.MOVE_RIGHT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 3, value: 8, merged: true },
        { position: 4, value: 16, merged: true }
      ],
      prevState: [
        { position: 1, value: 4 },
        { position: 2, value: 4 },
        { position: 3, value: 8 },
        { position: 4, value: 8 }
      ],
      lastAction: "MOVE RIGHT"
    })
  })

  it("handles move left with 3 digits, last 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 6, value: 4 },
            { position: 7, value: 2 },
            { position: 8, value: 2 }
          ]
        },
        {
          type: actions.MOVE_LEFT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 5, value: 4 },
        { position: 6, value: 4, merged: true }
      ],
      prevState: [
        { position: 6, value: 4 },
        { position: 7, value: 2 },
        { position: 8, value: 2 }
      ],
      lastAction: "MOVE LEFT"
    })
  })

  it("handles move left wth 3 digits, last 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 6, value: 2 },
            { position: 7, value: 16 },
            { position: 8, value: 16 }
          ]
        },
        {
          type: actions.MOVE_LEFT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 5, value: 2 },
        { position: 6, value: 32, merged: true }
      ],
      prevState: [
        { position: 6, value: 2 },
        { position: 7, value: 16 },
        { position: 8, value: 16 }
      ],
      lastAction: "MOVE LEFT"
    })
  })

  it("handles move left with 4 digits, all to remain untouched", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 5, value: 4 },
            { position: 6, value: 8 },
            { position: 7, value: 2 },
            { position: 8, value: 4 }
          ]
        },
        {
          type: actions.MOVE_LEFT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 5, value: 4 },
        { position: 6, value: 8 },
        { position: 7, value: 2 },
        { position: 8, value: 4 }
      ],
      prevState: [
        { position: 5, value: 4 },
        { position: 6, value: 8 },
        { position: 7, value: 2 },
        { position: 8, value: 4 }
      ],
      lastAction: "MOVE LEFT"
    })
  })

  it("handles move left with 4 digits, first 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 5, value: 2 },
            { position: 6, value: 2 },
            { position: 7, value: 4 },
            { position: 8, value: 8 }
          ]
        },
        {
          type: actions.MOVE_LEFT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 5, value: 4, merged: true },
        { position: 6, value: 4 },
        { position: 7, value: 8 }
      ],
      prevState: [
        { position: 5, value: 2 },
        { position: 6, value: 2 },
        { position: 7, value: 4 },
        { position: 8, value: 8 }
      ],
      lastAction: "MOVE LEFT"
    })
  })

  it("handles move left with 4 digits, 2 in the middle to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 5, value: 4 },
            { position: 6, value: 2 },
            { position: 7, value: 2 },
            { position: 8, value: 8 }
          ]
        },
        {
          type: actions.MOVE_LEFT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 5, value: 4 },
        { position: 6, value: 4, merged: true },
        { position: 7, value: 8 }
      ],
      prevState: [
        { position: 5, value: 4 },
        { position: 6, value: 2 },
        { position: 7, value: 2 },
        { position: 8, value: 8 }
      ],
      lastAction: "MOVE LEFT"
    })
  })

  it("handles move left with 4 digits, first 2 to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 5, value: 4 },
            { position: 6, value: 4 },
            { position: 7, value: 8 },
            { position: 8, value: 2 }
          ]
        },
        {
          type: actions.MOVE_LEFT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 5, value: 8, merged: true },
        { position: 6, value: 8 },
        { position: 7, value: 2 }
      ],
      prevState: [
        { position: 5, value: 4 },
        { position: 6, value: 4 },
        { position: 7, value: 8 },
        { position: 8, value: 2 }
      ],
      lastAction: "MOVE LEFT"
    })
  })

  it("handles move left with 4 digits, 2 pairs to be merged", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 5, value: 4 },
            { position: 6, value: 4 },
            { position: 7, value: 8 },
            { position: 8, value: 8 }
          ]
        },
        {
          type: actions.MOVE_LEFT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 5, value: 8, merged: true },
        { position: 6, value: 16, merged: true }
      ],
      prevState: [
        { position: 5, value: 4 },
        { position: 6, value: 4 },
        { position: 7, value: 8 },
        { position: 8, value: 8 }
      ],
      lastAction: "MOVE LEFT"
    })
  })

  it("handles move left at a possible change of rows", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 8 },
            { position: 2, value: 4 },
            { position: 3, value: 2 },
            { position: 4, value: 4 },
            { position: 6, value: 4 },
            { position: 9, value: 4 }
          ]
        },
        {
          type: actions.MOVE_LEFT
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 8 },
        { position: 2, value: 4 },
        { position: 3, value: 2 },
        { position: 4, value: 4 },
        { position: 5, value: 4 },
        { position: 9, value: 4 }
      ],
      prevState: [
        { position: 1, value: 8 },
        { position: 2, value: 4 },
        { position: 3, value: 2 },
        { position: 4, value: 4 },
        { position: 6, value: 4 },
        { position: 9, value: 4 }
      ],
      lastAction: "MOVE LEFT"
    })
  })

  it("handles undo at the first trial", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 5, value: 8, merged: true },
            { position: 6, value: 16, merged: true }
          ],
          prevState: [
            { position: 5, value: 4 },
            { position: 6, value: 4 },
            { position: 7, value: 8 },
            { position: 8, value: 8 }
          ],
          undoCount: 3,
          lastAction: "MOVE LEFT"
        },
        {
          type: actions.UNDO
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 5, value: 4 },
        { position: 6, value: 4 },
        { position: 7, value: 8 },
        { position: 8, value: 8 }
      ],
      prevState: [
        { position: 5, value: 4 },
        { position: 6, value: 4 },
        { position: 7, value: 8 },
        { position: 8, value: 8 }
      ],
      lastAction: "UNDO",
      undoCount: 2
    })
  })

  it("handles gameOver when game is over", (): void => {
    expect(
      reducer(
        {
          ...state,
          numbers: [
            { position: 1, value: 2 },
            { position: 2, value: 4 },
            { position: 3, value: 16 },
            { position: 4, value: 2 },
            { position: 5, value: 8 },
            { position: 6, value: 64 },
            { position: 7, value: 8 },
            { position: 8, value: 32 },
            { position: 9, value: 2 },
            { position: 10, value: 16 },
            { position: 11, value: 2 },
            { position: 12, value: 16 },
            { position: 13, value: 4 },
            { position: 14, value: 8 },
            { position: 15, value: 4 },
            { position: 16, value: 2 }
          ],
          lastAction: "MOVE DOWN"
        },
        {
          type: actions.GAME_OVER
        }
      )
    ).toEqual({
      ...state,
      numbers: [
        { position: 1, value: 2 },
        { position: 2, value: 4 },
        { position: 3, value: 16 },
        { position: 4, value: 2 },
        { position: 5, value: 8 },
        { position: 6, value: 64 },
        { position: 7, value: 8 },
        { position: 8, value: 32 },
        { position: 9, value: 2 },
        { position: 10, value: 16 },
        { position: 11, value: 2 },
        { position: 12, value: 16 },
        { position: 13, value: 4 },
        { position: 14, value: 8 },
        { position: 15, value: 4 },
        { position: 16, value: 2 }
      ],
      gameIsOver: true,
      lastAction: "MOVE DOWN"
    })
  })
})
