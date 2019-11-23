import React, { FC, ReactElement } from "react"
import Game from "./game/game"
import { GlobalStyle } from "./styles/styled"

const App: FC = (): ReactElement => {
  return (
    <div>
      <GlobalStyle />
      <Game />
    </div>
  )
}

export default App
