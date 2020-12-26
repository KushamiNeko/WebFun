import styled from "styled-components";
import { connect } from "react-redux";

import { fontSubhead, fontBody1 } from "../styles/typography";
import { noselect, transitionLiteral } from "../styles/common";

const Info = styled.div`
  ${fontSubhead}
  @media (max-width: var(--media-max-width)) {
    ${fontBody1}
  }

  ${noselect}
  ${transitionLiteral("top 0.1s ease, left 0.1s ease")}

  display: ${(props) => (props.active ? "block" : "none")};

  white-space: pre;
  position: absolute;
  left: 29%;
  z-index: 2;
  color: white;
  opacity: var(--dark-primary-opacity);
  background-color: rgba(0, 0, 0, 0.5);
`;

function ChartInspect(props) {
  return <Info active={props.inspect.active}>{props.inspect.info}</Info>;
}

const mapStatetoProps = (state) => ({
  //symbols: state.symbols,
  //chart: state.chart,
  inspect: state.inspect,
});

export default connect(mapStatetoProps, {
  //chartSetSymbol,
  //chartSetFrequency,
  //chartSetShowRecords,
  //chartSetInputs,
})(ChartInspect);
