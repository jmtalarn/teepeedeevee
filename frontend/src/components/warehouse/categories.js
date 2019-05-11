import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import SortableTree from "react-sortable-tree";
import Tree from "react-ui-tree";
// import { addProduct } from "../../actions/orderActions";
import { connect } from "react-redux";
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
const Categories = props => {
  const treeData = [];
  const nodeMap = {};
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
  console.log(treeData, nodeMap, props.categories);

  return (
    <Layout>
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={treeData}
          theme={treeTheme}
          onChange={something => console.log(something)}
        />
      </div>
    </Layout>
  );
};

export default connect(
  (state, props) => Object.assign({}, { categories: state.categories }),
  // dispatch => ({
  //     addProduct: product => {
  //         dispatch(addProduct(product));
  //     },
  // }),
  null,
)(Categories);
