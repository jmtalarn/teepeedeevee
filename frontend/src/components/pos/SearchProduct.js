import React from "react";
import styled from "styled-components";
import { injectIntl } from "react-intl";
import Select from "react-select/lib/Creatable";
// import categories from "../../data/categories.json";
import { addProduct } from "../../actions/orderActions";
import { connect } from "react-redux";

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
  display: grid;
`;
const ListViewItem = styled.button`
  &:first-child {
    margin: 1rem 0;
  }
  color: ${props => props.theme.black};

  font-size: 2rem;
  line-height: ${props => props.theme.touchableLineHeight};
  font-weight: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {
      parent: null,
      categories: props.categories.filter(category => category.parent === null),
      products: props.products.filter(product => product.category === null),
    };
  }
  filterCategory(parent) {
    this.setState({
      parent,
      categories: this.props.categories.filter(
        category => category.parent === parent,
      ),
      products: this.props.products.filter(
        product => product.category === parent,
      ),
    });
  }
  render() {
    console.log(this.props);
    return (
      <ListView>
        <ListViewItem
          onClick={() => {
            const currentCategory = this.props.categories.find(
              category => category.name === this.state.parent,
            );

            this.filterCategory(
              currentCategory ? currentCategory.parent : null,
            );
          }}
          disabled={this.state.parent === null}
        >
          <span>&lt;</span>
          <span>{this.state.parent}</span>
        </ListViewItem>
        {this.state.categories.map(category => (
          <ListViewItem
            key={category.name}
            onClick={() => {
              this.filterCategory(category.name);
            }}
          >
            <span>{category.name}</span>
            <span>&gt;</span>
          </ListViewItem>
        ))}
        {this.state.products.map(product => (
          <ListViewItem
            key={product.code}
            onClick={() => {
              this.props.addProduct(product);
            }}
          >
            {product.name}
            <span>&middot;</span>
          </ListViewItem>
        ))}
      </ListView>
    );
  }
}

const CategorySelectContainer = connect(
  (state, props) => Object.assign({}, state),
  dispatch => ({
    addProduct: product => {
      dispatch(addProduct(product));
    },
  }),
)(CategorySelect);

class SearchProduct extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { value: "" };
  }
  render() {
    const { intl } = this.props;

    return (
      <SelectProduct
        options={this.props.products}
        getOptionLabel={option => option.name}
        maxHeight={2}
        allowCreateWhileLoading={false}
        formatCreateLabel={inputValue =>
          intl.formatMessage(
            {
              id: "search.addToOrder",
              defaultMessage: "Add {value} to order",
            },
            {
              value: inputValue,
            },
          )
        }
        getNewOptionData={(inputValue, optionLabel) => {
          console.log(inputValue, optionLabel);
          return {
            code: inputValue,
            name: optionLabel,
          };
        }}
        value={this.state.value}
        onChange={(value, action) => {
          console.log(value, action);
          this.props.addProduct(value);
          this.setState({ value: "" });
        }}
      />
    );
  }
}

const SearchProductContainer = connect(
  (state, props) => ({
    order: state.order,
  }),
  dispatch => ({
    addProduct: product => {
      dispatch(addProduct(product));
    },
  }),
)(injectIntl(SearchProduct));
export default props => (
  <Container>
    <InnerContainer>
      <SearchProductContainer />
    </InnerContainer>
    <InnerContainer>
      <CategorySelectContainer />
    </InnerContainer>
  </Container>
);
