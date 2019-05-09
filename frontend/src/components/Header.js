import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";

const Logo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 6rem;
  pointer-events: none;
`;
const Header = styled.header`
  background-color: ${props => props.theme.black};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  color: ${props => props.theme.offWhite};
  box-shadow: 0px 0px 3px ${props => props.theme.darkBlack};
`;

export default props => (
  <Header>
    <Logo src={logo} className="App-logo" alt="logo" />
    <h1>TeePeeDeeVee</h1>
  </Header>
);
