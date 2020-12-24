import styled from "styled-components";

import { layoutHorizontal, layoutAroundJustified } from "../styles/layout";
import { fontSubhead } from "../styles/typography";
import { shadow2dp } from "../styles/shadows";

const Container = styled.div`
  ${layoutHorizontal}
  ${layoutAroundJustified}

  ${shadow2dp};

  background-color: var(--paper-blue-grey-700);
`;

const Button = styled.button`
  ${fontSubhead}

  background-color: var(--paper-blue-grey-700);
  text-decoration: none;
  border: none;
  color: white;
  opacity: ${(props) =>
    props.activated
      ? "var(--dark-primary-opacity)"
      : "var(--dark-secondary-opacity)"};
  outline: none;
  cursor: pointer;

  :hover {
    opacity: var(--dark-primary-opacity);
  }
`;

const Divider = styled.span`
  ${fontSubhead}

  color: white;
  opacity: var(--dark-divider-opacity);
`;

function Navbar() {
  return (
    <Container>
      <Button>Practice</Button>
      <Divider>/</Divider>
      <Button>Statistic</Button>
    </Container>
  );
}

export default Navbar;
