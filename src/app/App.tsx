import React, { FC, ReactElement } from "react"
import Game from "../game"
import { GlobalStyle } from "../styled"

const App: FC = (): ReactElement => {
  return (
    <div>
      <GlobalStyle />
      <Game />
    </div>
  )
}

export default App
