import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import TextField from "../TextField";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { conditionalExpression } from "@babel/types";

const Layout = styled.div`
  font-weight: 100;
  padding: 1rem;
`;
const Nav = styled.nav`
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
class Vat extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Layout>
        <h2>
          <FormattedMessage
            id="vat.management"
            defaultMessage="Vat management"
          />
        </h2>
        <Nav>
          <ul>
            <li>
              <Link to={`${match.url}/types`}>
                <FormattedMessage id="vat.types" defaultMessage="VAT types" />
              </Link>
            </li>
            <li>
              <Link to={`${match.url}/category`}>
                <FormattedMessage
                  id="vat.category"
                  defaultMessage="Category VAT"
                />
              </Link>
            </li>
            <li>
              <Link to={`${match.url}/product`}>
                <FormattedMessage
                  id="vat.product"
                  defaultMessage="Product VAT"
                />
              </Link>
            </li>
          </ul>
        </Nav>
        <Route
          exact
          path={`${match.path}/category`}
          render={() => {
            console.log(`${match.path}/category`);
            return <h4>Set the VAT for products in category</h4>;
          }}
        />
        <Route
          exact
          path={`${match.path}/product`}
          render={() => <h4>Set the VAT for products search</h4>}
        />
        <Route
          exact
          path={`${match.path}/types`}
          render={() => <h4>Define VAT types</h4>}
        />
      </Layout>
    );
  }
}
export default Vat;
