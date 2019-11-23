import React, { FC, ReactElement, useEffect } from "react"
import { connect } from "react-redux"
import { updateScore } from "../../redux/actions"
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
import { getRandomGridPosition } from "../utils/utils"

interface GameStateProps {
  currentScore: number
}

interface GameProps extends GameStateProps {}

const Game: FC<GameProps> = ({ currentScore }): ReactElement => {
  const CELLS_NUMBER = 16
  const ROWS_NUM = 4

  interface Grid {
    row: number
    col: number
    isTwo?: boolean
  }
  const randomNumber: Grid = getRandomGridPosition(16)
  const grid = []
  for (let row = 0; row < ROWS_NUM; row++) {
    for (let col = 0; col < CELLS_NUMBER / ROWS_NUM; col++) {
      const isTwo = randomNumber.row === row && randomNumber.col === col
      grid.push({
        row,
        col
      })
    }
  }

  const gridItems = grid.map(grid => {
    return <Cell key={`${grid.row} + ${grid.col}`} color="#8b9ab3" />
  })

  const handleKeyPress = (): void => {}
  const componentDidMount = (): void => {
    document.addEventListener("keydown", handleKeyPress)
  }

  const componentWillUnmount = (): void => {
    document.removeEventListener("keydown", handleKeyPress)
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
            <Button>NEW GAME</Button>
          </Buttons>
          <Description>
            <Paragraph>
              INSTRUCTIONS: Use the arrow keys on your keyboard to move the
              tiles. Swipe on mobile! Two equal tiles merge into their sum! You
              can use up to 3 UNDOs but no more then one in a row! Click on NEW
              GAME to start again!Good luck!
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
  currentScore: 2
})

export default connect<any, any, any, any>(mapStateToProps, null)(Game)
