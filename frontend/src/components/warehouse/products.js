import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import BaseTextField from "../TextField";
// import { addProduct } from "../../actions/orderActions";
import { connect } from "react-redux";

const Layout = styled.div`
  font-weight: 100;
  padding: 1rem;
`;
const DatatableRow = styled.div`
  display: grid;
  ${"" /* grid-template-columns: 4fr 16fr 1fr 2fr 2fr; */}
  grid-template-areas: "code  name name name name fav  price stock";

  @media screen and (max-width: 600px) {
    grid-template-areas: "code name name name name" "fav price price stock stock";
  }
  > div {
    padding: 0 1rem;
  }

  .code {
    grid-area: code;
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
  & > div:first-of-type {
    label {
      display: block;
    }
  }
  div {
    label {
      display: none;
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
class Datatable extends React.Component {
  render() {
    return (
      <DatatableBody>
        {this.props.products.map(product => (
          <DatatableRow key={product.code}>
            <div className="code">
              <Label for="code">
                <FormattedMessage id="product.code" defaultMessage="Code" />
              </Label>
              <TextField id="code" readOnly size={10} value={product.code} />
            </div>
            <div className="name">
              <Label for="name">
                <FormattedMessage id="product.name" defaultMessage="Name" />
              </Label>
              <TextField id="name" readOnly size={50} value={product.name} />
            </div>
            <div className="fav">
              <Label for="fav">
                <FormattedMessage id="product.fav" defaultMessage="Fav" />
              </Label>
              <TextField
                id="fav"
                type="checkbox"
                readOnly
                disabled
                value={product.fav}
              />
            </div>
            <div className="price">
              <Label for="price">
                <FormattedMessage id="product.price" defaultMessage="Price" />
              </Label>
              <TextField
                id="price"
                readOnly
                className="numeric"
                size={5}
                value={product.price}
              />
            </div>
            <div className="stock">
              <Label for="stock">
                <FormattedMessage id="product.stock" defaultMessage="Stock" />
              </Label>
              <TextField
                id="stock"
                type="number"
                className="numeric"
                step="1"
                size={3}
                value={product.stock}
              />
            </div>
          </DatatableRow>
        ))}
      </DatatableBody>
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
        <Datatable products={this.props.products} />
      </Layout>
    );
  }
}
export default connect(
  (state, props) => Object.assign({}, state),
  null,
)(Products);
