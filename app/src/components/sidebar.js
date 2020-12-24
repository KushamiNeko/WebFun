import styled from "styled-components";
import {
  layoutFlex2,
  layoutVertical,
  layoutAroundJustified,
} from "../styles/layout";

const Bar = styled.div`
  ${layoutFlex2}
`;

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
