import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import TextField from "../TextField";
// import { addProduct } from "../../actions/orderActions";
import { connect } from "react-redux";

const Layout = styled.div`
  font-weight: 100;
  padding: 1rem;
`;
const DatatableRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const DatatableRowHeader = styled(DatatableRow)`
  font-weight: bold;
`;
class Datatable extends React.Component {
  renderHeader() {
    return (
      <DatatableRowHeader>
        <div>
          <FormattedMessage id="product.code" defaultMessage="Code" />
        </div>
        <div>
          <FormattedMessage id="product.name" defaultMessage="Name" />
        </div>
        <div>
          <FormattedMessage id="product.fav" defaultMessage="Fav" />
        </div>
        <div>
          <FormattedMessage id="product.price" defaultMessage="Price" />
        </div>
        <div>
          <FormattedMessage id="product.stock" defaultMessage="Stock" />
        </div>
      </DatatableRowHeader>
    );
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.props.products.map(product => (
          <DatatableRow>
            <div>
              <TextField value={product.code} />
            </div>
            <div>
              <TextField value={product.name} />
            </div>
            <div>
              <TextField value={product.fav ? "Yes" : "No"} />
            </div>
            <div>
              <TextField value={product.price} />
            </div>
            <div>
              <TextField value={product.stock} />
            </div>
          </DatatableRow>
        ))}
      </div>
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
