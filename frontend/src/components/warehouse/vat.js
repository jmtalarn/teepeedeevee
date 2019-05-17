import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import TextField from "../TextField";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

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
class VatProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }
  render() {
    return (
      <div>
        <h4>Set the VAT for product</h4>
        <Select
          options={this.props.products}
          getOptionLabel={option => option.name}
          maxHeight={2}
          getNewOptionData={(inputValue, optionLabel) => {
            return {
              code: inputValue,
              name: optionLabel,
            };
          }}
          value={this.state.product}
          onChange={(value, action) => {
            this.setState({ product: value });
          }}
        />
        <label>
          <TextField
            id="rate"
            type="number"
            size={3}
            value={this.state.value}
            onChange={event => {
              this.setState({
                category: this.state.category,
                value: event.target.value,
              });
            }}
          />
          % rate
        </label>
        <button>Apply</button>
      </div>
    );
  }
}
const VatProduct = connect(
  (state, props) => {
    return {
      products: state.products,
    };
  },
  null,
)(VatProductForm);
class VatCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: [], value: null, categories: props.categories };
  }
  render() {
    return (
      <div>
        <h4>Set the VAT for products in category</h4>
        <Select
          id="category"
          isMulti={true}
          options={this.state.categories}
          getOptionValue={category => category.name}
          getOptionLabel={category => category.name}
          value={this.state.category}
          onChange={(category, action) => {
            console.log(category);
            this.setState({
              category,
              value: this.state.value,
            });
          }}
        />
        <label>
          <TextField
            id="rate"
            type="number"
            size={3}
            value={this.state.value}
            onChange={event => {
              this.setState({
                category: this.state.category,
                value: event.target.value,
              });
            }}
          />
          % rate
        </label>
        <label>
          <input type="checkbox" />
          Apply also to subcategories
        </label>
        <button>Apply</button>
      </div>
    );
  }
}
const VatCategory = connect(
  (state, props) => {
    return {
      categories: state.categories,
    };
  },
  null,
)(VatCategoryForm);
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
        <Route exact path={`${match.path}/category`} component={VatCategory} />
        <Route exact path={`${match.path}/product`} component={VatProduct} />
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
