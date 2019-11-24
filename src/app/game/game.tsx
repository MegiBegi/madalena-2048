import React, { FC, ReactElement, useEffect } from "react"
import { connect } from "react-redux"
import { newGame } from "../../redux/actions"
import { RootState } from "../../redux/reducers"
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
} from "../styles"
import { dispatch } from "../../redux/store"
import { updateGrid, getTileColor } from "../utils"
interface GameStateProps {
  numbers: TileInfo[]
}

interface GameProps extends GameStateProps {}

const Game: FC<GameProps> = ({ numbers }): ReactElement => {
  const updatedGrid = updateGrid(numbers)
  const gridItems: ReactElement[] = updatedGrid.map(
    (tile: TileInfo): ReactElement => (
      <Cell key={`${tile.row} + ${tile.col}`} tileColor={getTileColor(tile)}>
        {tile.value !== 0 && tile.value}
      </Cell>
    )
  )

  const handleKeyPress = (): void => {}
  const componentDidMount = (): void => {
    document.addEventListener("keydown", handleKeyPress)
    dispatch(newGame())
  }

  const componentWillUnmount = (): void => {
    document.removeEventListener("keydown", handleKeyPress)
  }

  const handleOnClick = (): void => {
    dispatch(newGame())
  }

  useEffect(() => {
    componentDidMount()
    return componentWillUnmount
  }, [])
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
            <Button>UNDO </Button>
            <Button onClick={handleOnClick}>NEW GAME</Button>
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
  )
}

const mapStateToProps = (state: RootState): GameStateProps => ({
  numbers: state.numbers
})

export default connect<any, any, any, any>(mapStateToProps, null)(Game)
