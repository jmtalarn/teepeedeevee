import React from "react";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default ({ match }) => (
  <div>
    <h1>Warehouse management</h1>
    <nav>
      <ul>
        <li>
          <Link to={`${match.url}/categories`}>
            <FormattedMessage
              id="warehouse.categories"
              defaultMessage="Categories"
            />
          </Link>
        </li>
      </ul>
    </nav>
    <Route
      exact
      path={`${match.path}/categories`}
      render={() => <h3>Categories management</h3>}
    />
  </div>
);
