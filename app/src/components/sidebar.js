import styled from "styled-components";
import { layoutVertical, layoutAroundJustified } from "../styles/layout";

const Bar = styled.div``;

const Container = styled.div`
  ${layoutVertical}
  ${layoutAroundJustified}
  width: 240px;
`;

function SideBar(props) {
  return (
    <Bar>
      <Container>{props.children}</Container>
    </Bar>
  );
}

export default SideBar;
