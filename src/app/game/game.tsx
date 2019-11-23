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
} from "../styles/styled"
import { getRandomGridPosition, firstInitial } from "../utils/utils"
import { dispatch } from "../../redux/store"

interface Grid {
  row: number
  col: number
  isTwo?: boolean
  isFour?: boolean
}
interface GameStateProps {
  firstInitial: Grid
  secondInitial: Grid
}

interface GameProps extends GameStateProps {}

const Game: FC<GameProps> = ({ firstInitial, secondInitial }): ReactElement => {
  const CELLS_NUMBER = 16
  const ROWS_NUM = 4

  const grid = []
  for (let row = 0; row < ROWS_NUM; row++) {
    for (let col = 0; col < CELLS_NUMBER / ROWS_NUM; col++) {
      const isTwo =
        (firstInitial.row === row &&
          firstInitial.col === col &&
          firstInitial.isTwo) ||
        (secondInitial.row === row &&
          secondInitial.col === col &&
          secondInitial.isTwo)
      const isFour =
        (firstInitial.row === row &&
          firstInitial.col === col &&
          firstInitial.isFour) ||
        (secondInitial.row === row &&
          secondInitial.col === col &&
          secondInitial.isFour)
      grid.push({
        row,
        col,
        isTwo,
        isFour
      })
    }
  }

  console.log(grid)
  const gridItems = grid.map(grid => {
    if (grid.isTwo) {
      return (
        <Cell key={`${grid.row} + ${grid.col}`} color="#8b9ab3">
          2
        </Cell>
      )
    } else if (grid.isFour) {
      return (
        <Cell key={`${grid.row} + ${grid.col}`} color="#8b9ab3">
          4
        </Cell>
      )
    } else {
      return <Cell key={`${grid.row} + ${grid.col}`} color="#8b9ab3" />
    }
  })

  const handleKeyPress = (): void => {}
  const componentDidMount = (): void => {
    document.addEventListener("keydown", handleKeyPress)
  }

  const componentWillUnmount = (): void => {
    document.removeEventListener("keydown", handleKeyPress)
  }

  const handleOnClick = (): void => {
    dispatch(newGame())
  }

  useEffect(() => {
    componentDidMount()
    return () => {
      componentWillUnmount()
    }
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
  firstInitial: state.firstInitialTile,
  secondInitial: state.secondInitialTile
})

export default connect<any, any, any, any>(mapStateToProps, null)(Game)
