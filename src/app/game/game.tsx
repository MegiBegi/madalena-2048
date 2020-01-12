import React, { FC, ReactElement, useEffect, useState } from "react"
import { connect } from "react-redux"
import { useSwipeable } from "react-swipeable"
import * as actions from "../../redux/actions"
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
  Cell,
  Zoom
} from "../styles"
import { updateGrid, getTileColor, getTileFontSize } from "../utils"

type Noop = () => void

interface GameStateProps {
  numbers: TileInfo[]
  undoCount: number
  lastAction: string
  bestScore: number
  gameIsOver: boolean
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
  const [zoom, setZoom] = useState<boolean>(false)
  console.log(zoom)
  const updatedGrid: TileInfo[] = updateGrid(numbers)
  const gridItems: ReactElement[] = updatedGrid.map(
    (tile: TileInfo): ReactElement => (
      <Cell
        key={tile.position}
        tileColor={getTileColor(tile)}
        fontSize={getTileFontSize(tile)}
        gameOver={gameIsOver ? "50%" : "100%"}
        newTile={tile.newNum ? true : false}
        mergedTile={tile.merged ? true : false}
        zoomIn={zoom}
      >
        {tile.value !== 0 && tile.value}
      </Cell>
    )
  )

  useEffect((): Noop => {
    getScore()
    const handleKeyPress = (e: KeyboardEvent): void => {
      const LEFT = 37
      const UP = 38
      const RIGHT = 39
      const DOWN = 40
      const moves = [LEFT, UP, RIGHT, DOWN]
      if (!moves.includes(e.keyCode)) return
      e.preventDefault()

      if (e.repeat) return
      if (gameIsOver) return

      switch (e.keyCode) {
        case LEFT:
          moveLeft()
          break

        case UP:
          moveUp()
          break

        case RIGHT:
          moveRight()
          break

        case DOWN:
          moveDown()
          break
      }
      gameOver()
      newRound()
      getScore()
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
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
  ])

  const slide = (move: Noop) => {
    move()
    gameOver()
    newRound()
    getScore()
  }

  const handlers = useSwipeable({
    onSwipedUp: () => slide(moveUp),
    onSwipedDown: () => slide(moveDown),
    onSwipedLeft: () => slide(moveLeft),
    onSwipedRight: () => slide(moveRight),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  const zooming = (): void => {
    if (zoom) setZoom(false)
    if (!zoom) setZoom(true)
  }

  return (
    <div {...handlers}>
      <MainContainer>
        <GameWrapper>
          <Header>
            <GameName>2048</GameName>
            <Score>Best score: {bestScore}</Score>
          </Header>
          <Main>
            <Grid zoomIn={zoom}>
              {gridItems}
              <Zoom viewBox="0 0 20 20" onClick={(): void => zooming()}>
                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z" />
                //downloaded from http://svgicons.sparkk.fr/
              </Zoom>
            </Grid>
            <Buttons>
              <Button
                active={
                  undoCount > 0 &&
                  lastAction !== "UNDO" &&
                  lastAction !== "NEW GAME" &&
                  !gameIsOver
                }
                onClick={(): void => {
                  undoCount > 0 &&
                    lastAction !== "UNDO" &&
                    lastAction !== "NEW GAME" &&
                    !gameIsOver &&
                    undo()
                }}
              >
                UNDO: {undoCount}
              </Button>
              <Button
                active={true}
                onClick={(): void => {
                  newGame()
                  getScore()
                }}
              >
                NEW GAME
              </Button>
            </Buttons>
            <Description>
              <Paragraph>
                INSTRUCTIONS: Use the arrow keys on your keyboard to move the
                tiles. Swipe on mobile! Two equal tiles merge into their sum!
                You can use up to 3 UNDOs but no more then one in a row! Click
                on NEW GAME to start again! Good luck!
              </Paragraph>
              <Paragraph>
                NOTE: The game on play2048.co is the original version of 2048.
              </Paragraph>
              <Paragraph>
                GOAL: To get the 2048 tile. Then you can continue on merging
                tiles into even bigger numbers!
              </Paragraph>
            </Description>
          </Main>
          <Footer>Visit my website</Footer>
        </GameWrapper>
      </MainContainer>
    </div>
  )
}

const mapStateToProps = (state: RootState): GameStateProps => ({
  numbers: state.numbers,
  undoCount: state.undoCount,
  lastAction: state.lastAction,
  bestScore: state.bestScore,
  gameIsOver: state.gameIsOver
})

interface DispatchProps {
  newGame: Noop
  moveUp: Noop
  moveDown: Noop
  moveLeft: Noop
  moveRight: Noop
  newRound: Noop
  undo: Noop
  getScore: Noop
  gameOver: Noop
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
}

export default connect<GameStateProps, any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(Game)
