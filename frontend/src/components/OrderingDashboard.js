import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  removeUnitProduct,
  removeProduct,
  addProduct,
} from "../actions/orderActions";

const Order = styled.div`
  background-color: ${props => props.theme.yellowPaper};
  margin: 1rem;
  min-height: 4rem;
  line-height: ${props => props.theme.touchableLineHeight};

  box-shadow: ${props => props.theme.boxShadow};
  font-weight: 100;
`;
const EmptyOrder = styled.div`
  width: 100%;
  text-align: center;
  font-style: italic;
`;
const QuantityLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const QuantityValue = styled.span`
  margin: 0 1rem;
`;
const Button = styled.button`
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.darkeningBackground};
  }
`;
const OrderLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.padding};
  padding-left: 1rem;
  &:hover {
    background-color: ${props => props.theme.darkeningBackground};
  }
  label {
    min-width: 30rem;
  }
`;
const Quantity = props => (
  <QuantityLayout>
    <Button onClick={() => props.removeUnitProduct(props.product)}>-</Button>
    <QuantityValue>{props.quantity}</QuantityValue>
    <Button onClick={() => props.addProduct(props.product)}>+</Button>
  </QuantityLayout>
);
class OrderingDashboard extends React.Component {
  render() {
    return (
      <Order>
        {console.log(this.props.order)}
        {this.props.order.length ? (
          this.props.order.map((orderedProduct, index) => (
            <OrderLine key={index}>
              <label>{orderedProduct.product.name}</label>
              <Quantity
                removeUnitProduct={this.props.removeUnitProduct}
                removeProduct={this.props.removeProduct}
                addProduct={this.props.addProduct}
                product={orderedProduct.product}
                quantity={orderedProduct.quantity}
              />

              <Button
                onClick={() => {
                  this.props.removeProduct(orderedProduct.product);
                }}
              >
                X
              </Button>
            </OrderLine>
          ))
        ) : (
          <EmptyOrder>Nothing ordered yet</EmptyOrder>
        )}
      </Order>
    );
  }
}

export default connect(
  (state, props) => {
    return Object.assign({}, state);
  },
  dispatch => ({
    addProduct: product => {
      dispatch(addProduct(product));
    },
    removeUnitProduct: product => {
      dispatch(removeUnitProduct(product));
    },
    removeProduct: product => {
      dispatch(removeProduct(product));
    },
  }),
)(OrderingDashboard);
