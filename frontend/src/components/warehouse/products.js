import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import BaseTextField from "../TextField";
// import { addProduct } from "../../actions/orderActions";
import { connect } from "react-redux";

const Layout = styled.div`
  font-weight: 100;
  padding: 1rem;
`;

const DatatableRow = styled.div`
  position: relative;
  display: grid;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  }
  grid-template-areas: "code category name name name name fav price price stock";

  @media screen and (max-width: 650px) {
    grid-template-areas: "code category name name name name" "fav price price price stock stock";
  }

  > div {
    padding: 0 1rem;
  }

  .code {
    grid-area: code;
    input,
    > div {
      min-width: 8rem;
    }
  }
  .category {
    input {
      font-weight: 100;
    }
    grid-area: category;
    min-width: 20rem;
  }
  .name {
    grid-area: name;
  }
  .fav {
    grid-area: fav;
  }
  .price {
    grid-area: price;
  }
  .stock {
    grid-area: stock;
  }
  .numeric {
    text-align: right;
  }
`;

const DatatableBody = styled.div`
  margin-top: 5rem;

  @media screen and (min-width: 650px) {
    div {
      label {
        display: none;
      }
    }
    > div:first-of-type label {
      display: block;
      position: absolute;
      top: -3rem;
      font-size: 1.2rem;
    }
  }
`;
const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;
const TextField = styled(BaseTextField)`
  width: 100%;
`;

const DatatableFilter = styled.div`
  .fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 1rem;
  h3 {
    margin: 0;
  }
`;

class Datatable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      products: props.products,
      filter: { code: "", name: "", category: "", fav: false, toggled: true },
    };
  }
  setFilter(newFilter) {
    const filter = Object.assign({}, this.state.filter, newFilter);
    console.log(filter);
    const products = this.props.products
      .filter(product =>
        filter.name.length > 0 ? product.name.includes(filter.name) : true,
      )
      .filter(product =>
        filter.code.length > 0 ? product.code.includes(filter.code) : true,
      )
      .filter(product => (filter.fav ? product.fav : true));
    console.log(filter, this.props.products, products);

    this.setState(
      Object.assign(
        {},
        { categories: this.state.categories },
        { products },
        { filter },
      ),
    );
  }
  render() {
    return (
      <React.Fragment>
        <DatatableFilter>
          <h3>
            <FormattedMessage
              id="product.filter"
              defaultMessage="Product filter"
            />
          </h3>
          <div className="fields">
            <div className="code">
              <Label htmlFor="code">
                <FormattedMessage id="product.code" defaultMessage="Code" />
              </Label>
              <TextField
                id="code"
                size={10}
                value={this.state.filter.code}
                onChange={event => {
                  this.setFilter({ code: event.target.value });
                }}
              />
            </div>
            <div className="category">
              <Label htmlFor="category">
                <FormattedMessage
                  id="product.category"
                  defaultMessage="Category"
                />
              </Label>
              <Select
                id="category"
                options={this.state.categories}
                getOptionLabel={category => category.name}
                value={{ name: this.state.filter.category }}
              />
            </div>
            <div className="name">
              <Label htmlFor="name">
                <FormattedMessage id="product.name" defaultMessage="Name" />
              </Label>
              <TextField
                id="name"
                size={50}
                value={this.state.filter.name}
                onChange={event => {
                  this.setFilter({ name: event.target.value });
                }}
              />
            </div>

            <div className="fav">
              <Label htmlFor="fav">
                <FormattedMessage id="product.fav" defaultMessage="Fav" />
              </Label>
              <TextField
                id="fav"
                type="checkbox"
                value={this.state.filter.fav}
                onChange={event => {
                  this.setFilter({ fav: event.target.checked });
                }}
              />
            </div>
          </div>
        </DatatableFilter>
        <DatatableBody>
          {this.state.products.length > 0 ? (
            this.state.products.map(product => (
              <DatatableRow key={product.code}>
                <div className="code">
                  <Label htmlFor="code">
                    <FormattedMessage id="product.code" defaultMessage="Code" />
                  </Label>
                  <TextField
                    id="code"
                    readOnly
                    size={10}
                    defaultValue={product.code}
                  />
                </div>
                <div className="category">
                  <Label htmlFor="category">
                    <FormattedMessage
                      id="product.category"
                      defaultMessage="Category"
                    />
                  </Label>
                  <Select
                    id="category"
                    options={this.state.categories}
                    getOptionLabel={category => category.name}
                    value={{ name: product.category }}
                  />
                  {/* <TextField id="category" readOnly defaultValue={product.category} /> */}
                </div>
                <div className="name">
                  <Label htmlFor="name">
                    <FormattedMessage id="product.name" defaultMessage="Name" />
                  </Label>
                  <TextField
                    id="name"
                    readOnly
                    size={50}
                    defaultValue={product.name}
                  />
                </div>

                <div className="fav">
                  <Label htmlFor="fav">
                    <FormattedMessage id="product.fav" defaultMessage="Fav" />
                  </Label>
                  <TextField
                    id="fav"
                    type="checkbox"
                    readOnly
                    disabled
                    defaultValue={product.fav}
                  />
                </div>
                <div className="price">
                  <Label htmlFor="price">
                    <FormattedMessage
                      id="product.price"
                      defaultMessage="Price"
                    />
                  </Label>
                  <TextField
                    id="price"
                    readOnly
                    className="numeric"
                    size={5}
                    defaultValue={product.price}
                  />
                </div>
                <div className="stock">
                  <Label htmlFor="stock">
                    <FormattedMessage
                      id="product.stock"
                      defaultMessage="Stock"
                    />
                  </Label>
                  <TextField
                    id="stock"
                    type="number"
                    className="numeric"
                    step="1"
                    size={3}
                    defaultValue={product.stock}
                  />
                </div>
              </DatatableRow>
            ))
          ) : (
            <FormattedMessage
              id="product.empty"
              defaultMessage="No products found"
            />
          )}
        </DatatableBody>
      </React.Fragment>
    );
  }
}
class Products extends React.Component {
  render() {
    return (
      <Layout>
        <h2>
          <FormattedMessage
            id="product.management"
            defaultMessage="Product management"
          />
        </h2>
        <Datatable
          products={this.props.products}
          categories={this.props.categories}
        />
      </Layout>
    );
  }
}
export default connect(
  (state, props) => {
    console.log(state);
    return {
      categories: state.categories,
      products: state.products,
    };
  },
  null,
)(Products);
