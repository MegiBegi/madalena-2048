import React, { FC, ReactElement } from "react"
import Game from "./game/game"
import { GlobalStyle } from "./styles"

const App: FC = (): ReactElement => {
  return (
    <>
      <GlobalStyle />
      <Game />
    </>
  )
}

export default App
