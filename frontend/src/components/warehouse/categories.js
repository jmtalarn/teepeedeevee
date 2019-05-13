import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";

import SortableTree from "react-sortable-tree";

// import { addProduct } from "../../actions/orderActions";
import { connect } from "react-redux";
import {
  updateParentCategory,
  updateCategoryName,
  removeCategory,
  createCategory,
} from "../../actions/categoriesActions";
import treeTheme from "react-sortable-tree-theme-minimal";
//import "react-sortable-tree/style.css"; // This only needs to be imported once in your app

const CategoryTextField = styled.input`
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  padding: 0.5rem;
  font-size: 2rem;
  font-weight: 100;
`;

const Layout = styled.div`
  ${"" /* display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr; */}

  .rstcustom__rowTitle {
    font-weight: 100;
  }
`;
const CreateCategoryLayout = styled.div`
  padding: 1rem 4.5rem;
`;

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  createCategory() {
    this.props.createCategory(this.state.name);
    this.setState({ name: "" });
  }
  render() {
    const { intl } = this.props;
    const placeholder = intl.formatMessage({
      id: "category.createPlaceholder",
      defaultMessage: "Category name ...",
    });
    return (
      <CreateCategoryLayout>
        <CategoryTextField
          value={this.state.name}
          placeholder={placeholder}
          onChange={event => {
            this.setState({ name: event.target.value });
          }}
        />
        <button
          onClick={() => {
            this.createCategory();
          }}
          disabled={!this.state.name.length}
        >
          <FormattedMessage id="category.create" defaultMessage="Create" />
        </button>
      </CreateCategoryLayout>
    );
  }
}
const CreateCategoryIntl = injectIntl(CreateCategory);

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { treeData: [] };
  }

  static getDerivedStateFromProps(props, state) {
    const getTreeNode = category => {
      return {
        title: (
          <CategoryTextField
            value={category.name}
            onChange={event => {
              props.updateCategoryName(category.name, event.target.value);
            }}
          />
        ),
        name: category.name,
        parent: category.parent,
        subtitle: "",
        expanded: true,
        children: props.categories
          .filter(cat => cat.parent === category.name)
          .map(cat => getTreeNode(cat)),
      };
    };

    const treeData = props.categories
      .filter(category => category.parent === null)
      .map(node => getTreeNode(node));

    return { treeData };
    // }
    // return state;
  }

  render() {
    return (
      <Layout>
        <CreateCategoryIntl createCategory={this.props.createCategory} />
        <div style={{ height: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            theme={treeTheme}
            generateNodeProps={treeNode => {
              return {
                buttons: [
                  <button
                    onClick={() => this.props.removeCategory(treeNode.node)}
                  >
                    <FormattedMessage
                      id="category.delete"
                      defaultMessage="Delete"
                    />
                  </button>,
                ],
              };
            }}
            onMoveNode={({ node, nextParentNode }) => {
              console.log({ node, nextParentNode });

              this.props.updateParentCategory(
                node.name,
                nextParentNode ? nextParentNode.name : null,
              );
            }}
            onChange={treeData => this.setState({ treeData })}
          />
        </div>
      </Layout>
    );
  }
}

export default connect(
  (state, props) => Object.assign({}, { categories: state.categories }),
  dispatch => ({
    updateParentCategory: (categoryName, parent) => {
      dispatch(updateParentCategory(categoryName, parent));
    },
    updateCategoryName: (oldName, newName) => {
      dispatch(updateCategoryName(oldName, newName));
    },
    removeCategory: category => {
      dispatch(removeCategory(category));
    },
    createCategory: categoryName => {
      dispatch(createCategory(categoryName));
    },
  }),
)(Categories);
