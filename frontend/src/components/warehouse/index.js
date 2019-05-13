import React from "react";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Categories from "./categories";
import Products from "./products";

const WarehouseNav = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    li:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

export default ({ match }) => (
  <div>
    <h1>Warehouse management</h1>
    <WarehouseNav>
      <ul>
        <li>
          <Link to={`${match.url}/categories`}>
            <FormattedMessage
              id="warehouse.categories"
              defaultMessage="Categories"
            />
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/products`}>
            <FormattedMessage
              id="warehouse.products"
              defaultMessage="Products"
            />
          </Link>
        </li>
      </ul>
    </WarehouseNav>
    <Route exact path={`${match.path}/categories`} component={Categories} />
    <Route exact path={`${match.path}/products`} component={Products} />
  </div>
);
