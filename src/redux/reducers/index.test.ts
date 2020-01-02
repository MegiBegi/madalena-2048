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

  it("handles move up wth 3 digits, 2 last to be merged", (): void => {
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

  it("handles move up wth 3 digits, 2 first to be merged", (): void => {
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

  it("handles move up with 4 digits, 2 first to be merged", (): void => {
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

  it("handles move up with 4 digits, 2 last to be merged", (): void => {
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
  /*
  it("handles move down wth 3 digits, 2 last to be merged", (): void => {
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
        { position: 10, value: 4 },
        { position: 14, value: 2 }
      ]
    });
  });

  it("handles move down wth 3 digits, 2 first to be merged", (): void => {
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
        { position: 14, value: 32 }
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

  it("handles move down with 4 digits, 2 last to be merged", (): void => {
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
        { position: 6, value: 4 },
        { position: 10, value: 4 },
        { position: 14, value: 8 }
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
        { position: 6, value: 4 },
        { position: 10, value: 4 },
        { position: 14, value: 8 }
      ]
    });
  });

  it("handles move down with 4 digits, 2 first to be merged", (): void => {
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
        { position: 14, value: 4 }
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
        { position: 10, value: 8 },
        { position: 14, value: 16 }
      ]
    });
  });*/
});
