import React, { FC, ReactElement } from "react"
import { connect } from "react-redux"
import { updateScore } from "./redux/actions"
import { RootState } from "./redux/reducers"
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
  Grid
} from "./styled"
import { CELLS_NUMBER, createGrid, getRandomCellId } from "./utils"

interface GameStateProps {
  currentScore: number
}

interface GameProps extends GameStateProps {}

const Game: FC<GameProps> = ({ currentScore }): ReactElement => {
  const currentGrid: ReactElement[] = createGrid(CELLS_NUMBER)
  const firstRandomId = getRandomCellId()
  let secondRandomId = getRandomCellId()
  if (secondRandomId === firstRandomId) {
    secondRandomId = getRandomCellId()
  }
  console.log(firstRandomId)
  console.log(secondRandomId)

  return (
    <MainContainer>
      <GameWrapper>
        <Header>
          <GameName>2048</GameName>
          <Score>Best merge:</Score>
        </Header>
        <Main>
          <Grid>{createGrid(CELLS_NUMBER)}</Grid>
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
