import styled, {
  keyframes,
  Keyframes,
  createGlobalStyle,
  css
} from "styled-components"
import { generateMedia } from "styled-media-query"
import { ZOOMED_GRID, ZOOMED_CELL, ANIMATION_TIME } from "app/utils"

const media = generateMedia({
  small: "555px",
  xSmall: "370px"
})

interface CellProps {
  tileColor: string
  fontSize: string
  gameOver: string
  newTile: string
  mergedTile: string
  zoomIn: boolean
  value: number
}

interface ZoomedIn {
  zoomIn: boolean
}

interface ButtonProps {
  active?: boolean
}

export const GlobalStyle = createGlobalStyle`
html {
  padding: 0;
  margin: 0;
  background-color: #181a1b;
  color: #e8e6e3;
  }
body {
  padding: 0;
  margin: 0;
}
`

export const create = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.7); 
  }
  100% {
    transform: scale(1);
  }
`

export const merge = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2); 
  }
  100% {
    transform: scale(1);
  }
`

const rainbow = keyframes`
  0% {
    background-position:0% 82%
  }
  50% {
    background-position:100% 19%
  }
  100% {
    background-position:0% 82%
  }
`

const animationColors =
  "linear-gradient(124deg,#cc1d00,#a91111,#a98511,#a6a911,#11a92b,#11a1a9,#1c11a9,#ba00cc,#ba00cc)"

export const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-size: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`

export const GameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  ${media.lessThan("xSmall")`
    margin-top: 15px;
  `}

  ${media.between("xSmall", "small")`
    margin-top: 20px;
    width: 375px;
  `}

  ${media.greaterThan("small")`
    margin-top: 50px;
    width: 500px;
  `}
`

export const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${media.lessThan("xSmall")`
    width: 75%;
    flex-direction: column;
    margin-bottom: 15px;
  `}

  ${media.between("xSmall", "small")`
    width: 90%;
    flex-direction: column;
    flex-direction: column;
    margin-bottom: 40px;
  `}

  ${media.greaterThan("small")`
    width: 100%;
  `}
`

export const GameName = styled.h1`
  font-weight: bold;
  background: ${animationColors};
  background-size: 1600% 1600%;
  animation: ${rainbow} 18s ease infinite;
  border-radius: 5%;

  ${media.lessThan("xSmall")`
    font-size: 2rem;
    padding: 1px 10px;
  `}

  ${media.between("xSmall", "small")`
    font-size: 3rem;
    padding: 2px 20px;
  `}

  ${media.greaterThan("small")`
    font-size: 5rem;
    padding: 7px;
  `}
`

export const Score = styled.button`
  background-color: #181a1b;
  color: #b5b0a5;
  border-radius: 5%;
  border-color: #404447;

  ${media.lessThan("xSmall")`
    font-size: 1.3rem;
  `}

  ${media.between("xSmall", "small")`
    font-size: 1.7rem;
  `}

  ${media.greaterThan("small")`
    font-size: 2.1rem;
  `}
`

export const Main = styled.main`
  font-size: 1rem;

  ${media.lessThan("xSmall")`
    width: 320px;
  `}

  ${media.between("xSmall", "small")`
    width: 400px;
  `}

  ${media.greaterThan("small")`
    width: 100%;
  `}
`

export const Grid = styled.div<ZoomedIn>`
  background-color: #181a1b;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border-radius: 2%;
  padding: 5px;
  position: relative;

  ${media.lessThan("xSmall")`
    font-size: 50%;
    width: 280px;
    height: 280px;
    margin: auto;
  `}

  ${({ zoomIn }) =>
    media.between("xSmall", "small")`
    font-size: 50%
    width: 280px;
    height: 280px;
    margin: auto;
    ${zoomIn && ZOOMED_GRID};
  `}

  ${media.greaterThan("small")`
    font-size: 5rem;
    width: 500px;
    height: 500px;
  `}
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;

  ${media.lessThan("xSmall")`
    justify-content: center;
  `}

  ${media.between("xSmall", "small")`
    justify-content: center;
  `}

  ${media.greaterThan("small")`
    justify-content: space-around;
    width: 100%;
  `}
`

export const Button = styled.button<ButtonProps>`
  background-color: #181a1b;
  color: #b5b0a5;
  border-radius: 5%;
  border-color: #404447;
  ${({ disabled }) => (disabled ? "opacity: 0.5;" : "")}
  outline: none;

  ${media.lessThan("xSmall")`
    font-size: 1.7rem;
    margin-left: 2px;
  `};

  ${media.between("xSmall", "small")`
    font-size: 1.7rem;
    margin-right: 10px;
  `};

  ${media.greaterThan("small")`
    font-size: 2.1rem;
  `}
`

export const Description = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: justify;

  ${media.lessThan("xSmall")`
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
  `}

  ${media.between("xSmall", "small")`
    width: 75% 
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
  `}

  ${media.greaterThan("small")`
    width: 100%;
  `}
`

export const Paragraph = styled.p`
  margin-top: 15px;
  padding-bottom: 20px;
  border-bottom: 2px solid #404447;
`

export const Footer = styled.footer`
  font-size: 1rem;
  padding-bottom: 30px;
  text-align: center;

  ${media.lessThan("xSmall")`
    width: 75%;
  `}

  ${media.between("xSmall", "small")`
    width: 90%; 
  `}

  ${media.greaterThan("small")`
    width: 100%;
  `}
`

export const Visit = styled.a`
  text-decoration: underline;
  color: #e8e6e3;
  cursor: pointer;
`

export const Cell = styled.div<CellProps>`
  border-radius: 5%;
  text-align: center;

  ${({
    tileColor,
    fontSize,
    gameOver,
    newTile,
    mergedTile,
    zoomIn,
    value
  }) => css`
    background-color: ${tileColor};
    opacity: ${gameOver};
    animation: ${(): Keyframes | string => {
      if (newTile === "create") return create
      if (mergedTile === "merge") return merge
      return "none"
    }} ${ANIMATION_TIME}ms;
      
    ${mergedTile === "merge" && `transition: all ${ANIMATION_TIME}ms ease-in;`};
   
    ${value === 2048 &&
      css`
        background: ${animationColors};
        background-size: 1600% 1600%;
        animation: ${rainbow} 4s ease infinite;
      `}}

    ${media.lessThan("xSmall")`
      font-size: ${Number(fontSize) * 5}%;
      width: 60px;
      height: 60px;
      line-height: 60px;
  `}

    ${media.between("xSmall", "small")`
      font-size: ${Number(fontSize) * 5}%;
      width: 60px;
      height: 60px;  
      line-height: 60px;
      ${zoomIn && ZOOMED_CELL && `font-size: ${Number(fontSize) * 5}%;`}
  `}

    ${media.greaterThan("small")`
      width: 110px;
      height: 110px;
      font-size: ${fontSize}%;
      line-height: 110px;
    `}

  `}
`

export const Zoom = styled.svg`
  fill: none;
  stroke: #e8e6e3;
  position: absolute;
  bottom: -40px;
  right: 14px;
  width: 25px;
  height: 55px;
  fill: none;
  cursor: pointer;

  ${media.lessThan("xSmall")`
    display: none;
  `};

  ${media.between("xSmall", "small")`
    display: block;
  `};

  ${media.greaterThan("small")`
    display: none;
  `}
`
