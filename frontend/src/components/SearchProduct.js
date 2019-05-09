import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: ${props => props.theme.padding};
  border: 1px dotted red;
`;

const InnerContainer = styled.div`
  border: 1px dotted red;
`;

export default props => (
  <Container>
    <InnerContainer>Search</InnerContainer>
    <InnerContainer>Categories</InnerContainer>
  </Container>
);
