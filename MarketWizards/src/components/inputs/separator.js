import styled from "styled-components";

const Separator = styled.span`
  display: block;

  height: 1px;
  width: ${(props) => (props.width ? props.width : "85%")};

  margin: 3px auto 3px auto;

  color: white;
  background-color: white;
  opacity: var(--dark-disabled-opacity);
`;

export default Separator;
