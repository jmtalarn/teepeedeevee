import React from "react";
import logo from "./logo.svg";
import { FormattedMessage } from "react-intl";
import styled, { keyframes } from "styled-components";
import LanguageSelector from "./LanguageSwitch";

const animationLogo = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Logo = styled.img`
  animation: ${animationLogo} infinite 20s linear;
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
    <h1>
      <FormattedMessage id="app.title" defaultMessage="TeePeeDeeVee" />
    </h1>

    <LanguageSelector />
  </Header>
);
