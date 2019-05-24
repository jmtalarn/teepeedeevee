import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import Select from "react-select";
import InputField from "../InputField";

const DatatableRow = styled.div`
  position: relative;
  display: grid;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  }
  grid-template-areas: "code category name name name name fav price price vat stock delete";

  @media screen and (max-width: 750px) {
    grid-template-areas: "code category category name name name name name" "price price price vat stock stock delete";
  }
  @media screen and (max-width: 500px) {
    grid-template-areas:
      "code code" "category category" "name name" "price vat"
      "stock fav" ". delete";
  }
  > div {
    padding: 0 1rem;
    position: relative;
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
  .vat {
    grid-area: vat;
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
  .delete {
    grid-area: delete;
    margin: auto;
  }
  .numeric {
    text-align: right;
  }
`;

const DatatableBody = styled.div`
  margin-top: 5rem;

  ${props =>
    props.hideFields.map(hiddenField => `.${hiddenField}{ display: none }`)};

  @media screen and (min-width: 750px) {
    div {
      label {
        display: none;
      }
    }
    > div:first-of-type label {
      display: block;
      position: absolute;
      top: -4rem;
      font-size: 1.2rem;
    }
  }
`;
const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

const Tag = styled.span`
  padding: 0.5rem;
  border: 1px dotted;
  &:not(:first-child) {
    margin-left: 1rem;
  }
  border-radius: 4px;
`;
const AppliedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0 1rem;
`;
const ClearFiltersButton = styled.button`
  margin-left: auto;
`;
const FilterFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  height: auto;
  max-height: ${props => (props.toggled ? "100rem" : 0)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  * {
    visibility: ${props => (props.toggled ? "visible" : "hidden")};
  }
`;
const DatatableFilter = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 1rem;
  h5 {
    margin: 0;
  }
