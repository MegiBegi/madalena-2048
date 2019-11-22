import React, { FC, ReactElement } from "react"
import { connect } from "react-redux"
import { updateScore } from "./redux/actions"
import { RootState } from "./redux/reducers"

interface GameStateProps {
  currentScore: number
}

interface GameProps extends GameStateProps {}

const Game: FC<GameProps> = ({ currentScore }): ReactElement => {
  return <div></div>
}

const mapStateToProps = (state: RootState): GameStateProps => ({
  currentScore: state.score
})

export default connect<any, any, any, any>(mapStateToProps, null)(Game)
