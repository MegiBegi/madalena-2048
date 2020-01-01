export const CELLS_NUMBER = 16;
export const ROWS_NUMBER = 4;
export const COLS_NUMBER = 4;

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
    default:
      return "#8b9ab3";
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
  const currentTilePosition = tile.position;
  let position = tile.position;
  const tileValue = tile.value;

  while (
    getRowFromPosition(position) > 1 &&
    !takenPositions.includes(position - ROWS_NUMBER)
  ) {
    position -= ROWS_NUMBER;
  }

  updatedTiles = updatedTiles.map(
    (tile: TileInfo): TileInfo =>
      tile.position === currentTilePosition ? { ...tile, position } : tile
  );

  if (takenPositions.includes(position - ROWS_NUMBER)) {
    if (
      updatedTiles.find(
        (tile: TileInfo): boolean => tile.position === position - ROWS_NUMBER
      )?.value === tileValue
    ) {
      updatedTiles.splice(
        updatedTiles.indexOf({ position, value: tileValue }),
        1
      );
      return updatedTiles.map(
        (tile: TileInfo): TileInfo =>
          tile.position === position - ROWS_NUMBER
            ? { ...tile, value: tile.value * 2 }
            : tile
      );
    }

    return updatedTiles;
  }
  return updatedTiles;
};

const moveOrMergeDown = ({
  updatedTiles,
  tile,
  direction
}: {
  updatedTiles: TileInfo[];
  direction: Direction;
  tile: TileInfo;
}): TileInfo[] => {
  let takenPositions = updatedTiles.map(tile => tile.position);
  const currentTilePosition = tile.position;
  let position = tile.position;
  const tileValue = tile.value;

  while (
    getRowFromPosition(position) < 4 &&
    !takenPositions.includes(position + ROWS_NUMBER)
  ) {
    position += ROWS_NUMBER;
  }

  updatedTiles = updatedTiles.map(
    (tile: TileInfo): TileInfo =>
      tile.position === currentTilePosition ? { ...tile, position } : tile
  );

  if (takenPositions.includes(position + ROWS_NUMBER)) {
    if (
      updatedTiles.find(
        (tile: TileInfo): boolean => tile.position === position + ROWS_NUMBER
      )?.value === tileValue
    ) {
      updatedTiles.splice(
        updatedTiles.indexOf({ position, value: tileValue }),
        1
      );
      return updatedTiles.map(
        (tile: TileInfo): TileInfo =>
          tile.position === position + ROWS_NUMBER
            ? { ...tile, value: tile.value * 2 }
            : tile
      );
    }

    return updatedTiles;
  }
  return updatedTiles;
};

const moveOrMergeRight = ({
  updatedTiles,
  tile,
  direction
}: {
  updatedTiles: TileInfo[];
  direction: Direction;
  tile: TileInfo;
}): TileInfo[] => {
  let takenPositions = updatedTiles.map(tile => tile.position);
  const currentTilePosition = tile.position;
  let position = tile.position;
  const tileValue = tile.value;
  const oneTileAside = 1;

  while (
    getColFromPosition(position) < 4 &&
    !takenPositions.includes(position + 1)
  ) {
    position += oneTileAside;
  }

  updatedTiles = updatedTiles.map(
    (tile: TileInfo): TileInfo =>
      tile.position === currentTilePosition ? { ...tile, position } : tile
  );

  if (takenPositions.includes(position + 1)) {
    if (
      updatedTiles.find(
        (tile: TileInfo): boolean => tile.position === position + 1
      )?.value === tileValue
    ) {
      updatedTiles.splice(
        updatedTiles.indexOf({ position, value: tileValue }),
        1
      );
      return updatedTiles.map(
        (tile: TileInfo): TileInfo =>
          tile.position === position + 1
            ? { ...tile, value: tile.value * 2 }
            : tile
      );
    }

    return updatedTiles;
  }
  return updatedTiles;
};

const moveOrMergeLeft = ({
  updatedTiles,
  tile,
  direction
}: {
  updatedTiles: TileInfo[];
  direction: Direction;
  tile: TileInfo;
}): TileInfo[] => {
  let takenPositions = updatedTiles.map(tile => tile.position);
  const currentTilePosition = tile.position;
  let position = tile.position;
  const tileValue = tile.value;

  while (
    getColFromPosition(position) > 1 &&
    !takenPositions.includes(position - 1)
  ) {
    position -= 1;
  }

  updatedTiles = updatedTiles.map(
    (tile: TileInfo): TileInfo =>
      tile.position === currentTilePosition ? { ...tile, position } : tile
  );

  if (takenPositions.includes(position - 1)) {
    if (
      updatedTiles.find(
        (tile: TileInfo): boolean => tile.position === position - 1
      )?.value === tileValue
    ) {
      updatedTiles.splice(
        updatedTiles.indexOf({ position, value: tileValue }),
        1
      );
      return updatedTiles.map(
        (tile: TileInfo): TileInfo =>
          tile.position === position - 1
            ? { ...tile, value: tile.value * 2 }
            : tile
      );
    }

    return updatedTiles;
  }
  return updatedTiles;
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
    if (getRowFromPosition(tile.position) !== 1) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "up"
      });
    }
  });

  return updatedTiles;
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
    if (getRowFromPosition(tile.position) !== ROWS_NUMBER) {
      updatedTiles = moveOrMergeDown({
        updatedTiles,
        tile,
        direction: "down"
      });
    }
  });

  return updatedTiles;
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
  console.log({ sortedTiles });
  updatedTiles.forEach((tile: TileInfo): void => {
    console.log(getColFromPosition(tile.position), "to jest col");

    if (getColFromPosition(tile.position) !== 1) {
      updatedTiles = moveOrMergeLeft({
        updatedTiles,
        tile,
        direction: "left"
      });
    }
  });

  return updatedTiles;
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
    console.log(getColFromPosition(tile.position), "to jest col");

    if (getColFromPosition(tile.position) !== 4) {
      updatedTiles = moveOrMergeRight({
        updatedTiles,
        tile,
        direction: "right"
      });
    }
  });

  return updatedTiles;
};