`;

class Datatable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      filter: {
        code: "",
        name: "",
        category: null,
        fav: false,
        toggled: false,
      },
    };
  }
  static getDerivedStateFromProps(props, state) {
    return Object.assign({}, state, {
      products: Datatable.filteredProducts(props.products, state.filter),
    });
  }
  toggleFilter() {
    const filter = Object.assign({}, this.state.filter, {
      toggled: !this.state.filter.toggled,
    });
    this.setState(Object.assign({}, this.state, { filter }));
  }
  clearFilter() {
    this.setState(
      Object.assign(
        {},
        this.state,
        { products: this.props.products },
        {
          filter: {
            code: "",
            name: "",
            category: null,
            fav: false,
            toggled: false,
          },
        },
      ),
    );
  }
  renderAppliedFilters() {
    const tags = [
      this.state.filter.code ? (
        <Tag key="code">
          <FormattedMessage id="product.code" defaultMessage="Code" />:
          {this.state.filter.code}
        </Tag>
      ) : null,
      this.state.filter.name ? (
        <Tag key="name">
          <FormattedMessage id="product.name" defaultMessage="Name" />:
          {this.state.filter.name}
        </Tag>
      ) : null,
      this.state.filter.category ? (
        <Tag key="category">
          <FormattedMessage id="product.category" defaultMessage="Category" />:{" "}
          {this.state.filter.category.name}
        </Tag>
      ) : null,
      this.state.filter.fav ? (
        <Tag key="fav">
          <FormattedMessage id="product.fav" defaultMessage="Fav" />
        </Tag>
      ) : null,
    ].filter(tag => tag !== null);

    return (
      <AppliedFilters>
        <div>{tags}</div>
        {tags.length > 0 ? (
          <ClearFiltersButton onClick={() => this.clearFilter()}>
            <FormattedMessage
              id="product.clearAllFilters"
              defaultMessage="Clear filters"
            />
          </ClearFiltersButton>
        ) : null}
      </AppliedFilters>
    );
  }
  static filteredProducts(products, filter) {
    return products
      .filter(product =>
        filter.name.length > 0 ? product.name.includes(filter.name) : true,
      )
      .filter(product =>
        filter.code.length > 0 ? product.code.includes(filter.code) : true,
      )
      .filter(product =>
        filter.category ? product.category === filter.category.name : true,
      )
      .filter(product => (filter.fav ? product.fav : true));
  }
  setFilter(newFilter) {
    const filter = Object.assign({}, this.state.filter, newFilter);

    const products = Datatable.filteredProducts(this.props.products, filter);
    this.setState(Object.assign({}, { products }, { filter }));
  }
  render() {
    return (
      <React.Fragment>
        <DatatableFilter>
          <div>
            <FormattedMessage
              id="product.filter"
              defaultMessage="Product filter"
            />
            <button onClick={() => this.toggleFilter()}>
              <FormattedMessage
                id="product.toggleFilters"
                defaultMessage="Toggle filters"
              />
            </button>
          </div>
          <FilterFields toggled={this.state.filter.toggled}>
            <div className="code">
              <Label htmlFor="code_filter">
                <FormattedMessage id="product.code" defaultMessage="Code" />
              </Label>
              <InputField
                id="code_filter"
                size={10}
                value={this.state.filter.code}
                onChange={event => {
                  this.setFilter({ code: event.target.value });
                }}
              />
            </div>
            <div className="category">
              <Label htmlFor="category_filter">
                <FormattedMessage
                  id="product.category"
                  defaultMessage="Category"
                />
              </Label>
              <Select
                id="category_filter"
                options={this.props.categories}
                getOptionLabel={category => category.name}
                value={this.state.filter.category}
                onChange={(category, action) => {
                  this.setFilter({ category });
                }}
              />
            </div>
            <div className="name">
              <Label htmlFor="name_filter">
                <FormattedMessage id="product.name" defaultMessage="Name" />
              </Label>
              <InputField
                id="name_filter"
                size={50}
                value={this.state.filter.name}
                onChange={event => {
                  this.setFilter({ name: event.target.value });
                }}
              />
            </div>

            <div className="fav">
              <Label htmlFor="fav_filter">
                <FormattedMessage id="product.fav" defaultMessage="Fav" />
              </Label>
              <InputField
                id="fav_filter"
                type="checkbox"
                checked={this.state.filter.fav}
                onChange={event => {
                  this.setFilter({ fav: event.target.checked });
                }}
              />
            </div>
          </FilterFields>

          {this.renderAppliedFilters()}
        </DatatableFilter>
        <DatatableBody hideFields={this.props.hideFields}>
          {this.state.products.length > 0 ? (
            this.state.products.map((product, index) => {
              return (
                <DatatableRow key={`datatablerow_${index}`}>
                  <div className="code">
                    <Label htmlFor="code">
                      <FormattedMessage
                        id="product.code"
                        defaultMessage="Code"
                      />
                    </Label>
                    <InputField
                      id="code"
                      size={10}
                      value={product.code}
                      lazy={true}
                      onChange={event =>
                        this.props.productUpdate(
                          product.code,
                          Object.assign({}, product, {
                            code: event.target.value,
                          }),
                        )
                      }
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
                      options={this.props.categories}
                      getOptionLabel={category => category.name}
                      value={this.props.categories.find(
                        category => category.name === product.category,
                      )}
                      onChange={(category, action) => {
                        this.props.productUpdate(
                          product.code,
                          Object.assign({}, product, {
                            category: category.name,
                          }),
                        );
                      }}
                    />
                  </div>
                  <div className="name">
                    <Label htmlFor="name">
                      <FormattedMessage
                        id="product.name"
                        defaultMessage="Name"
                      />
                    </Label>
                    <InputField
                      id="name"
                      size={50}
                      value={product.name}
                      lazy={true}
                      onChange={event => {
                        console.log("Here we go!");
                        this.props.productUpdate(
                          product.code,
                          Object.assign({}, product, {
                            name: event.target.value,
                          }),
                        );
                      }}
                    />
                  </div>

                  <div className="fav">
                    <Label htmlFor="fav">
                      <FormattedMessage id="product.fav" defaultMessage="Fav" />
                    </Label>
                    <InputField
                      id="fav"
                      type="checkbox"
                      checked={product.fav}
                      onChange={event =>
                        this.props.productUpdate(
                          product.code,
                          Object.assign({}, product, {
                            fav: event.target.checked,
                          }),
                        )
                      }
                    />
                  </div>
                  <div className="price">
                    <Label htmlFor="price">
                      <FormattedMessage
                        id="product.price"
                        defaultMessage="Price"
                      />
                    </Label>
                    <InputField
                      id="price"
                      type="number"
                      className="numeric"
                      size={5}
                      value={product.price}
                      onChange={event =>
                        this.props.productUpdate(
                          product.code,
                          Object.assign({}, product, {
                            price: event.target.value,
                          }),
                        )
                      }
                    />
                  </div>
                  <div className="stock">
                    <Label htmlFor="stock">
                      <FormattedMessage
                        id="product.stock"
                        defaultMessage="Stock"
                      />
                    </Label>
                    <InputField
                      id="stock"
                      type="number"
                      className="numeric"
                      step="1"
                      size={3}
                      value={product.stock}
                      onChange={event =>
                        this.props.productUpdate(
                          product.code,
                          Object.assign({}, product, {
                            stock: event.target.value,
                          }),
                        )
                      }
                    />
                  </div>
                  <div className="vat">
                    <Label htmlFor="vat">
                      <FormattedMessage id="product.vat" defaultMessage="VAT" />
                    </Label>
                    <InputField
                      id="vat"
                      type="number"
                      className="numeric"
                      step="1"
                      size={3}
                      value={product.vat}
                      onChange={event =>
                        this.props.productUpdate(
                          product.code,
                          Object.assign({}, product, {
                            vat: event.target.value,
                          }),
                        )
                      }
                    />
                  </div>
                  <div className="delete">
                    <button onClick={() => this.props.productRemove(product)}>
                      <FormattedMessage
                        id="product.remove"
                        defaultMessage="Delete"
                      />
                    </button>
                  </div>
                </DatatableRow>
              );
            })
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

export default Datatable;
