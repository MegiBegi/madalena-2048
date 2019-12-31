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
  if (newPosition < COLS_NUMBER || newPosition % newPosition === 0)
    return newPosition;
  return newPosition % COLS_NUMBER;
};

const sortList = (list: TileInfo[]): TileInfo[] => {
  const sortedList: TileInfo[] = list.sort((a, b) =>
    a.position > b.position ? 1 : -1
  );
  return sortedList;
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
  console.log("move or merge");
  let takenPositions = updatedTiles.map(tile => tile.position);
  const currentTilePosition = tile.position;
  let position = tile.position;
  const tileValue = tile.value;

  if (getRowFromPosition(position) === 1) {
    updatedTiles.push(tile);
  }

  if (takenPositions.includes(position - ROWS_NUMBER)) {
    if (
      updatedTiles.find(
        (tile: TileInfo): boolean => tile.position === position - ROWS_NUMBER
      )?.value === tileValue
    ) {
      console.log("value takie samo");
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

    console.log("pierwszy warunek");
    return updatedTiles;
  }

  while (
    getRowFromPosition(position) > 1 &&
    !takenPositions.includes(position - ROWS_NUMBER)
  ) {
    position -= ROWS_NUMBER;
  }

  if (takenPositions.includes(position)) {
    const targetedTile = updatedTiles.find(
      (tile: TileInfo): boolean => tile.position === position
    );
    console.log({ targetedTile });

    if (targetedTile?.value === tileValue) {
      console.log("drugi warunek");

      return updatedTiles.map(
        (tile: TileInfo): TileInfo =>
          tile.position === position ? { ...tile, value: tile.value * 2 } : tile
      );
    }
    console.log("trzeci warunek");

    return updatedTiles.map(
      (tile: TileInfo): TileInfo =>
        tile.position === currentTilePosition
          ? { ...tile, position: position - ROWS_NUMBER }
          : tile
    );
  }
  console.log("ostatni warunek", position);
  console.log({ updatedTiles });

  return updatedTiles.map(
    (tile: TileInfo): TileInfo =>
      tile.position === currentTilePosition ? { ...tile, position } : tile
  );
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
  console.log({ sortedTiles });

  updatedTiles.forEach((tile: TileInfo): void => {
    console.log(updatedTiles, "before");
    if (getRowFromPosition(tile.position) !== 1) {
      updatedTiles = moveOrMerge({
        updatedTiles,
        tile,
        direction: "up"
      });
      console.log(updatedTiles, "after");
    }
  });

  return updatedTiles;
};

export const handleMoveDown = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = takenTiles.sort();

  return sortedTiles;
};
export const handleMoveLeft = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = takenTiles.sort();

  return sortedTiles;
};
export const handleMoveRight = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = takenTiles.sort();

  return sortedTiles;
};
