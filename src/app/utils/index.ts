import { equals } from "ramda";
export const CELLS_NUMBER = 16;
export const ROWS_NUMBER = 4;
export const COLS_NUMBER = 4;
const NEXT_POSITION = 1;
const FIRST_COL_OR_ROW = 1;
const LAST_COL_OR_ROW = 4;

type Direction = "up" | "down" | "right" | "left";

const getAllPositions = () => {
  let positions: number[] = [];

  for (let i = 1; i <= CELLS_NUMBER; i++) {
    positions.push(i);
  }
  return positions;
};

const getRandomValue = (): number => {
  const possibleRandomValues = [2, 4];
  const randomIndex = Math.floor(Math.random() * possibleRandomValues.length);
  return possibleRandomValues[randomIndex];
};

export const getRandomNumber = (takenTiles: TileInfo[]): TileInfo[] => {
  let places: number[] = getAllPositions();
  const takenPositions: number[] = takenTiles.map(
    (tile: TileInfo): number => tile.position
  );
  let takenPlaces: number[];
  takenPlaces = takenTiles.length === 0 ? [] : takenPositions;
  let emptyPlaces = [];

  for (let place of places) {
    if (!takenPlaces.includes(place)) {
      emptyPlaces.push(place);
    }
  }

  const newPosition: number =
    emptyPlaces[Math.floor(Math.random() * emptyPlaces.length)];

  const value = getRandomValue();
  const newRandomNumber: TileInfo = {
    position: newPosition,
    value: value
  };
  return [...takenTiles, newRandomNumber];
};

export const createEmptyTilesGrid = () => {
  const allPos = getAllPositions();
  const emptyTilesGrid = allPos.map(el => {
    return { position: el, value: 0 };
  });
  return emptyTilesGrid;
};

export const getTileColor = (tile: TileInfo): string => {
  switch (tile.value) {
    case 0:
      return "#8b9ab3";
    case 2:
      return "#6b7585";
    case 4:
      return "#d5e317";
    case 8:
      return "#17e3c8";
    case 16:
      return "#70537a";
    case 32:
      return "#70437a";
    case 64:
      return "#09537a";
    case 128:
      return "#20887f";
    case 256:
      return "#33437a";
    case 512:
      return "#11598a";
    case 1024:
      return "#56951c";
    case 2048:
      return "#00533a";
    case 4096:
      return "#00531a";
    case 8196:
      return "#44597a";
    case 16396:
      return "#074a2e";
    default:
      return "#074e4e";
  }
};

export const getTileFontSize = (tile: TileInfo): string => {
  const { value } = tile;
  switch (true) {
    case value < 128:
      return "100%";
    case value >= 128 && value < 1024:
      return "75%";
    case value >= 1024 && value < 16396:
      return "55%";
    case value >= 16396:
      return "40%";
    default:
      return "100%";
  }
};

export const updateGrid = (updates: TileInfo[]): TileInfo[] => {
  const emptyGrid = createEmptyTilesGrid();
  const takenTiles = updates;
  const updatedGrid = emptyGrid.map(
    (tile: TileInfo): TileInfo =>
      takenTiles.find(
        (takenTile: TileInfo): boolean => takenTile.position === tile.position
      ) || tile
  );

  return updatedGrid;
};

const getRowFromPosition = (newPosition: number): number =>
  newPosition <= 4 ? 1 : Math.ceil(newPosition / ROWS_NUMBER);

const getColFromPosition = (newPosition: number): number => {
  if (newPosition <= COLS_NUMBER) {
    return newPosition;
  }
  if (newPosition % COLS_NUMBER === 0) {
    return COLS_NUMBER;
  }
  return newPosition % COLS_NUMBER;
};

