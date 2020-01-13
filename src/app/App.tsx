import React, { FC, ReactElement } from "react"
import Game from "app/game/game"
import { GlobalStyle } from "app/styles"

const App: FC = (): ReactElement => (
  <>
    <GlobalStyle />
    <Game />
  </>
)

export default App
