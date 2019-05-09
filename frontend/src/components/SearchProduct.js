import React from "react";
import styled from "styled-components";
import Select from "react-select";
import products from "../data/products.json";
import categories from "../data/categories.json";

const Container = styled.div`
  padding: ${props => props.theme.padding};
  border: 1px dotted red;
`;

const InnerContainer = styled.div`
  border: 1px dotted red;
`;
const SelectProduct = styled(Select)`
  position: relative;
`;

const ListView = styled.div`
  button {
    width: 100%;
    padding: ${props => props.theme.padding};
  }
`;
class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      parent: null,
      categories: categories.filter(category => category.parent === null),
      products: [],
    };
  }
  filterCategory(parent) {
    this.setState({
      parent,
      categories: categories.filter(category => category.parent === parent),
      products: products.filter(product => product.category === parent),
    });
  }
  render() {
    return (
      <ListView>
        <button
          onClick={() => {
            const currentCategory = categories.find(
              category => category.name === this.state.parent,
            );
            console.log(currentCategory);
            this.filterCategory(
              currentCategory ? currentCategory.parent : null,
            );
          }}
        >
          &lt; {this.state.parent}
        </button>
        {this.state.categories.map(category => (
          <button
            key={category.name}
            onClick={() => {
              this.filterCategory(category.name);
            }}
          >
            {category.name} >
          </button>
        ))}
        {this.state.products.map(product => (
          <button
            key={product.code}
            onClick={() => {
              console.log(product);
            }}
          >
            {product.name}
          </button>
        ))}
      </ListView>
    );
  }
}

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
    <InnerContainer>
      <CategorySelect />
    </InnerContainer>
  </Container>
);
