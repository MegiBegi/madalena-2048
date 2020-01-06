import styled, { keyframes, createGlobalStyle } from "styled-components";

interface CellProps {
  tileColor: string;
  fontSize: string;
  gameOver: string;
  newTile: string;
}

export const create = keyframes`
  0% {
    width: 0px;
    height: 0px;
    opacity: 0;
  }

  100% {
    width: 110px;
    height: 110px;
    opacity: 1;
  }
`;

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
`;
const rainbow = keyframes`
  0%{background-position:0% 82%}
  50%{background-position:100% 19%}
  100%{background-position:0% 82%}
`;

export const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-size: 10rem;
  background-color: 6d7d99;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const GameWrapper = styled.div`
  width: 500px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const GameName = styled.h1`
  font-weight: bold;
  font-size: 5rem;
  background: linear-gradient(
    124deg,
    #cc1d00,
    #a91111,
    #a98511,
    #a6a911,
    #11a92b,
    #11a1a9,
    #1c11a9,
    #ba00cc,
    #ba00cc
  );
  background-size: 1600% 1600%;
  animation: ${rainbow} 18s ease infinite;
  border-radius: 5%;
  padding: 7px;
`;
export const Score = styled.button`
  background-color: #181a1b;
  color: #b5b0a5;
  font-size: 2.1rem;
  border-radius: 5%;
  border-color: #404447;
`;
export const Main = styled.main`
  font-size: 1rem;
  width: 100%;
`;
export const Grid = styled.div`
  background-color: #181a1b;
  font-size: 5rem;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border-radius: 2%;
  padding: 5px;
`;
export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
`;
export const Button = styled.button`
  background-color: #181a1b;
  color: #b5b0a5;
  font-size: 2.1rem;
  border-radius: 5%;
  border-color: #404447;
`;
export const Description = styled.div`
  font-size: 1rem;
  width: 100%;
  font-weight: bold;
  text-align: justify;
`;
export const Paragraph = styled.p`
  margin-top: 15px;
  padding-bottom: 20px;
  border-bottom: 2px solid #404447;
`;
export const Footer = styled.footer`
  font-size: 1rem;
  width: 100%;
  padding-bottom: 30px;
`;
export const Cell = styled.div<CellProps>`
  width: 110px;
  height: 110px;
  border-radius: 5%;
  background-color: ${({ tileColor }) => tileColor};
  font-size: ${({ fontSize }) => fontSize};
  text-align: center;
  line-height: 110px;
  opacity: ${({ gameOver }) => gameOver};
  animation-delay: 2s;
  color: ${({ newTile }) => newTile};
  transition: width 10ms ease-in, height 10ms ease-in;
  animation-duration: 2s;
  animation-timing-function: ease;
`;
