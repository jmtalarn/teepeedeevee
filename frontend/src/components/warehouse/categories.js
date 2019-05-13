import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import SortableTree from "react-sortable-tree";

// import { addProduct } from "../../actions/orderActions";
import { connect } from "react-redux";
import {
  updateParentCategory,
  updateCategoryName,
  removeCategory,
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
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { treeData: [] };
  }
  static getDerivedStateFromProps(props, state) {
    const treeData = [];
    const nodeMap = {};
    console.log(state);
    // if (state.treeData.length === 0) {
    for (let category of props.categories) {
      const treeNode = {
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
        children: [],
      };

      nodeMap[category.name] = treeNode;
      if (category.parent === null) {
        treeData.push(treeNode);
      } else {
        nodeMap[category.parent].children.push(treeNode);
      }
    }
    return { treeData };
    // }
    // return state;
  }

  render() {
    return (
      <Layout>
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
  }),
)(Categories);
