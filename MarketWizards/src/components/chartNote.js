import styled from "styled-components";
import { connect } from "react-redux";

import { fontBody1 } from "../styles/typography";
import { noselect } from "../styles/common";

const Info = styled.pre`
  ${fontBody1}

  ${noselect}
  color: white;
  overflow-y: scroll;

  height: 200px;
`;

function ChartNote(props) {
  return <Info>{props.trade.note}</Info>;
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {})(ChartNote);
