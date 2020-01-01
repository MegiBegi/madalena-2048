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

  it("handles move up", (): void => {
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
});