const moveOrMerge = ({
  updatedTiles,
  tile,
  direction
}: {
  updatedTiles: TileInfo[];
  direction: Direction;
  tile: TileInfo;
}): TileInfo[] => {
  let takenPositions = updatedTiles.map(tile => tile.position);
  const initialTilePosition = tile.position;
  let position = tile.position;
  const tileValue = tile.value;
  const whileCondition = (direction: string, pos: number): boolean => {
    switch (direction) {
      case "up":
        return getRowFromPosition(pos) > FIRST_COL_OR_ROW;
      case "down":
        return getRowFromPosition(pos) < LAST_COL_OR_ROW;
      case "left":
        return getColFromPosition(pos) > FIRST_COL_OR_ROW;
      case "right":
        return getColFromPosition(pos) < LAST_COL_OR_ROW;
      default:
        return false;
    }
  };

  const moveCondition = (direction: string, pos: number): number => {
    switch (direction) {
      case "up":
        return pos - ROWS_NUMBER;
      case "down":
        return pos + ROWS_NUMBER;
      case "left":
        return position - NEXT_POSITION;
      case "right":
        return pos + NEXT_POSITION;
      default:
        return pos;
    }
  };

  const changePosition = (direction: string): number => {
    switch (direction) {
      case "up":
        return ROWS_NUMBER;
      case "down":
        return -ROWS_NUMBER;
      case "left":
        return NEXT_POSITION;
      case "right":
        return -NEXT_POSITION;
      default:
        return 0;
    }
  };

  while (
    whileCondition(direction, position) &&
    !takenPositions.includes(moveCondition(direction, position))
  ) {
    console.log({ whileCondition });
    position -= changePosition(direction);
  }

  let reUpdatedTiles: TileInfo[] = updatedTiles.map(
    (tile: TileInfo): TileInfo =>
      tile.position === initialTilePosition ? { ...tile, position } : tile
  );
  if (takenPositions.includes(moveCondition(direction, position))) {
    if (
      reUpdatedTiles.find(
        (tile: TileInfo): boolean =>
          tile.position === moveCondition(direction, position)
      )?.value === tileValue &&
      !reUpdatedTiles.find(
        (tile: TileInfo): boolean =>
          tile.position === moveCondition(direction, position)
      )?.merged
    ) {
      let reducedTiles: TileInfo[] = [];
      reUpdatedTiles.forEach((tile: TileInfo): void => {
        if (!equals({ position, value: tileValue }, tile)) {
          reducedTiles.push(tile);
        }
      });
      return reducedTiles.map(
        (tile: TileInfo): TileInfo =>
          tile.position === moveCondition(direction, position)
            ? { ...tile, value: tile.value * 2, merged: true }
            : tile
      );
    }

    return reUpdatedTiles;
  }

  return reUpdatedTiles;
};

export const handleMoveUp = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = takenTiles.sort((a, b) =>
    a.position > b.position ? 1 : -1
  );
  let updatedTiles: TileInfo[] = [];

  // first pushes all tiles into a new array so that first row is included unspoiled, other row are changed by moveOrMerge
  sortedTiles.forEach((tile: TileInfo): void => {
    updatedTiles.push(tile);
  });
  updatedTiles.forEach((tile: TileInfo): void => {
    if (getRowFromPosition(tile.position) !== FIRST_COL_OR_ROW) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "up"
      });
    }
  });

  return updatedTiles.map(
    ({ value, position }): TileInfo => ({
      value,
      position
    })
  );
};

export const handleMoveDown = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = takenTiles.sort((a, b) =>
    b.position > a.position ? 1 : -1
  );
  let updatedTiles: TileInfo[] = [];

  // first pushes all tiles into a new array so that last row is included unspoiled, other row are changed by moveOrMerge
  sortedTiles.forEach((tile: TileInfo): void => {
    updatedTiles.push(tile);
  });
  updatedTiles.forEach((tile: TileInfo): void => {
    if (getRowFromPosition(tile.position) !== LAST_COL_OR_ROW) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "down"
      });
    }
  });
  console.log({ updatedTiles });

  return updatedTiles.map(
    ({ value, position }): TileInfo => ({
      value,
      position
    })
  );
};
export const handleMoveLeft = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = takenTiles.sort((a, b) =>
    a.position > b.position ? 1 : -1
  );
  let updatedTiles: TileInfo[] = [];
  // first pushes all tiles into a new array so that last row is included unspoiled, other row are changed by moveOrMerge
  sortedTiles.forEach((tile: TileInfo): void => {
    updatedTiles.push(tile);
  });
  updatedTiles.forEach((tile: TileInfo): void => {
    if (getColFromPosition(tile.position) !== FIRST_COL_OR_ROW) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "left"
      });
    }
  });

  return updatedTiles.map(
    ({ value, position }): TileInfo => ({
      value,
      position
    })
  );
};
export const handleMoveRight = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = takenTiles.sort((a, b) =>
    b.position > a.position ? 1 : -1
  );
  let updatedTiles: TileInfo[] = [];

  // first pushes all tiles into a new array so that last row is included unspoiled, other row are changed by moveOrMerge
  sortedTiles.forEach((tile: TileInfo): void => {
    updatedTiles.push(tile);
  });
  updatedTiles.forEach((tile: TileInfo): void => {
    if (getColFromPosition(tile.position) !== LAST_COL_OR_ROW) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "right"
      });
    }
  });

  return updatedTiles.map(
    ({ value, position }): TileInfo => ({
      value,
      position
    })
  );
};
