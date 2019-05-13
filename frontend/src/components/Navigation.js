import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0 0 0 auto;

    li a {
      color: ${props => props.theme.offWhite};
      text-decoration: none;
      margin: 0 1rem;
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
export default () => (
  <Nav>
    <ul>
      <li>
        <Link to="/">
          <FormattedMessage id="menu.pos" defaultMessage="POS" />
        </Link>
      </li>
      <li>
        <Link to="/warehouse">
          <FormattedMessage id="menu.warehouse" defaultMessage="Warehouse" />
        </Link>
      </li>
    </ul>
  </Nav>
);
