import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import SortableTree from "react-sortable-tree";

// import { addProduct } from "../../actions/orderActions";
import { connect } from "react-redux";
import { updateCategory } from "../../actions/categoriesActions";
import treeTheme from "react-sortable-tree-theme-minimal";
//import "react-sortable-tree/style.css"; // This only needs to be imported once in your app

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
    if (state.treeData.length === 0) {
      for (let category of props.categories) {
        const treeNode = {
          title: category.name,
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
    }
    return state;
  }

  render() {
    return (
      <Layout>
        <div style={{ height: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            theme={treeTheme}
            generateNodeProps={something => {
              return {
                buttons: [<button>Edit</button>, <button>Delete</button>],
              };
            }}
            onMoveNode={({ node, nextParentNode }) => {
              console.log({ node, nextParentNode });
              this.props.updateCategory(
                { name: node.title, parent: node.parent },
                {
                  name: node.title,
                  parent: nextParentNode ? nextParentNode.title : null,
                },
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
    updateCategory: (prev, next) => {
      dispatch(updateCategory(prev, next));
    },
  }),
)(Categories);
