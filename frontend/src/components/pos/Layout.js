import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 0.5rem;
  padding: ${props => props.theme.padding};
  border: 1px dotted red;
`;
