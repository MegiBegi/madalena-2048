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

export const getRandomNumber = (takenTiles: TileInfo[]): TileInfo[] | [] => {
  let places: number[] = getAllPositions();

  let takenPlaces: number[];
  takenPlaces = takenTiles.length === 0 ? [] : places;
  let emptyPlaces = [];

  for (let place of places) {
    if (!takenPlaces.includes(place)) {
      emptyPlaces.push(place);
    }
  }

  const newPosition =
    emptyPlaces[Math.floor(Math.random() * emptyPlaces.length)];

  const value = getRandomValue();
  const newRandomNumber: TileInfo = {
    position: newPosition,
    value
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
  console.log({ updatedGrid });

  return updatedGrid;
};

export const exemplaryGrid: TileInfo[] = [
  { position: 5, value: 2 },
  { position: 9, value: 4 }
];

const localExample: TileInfo[] = [
  { position: 5, value: 2 },
  { position: 9, value: 4 }
];

const getRowFromPosition = (newPosition: number): number =>
  newPosition <= 4 ? 1 : Math.ceil(newPosition / ROWS_NUMBER);

const getColFromPosition = (newPosition: number): number => {
  if (newPosition < COLS_NUMBER || newPosition % newPosition === 0)
    return newPosition;
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
  const takenPositions = updatedTiles.map(tile => tile.position);
  let tilePosition = tile.position;
  const tileValue = tile.value;

  if (takenPositions.includes(tilePosition - ROWS_NUMBER)) {
    if (
      updatedTiles.find(tile => tile.position === tilePosition - ROWS_NUMBER)
        ?.value === tileValue
    ) {
      return updatedTiles.map(tile =>
        tile.position === tilePosition - ROWS_NUMBER
          ? { ...tile, value: tile.value * 2 }
          : tile
      );
    }
    return updatedTiles;
  }

  while (
    getRowFromPosition(tilePosition) > 1 &&
    !takenPositions.includes(tilePosition)
  ) {
    tilePosition -= ROWS_NUMBER;
  }

  return updatedTiles;
};

export const handleMoveUp = (takenTiles: TileInfo[]): TileInfo[] => {
  let updatedTiles: TileInfo[] = [];
  const sortedTiles: TileInfo[] = localExample.sort();

  sortedTiles.forEach((tile: TileInfo): void => {
    if (getRowFromPosition(tile.position) === 1) {
      updatedTiles.push(tile);
    } else {
      updatedTiles = moveOrMerge({ updatedTiles, tile, direction: "up" });
    }
  });

  return updatedTiles;
};

export const handleMoveDown = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = localExample.sort();

  return sortedTiles;
};
export const handleMoveLeft = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = localExample.sort();

  return sortedTiles;
};
export const handleMoveRight = (takenTiles: TileInfo[]): TileInfo[] => {
  const sortedTiles: TileInfo[] = localExample.sort();

  return sortedTiles;
};
