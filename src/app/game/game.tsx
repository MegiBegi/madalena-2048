import React, { FC, ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  MainContainer,
  GameWrapper,
  Header,
  GameName,
  Score,
  Main,
  Footer,
  Description,
  Buttons,
  Button,
  Paragraph,
  Grid,
  Cell
} from "../styles";
import { updateGrid, getTileColor, getTileFontSize } from "../utils";

type Noop = () => void;

interface GameStateProps {
  numbers: TileInfo[];
  undoCount: number;
  lastAction: string;
  bestScore: number;
  gameIsOver: boolean;
}

interface GameProps extends GameStateProps {}
interface GameProps extends DispatchProps {}

const Game: FC<GameProps> = ({
  newGame,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  newRound,
  undo,
  gameOver,
  getScore,
  numbers,
  undoCount,
  lastAction,
  bestScore,
  gameIsOver
}) => {
  const updatedGrid: TileInfo[] = updateGrid(numbers);
  const gridItems: ReactElement[] = updatedGrid.map(
    (tile: TileInfo): ReactElement => (
      <Cell
        key={tile.position}
        tileColor={getTileColor(tile)}
        fontSize={getTileFontSize(tile)}
        gameOver={gameIsOver ? "50%" : "100%"}
      >
        {tile.value !== 0 && tile.value}
      </Cell>
    )
  );

  useEffect((): Noop => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      const LEFT = 37;
      const UP = 38;
      const RIGHT = 39;
      const DOWN = 40;
      const moves = [LEFT, UP, RIGHT, DOWN];
      if (!moves.includes(e.keyCode)) return;
      e.preventDefault();

      if (e.repeat) return;
      if (gameIsOver) return;

      switch (e.keyCode) {
        case LEFT:
          moveLeft();
          break;

        case UP:
          moveUp();
          break;

        case RIGHT:
          moveRight();
          break;

        case DOWN:
          moveDown();
          break;
      }
      gameOver();
      newRound();
      getScore();
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    gameIsOver,
    gameOver,
    getScore,
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    newRound,
    numbers
  ]);

  return (
    <MainContainer>
      <GameWrapper>
        <Header>
          <GameName>2048</GameName>
          <Score>Best score: {bestScore}</Score>
        </Header>
        <Main>
          <Grid>{gridItems}</Grid>
          <Buttons>
            <Button
              onClick={(): void => {
                undoCount > 0 &&
                  lastAction !== "UNDO" &&
                  lastAction !== "NEW GAME" &&
                  !gameIsOver &&
                  undo();
              }}
            >
              UNDO: {undoCount}
            </Button>
            <Button
              onClick={(): void => {
                newGame();
                getScore();
              }}
            >
              NEW GAME
            </Button>
          </Buttons>
          <Description>
            <Paragraph>
              INSTRUCTIONS: Use the arrow keys on your keyboard to move the
              tiles. Swipe on mobile! Two equal tiles merge into their sum! You
              can use up to 3 UNDOs but no more then one in a row! Click on NEW
              GAME to start again! Good luck!
            </Paragraph>
            <Paragraph>
              NOTE: The game on play2048.co is the original version of 2048.
            </Paragraph>
            <Paragraph>
              GOAL: To get the 2048 tile. Then you can continue on merging tiles
              into even bigger numbers!
            </Paragraph>
          </Description>
        </Main>
        <Footer>Visit my website</Footer>
      </GameWrapper>
    </MainContainer>
  );
};

const mapStateToProps = (state: RootState): GameStateProps => ({
  numbers: state.numbers,
  undoCount: state.undoCount,
  lastAction: state.lastAction,
  bestScore: state.bestScore,
  gameIsOver: state.gameIsOver
});

interface DispatchProps {
  newGame: Noop;
  moveUp: Noop;
  moveDown: Noop;
  moveLeft: Noop;
  moveRight: Noop;
  newRound: Noop;
  undo: Noop;
  getScore: Noop;
  gameOver: Noop;
}

const mapDispatchToProps: DispatchProps = {
  moveUp: actions.moveUp,
  newGame: actions.newGame,
  moveDown: actions.moveDown,
  moveLeft: actions.moveLeft,
  moveRight: actions.moveRight,
  newRound: actions.newRound,
  undo: actions.undo,
  getScore: actions.getScore,
  gameOver: actions.gameOver
};

export default connect<GameStateProps, any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(Game);
