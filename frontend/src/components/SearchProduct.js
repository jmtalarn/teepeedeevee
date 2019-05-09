import React from "react";
import styled from "styled-components";
import Select from "react-select";
import products from "../data/products.json";

const Container = styled.div`
  padding: ${props => props.theme.padding};
  border: 1px dotted red;
`;

const InnerContainer = styled.div`
  border: 1px dotted red;
`;
const SelectProduct = styled(Select)`
  position: relative;
  ${"" /* 
  input {
    margin: ${props => props.theme.padding};
    padding: ${props => props.theme.padding};
    width: calc(100% - 1rem);
  }
  .typeahead-selector {
    position: absolute;
    top: 1.2rem;
    left: 0.5rem;
    width: calc(100% - 1rem);
    background-color: white;
    box-shadow: ${props => props.theme.boxShadow};
    list-style: none;
    padding: 0;
    li a {
      text-decoration: none;
      color: inherit;
      line-height: 48px;
      padding: 1rem;
    }
  } */}
`;
class SearchProduct extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { value: "" };
  }
  render() {
    return (
      <SelectProduct
        options={products}
        getOptionLabel={option => option.name}
        maxHeight={2}
        value={this.state.value}
        onChange={(value, action) => {
          console.log(value, action);
          this.setState({ value: "" });
        }}
      />
    );
  }
}

export default props => (
  <Container>
    <InnerContainer>
      <SearchProduct />
    </InnerContainer>
    <InnerContainer>Categories</InnerContainer>
  </Container>
);
