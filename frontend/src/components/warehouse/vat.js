import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import TextField from "../TextField";
import { Route, Link } from "react-router-dom";
import { productUpdate } from "../../actions/productActions";
import Datatable from "./ProductsDatatable";
import { connect } from "react-redux";
import { vatApplyValueUpdate } from "../../actions/vatActions";

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

const VatFormLayout = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2rem;
    justify-content: space-between;
    min-height: 7rem;

    button {
      height: 2rem;
      width: 100%;
    }
    input#rate {
      width: 75%;
    }
  }
  .row {
    width: 100%;

    label.top {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
`;

const DatatableContainer = connect(
  (state, props) => {
    return {
      categories: state.categories,
      products: state.products,
      hideFields: ["price", "stock", "delete"],
    };
  },
  dispatch => ({
    productUpdate: (code, product) => {
      dispatch(productUpdate(code, product));
    },
  }),
)(Datatable);

class VatApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { categories: [], products: [] },
      value: "",
    };
  }
  render() {
    return (
      <div>
        <h4>Set the VAT for products in category and individual products</h4>
        <VatFormLayout>
          <div className="column">
            <div className="row">
              <label className="top" htmlFor="selected_category">
                <FormattedMessage
                  id="vat.select.categories"
                  defaultMessage="Select all products in category to apply VAT"
                />
              </label>
              <Select
                id="selected_category"
                isMulti={true}
                options={this.props.categories}
                getOptionValue={category => category.name}
                getOptionLabel={category => category.name}
                value={this.state.selected.categories}
                onChange={(categories, action) => {
                  this.setState(
                    Object.assign(
                      {},
                      this.state,

                      {
                        selected: {
                          categories,
                          products: this.state.selected.products,
                        },
                      },
                    ),
                  );
                }}
              />
            </div>

            <div className="row">
              <label className="top" htmlFor="selected_products">
                <FormattedMessage
                  id="vat.select.products"
                  defaultMessage="Select products individually to apply VAT value"
                />
              </label>
              <Select
                id="selected_products"
                isMulti={true}
                options={this.props.products}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.code}
                maxHeight={2}
                getNewOptionData={(inputValue, optionLabel) => {
                  return {
                    code: inputValue,
                    name: optionLabel,
                  };
                }}
                value={this.state.selected.products}
                onChange={(products, action) => {
                  this.setState(
                    Object.assign(
                      {},
                      this.state,

                      {
                        selected: {
                          categories: this.state.selected.categories,
                          products,
                        },
                      },
                    ),
                  );
                }}
              />
            </div>
          </div>
          <div className="column">
            <label>
              <TextField
                id="rate"
                type="number"
                size={3}
                value={this.state.value}
                onChange={event => {
                  this.setState(
                    Object.assign({}, this.state, {
                      value: event.target.value,
                    }),
                  );
                }}
              />
              <FormattedMessage id="vat.rate" defaultMessage="% rate" />
            </label>
            <button
              onClick={() => {
                console.log(this.state);
                this.props.applyVatValueUpdate(
                  this.state.selected.categories,
                  this.state.selected.products,
                  this.state.value,
                );
              }}
            >
              <FormattedMessage id="vat.apply" defaultMessage="Apply" />
            </button>
          </div>
        </VatFormLayout>
      </div>
    );
  }
}
const VatApply = connect(
  (state, props) => {
    return {
      categories: state.categories,
      products: state.products,
    };
  },
  dispatch => ({
    applyVatValueUpdate: (categories, products, value) => {
      dispatch(vatApplyValueUpdate(categories, products, value));
    },
  }),
)(VatApplyForm);

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
              <Link to={`${match.url}/apply`}>
                <FormattedMessage
                  id="vat.apply"
                  defaultMessage="Apply VAT to products"
                />
              </Link>
            </li>
            <li>
              <Link to={`${match.url}/products`}>
                <FormattedMessage
                  id="vat.products"
                  defaultMessage="Products VAT"
                />
              </Link>
            </li>
          </ul>
        </Nav>
        <Route exact path={`${match.path}/apply`} component={VatApply} />
        <Route
          exact
          path={`${match.path}/products`}
          component={DatatableContainer}
        />
      </Layout>
    );
  }
}
export default Vat;
