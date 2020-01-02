import reducer, { initialState, RootState } from "./index";
import * as actions from "../actions";

describe("mainReducer", (): void => {
  let state: RootState = initialState;

  const actionNoop = { type: "NOOP" };

  beforeEach((): void => {
    state = initialState;
  });

  it("has a default state", () => {
    // @ts-ignore
    expect(reducer(undefined, actionNoop)).toEqual(state);
  });

  it("returns the initial state", () => {
    // @ts-ignore
    expect(reducer(state, actionNoop)).toEqual(state);
  });

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
        { position: 5, value: 4 }
      ]
    });
  });

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
        { position: 1, value: 4 },
        { position: 5, value: 4 }
      ]
    });
  });

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
      ]
    });
  });

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
        { position: 1, value: 4 },
        { position: 5, value: 4 },
        { position: 9, value: 8 }
      ]
    });
  });

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
        { position: 5, value: 4 },
        { position: 9, value: 8 }
      ]
    });
  });

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
        { position: 9, value: 4 }
      ]
    });
  });

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
        { position: 1, value: 8 },
        { position: 5, value: 16 }
      ]
    });
  });

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
        { position: 14, value: 2 },
        { position: 10, value: 8 }
      ]
    });
  });

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
        { position: 14, value: 32 },
        { position: 10, value: 2 }
      ]
    });
  });

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
      ]
    });
  });

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
        { position: 14, value: 8 },
        { position: 10, value: 4 },
        { position: 6, value: 4 }
      ]
    });
  });

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
        { position: 14, value: 8 },
        { position: 10, value: 4 },
        { position: 6, value: 4 }
      ]
    });
  });

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
        { position: 14, value: 4 },
        { position: 10, value: 8 },
        { position: 6, value: 4 }
      ]
    });
  });

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
        { position: 14, value: 16 },
        { position: 10, value: 8 }
      ]
    });
  });

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
        { position: 4, value: 4 },
        { position: 3, value: 4 }
      ]
    });
  });

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
        { position: 4, value: 32 },
        { position: 3, value: 2 }
      ]
    });
  });

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
        { position: 4, value: 4 },
        { position: 3, value: 2 },
        { position: 2, value: 8 },
        { position: 1, value: 4 }
      ]
    });
  });

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
        { position: 4, value: 8 },
        { position: 3, value: 4 },
        { position: 2, value: 4 }
      ]
    });
  });

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
        { position: 4, value: 8 },

        { position: 3, value: 4 },
        { position: 2, value: 4 }
      ]
    });
  });

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
        { position: 4, value: 4 },
        { position: 3, value: 8 },
        { position: 2, value: 4 }
      ]
    });
  });

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
        { position: 4, value: 16 },
        { position: 3, value: 8 }
      ]
    });
  });

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
        { position: 6, value: 4 }
      ]
    });
  });

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
        { position: 6, value: 32 }
      ]
    });
  });

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
      ]
    });
  });

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
        { position: 5, value: 4 },
        { position: 6, value: 4 },
        { position: 7, value: 8 }
      ]
    });
  });

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
        { position: 6, value: 4 },
        { position: 7, value: 8 }
      ]
    });
  });

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
        { position: 5, value: 8 },
        { position: 6, value: 8 },
        { position: 7, value: 2 }
      ]
    });
  });

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
        { position: 5, value: 8 },
        { position: 6, value: 16 }
      ]
    });
  });
});
