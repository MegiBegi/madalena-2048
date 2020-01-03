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
}

interface GameProps extends GameStateProps {}
interface GameProps extends DispatchProps {}

const Game: FC<GameProps> = ({
  numbers,
  newGame,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  newRound,
  undo,
  undoCount,
  lastAction
}): ReactElement => {
  const updatedGrid: TileInfo[] = updateGrid(numbers);
  const gridItems: ReactElement[] = updatedGrid.map(
    (tile: TileInfo): ReactElement => (
      <Cell
        key={tile.position}
        tileColor={getTileColor(tile)}
        fontSize={getTileFontSize(tile)}
      >
        {tile.value !== 0 && tile.value}
      </Cell>
    )
  );

  const handleKeyPress = (e: KeyboardEvent): void => {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        moveLeft();
        newRound();
        break;

      case 38:
        moveUp();
        newRound();
        break;

      case 39:
        moveRight();
        newRound();
        break;

      case 40:
        moveDown();
        newRound();
        break;
    }
  };

  const componentDidMount = (): void => {
    document.addEventListener("keydown", handleKeyPress);
    newGame();
  };

  const componentWillUnmount = (): void => {
    document.removeEventListener("keydown", handleKeyPress);
  };

  useEffect(() => {
    componentDidMount();
    return componentWillUnmount;
  }, []);
  return (
    <MainContainer>
      <GameWrapper>
        <Header>
          <GameName>2048</GameName>
          <Score>Best merge:</Score>
        </Header>
        <Main>
          <Grid>{gridItems}</Grid>
          <Buttons>
            <Button
              onClick={() =>
                undoCount < 3 &&
                lastAction !== "UNDO" &&
                lastAction !== "NEW GAME" &&
                undo()
              }
            >
              UNDO
            </Button>
            <Button onClick={() => newGame()}>NEW GAME</Button>
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
  lastAction: state.lastAction
});

interface DispatchProps {
  newGame: Noop;
  moveUp: Noop;
  moveDown: Noop;
  moveLeft: Noop;
  moveRight: Noop;
  newRound: Noop;
  undo: Noop;
}

const mapDispatchToProps: DispatchProps = {
  moveUp: actions.moveUp,
  newGame: actions.newGame,
  moveDown: actions.moveDown,
  moveLeft: actions.moveLeft,
  moveRight: actions.moveRight,
  newRound: actions.newRound,
  undo: actions.undo
};

export default connect<GameStateProps, any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(Game);
