export const CELLS_NUMBER = 16;

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

export const sortList = (list: TileInfo[]): TileInfo[] => {
  const sortedList: TileInfo[] = list.sort((a, b) =>
    a.position > b.position ? 1 : -1
  );
  return sortedList;
};

export const handleMoveUp = (takenTiles: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(takenTiles);
  return updatedGrid;
};
export const handleMoveDown = (takenTiles: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(takenTiles);
  return updatedGrid;
};
export const handleMoveLeft = (takenTiles: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(takenTiles);
  return updatedGrid;
};
export const handleMoveRight = (takenTiles: TileInfo[]): TileInfo[] => {
  const updatedGrid = updateGrid(takenTiles);
  return updatedGrid;
};
