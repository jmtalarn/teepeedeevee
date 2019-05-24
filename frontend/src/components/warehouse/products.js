import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import Datatable from "./ProductsDatatable";
import { productUpdate, productRemove } from "../../actions/productActions";
import { connect } from "react-redux";

const Layout = styled.div`
  font-weight: 100;
  padding: 1rem;
`;

const DatatableContainer = connect(
  (state, props) => {
    return {
      categories: state.categories,
      products: state.products,
      hideFields: ["vat"],
    };
  },
  dispatch => ({
    productUpdate: (code, product) => {
      dispatch(productUpdate(code, product));
    },
    productRemove: product => {
      dispatch(productRemove(product));
    },
  }),
)(Datatable);
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
        <DatatableContainer />
      </Layout>
    );
  }
}
export default Products;
