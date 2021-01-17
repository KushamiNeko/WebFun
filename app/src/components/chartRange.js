import { useState, useEffect } from "react";

import styled from "styled-components";
import { connect } from "react-redux";

import { chartSetRange } from "../actions/chartActions";

import { layoutVertical } from "../styles/layout";

import Title from "./inputs/title";
import CheckButton from "./inputs/checkButton";
import Separator from "./inputs/separator";

const Container = styled.div`
  ${layoutVertical}
  min-width: 212px;
`;

const rangePresetHourly = ["4D", "6D", "8D", "12D", "16D"];
const rangePresetDaily = ["3M", "4M", "6M", "9M", "1Y"];
const rangePresetWeekly = ["2Y", "3Y", "4Y", "5Y"];
const rangePresetMonthly = ["12Y", "15Y", "18Y", "20Y"];

function ChartRange(props) {
  const [state, setState] = useState({
    rangeOptions: [],
  });

  useEffect(() => {
    if (props.chart.frequency === "d") {
      setState({
        ...state,
        rangeOptions: rangePresetDaily,
      });
    } else if (props.chart.frequency === "w") {
      setState({
        ...state,
        rangeOptions: rangePresetWeekly,
      });
    } else if (props.chart.frequency === "m") {
      setState({
        ...state,
        rangeOptions: rangePresetMonthly,
      });
    } else if (props.chart.frequency === "h") {
      setState({
        ...state,
        rangeOptions: rangePresetHourly,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chart.frequency]);

  return (
    <Container>
      <Title>Chart Range</Title>
      <Separator />
      {state.rangeOptions.map((item, index) => {
        return (
          <CheckButton
            key={index}
            checked={index === state.rangeOptions.indexOf(props.chart.range)}
            onCheck={() => {
              if (props.chart.isWorking) {
                return;
              }

              props.chartSetRange(item);
            }}
          >
            {item}
          </CheckButton>
        );
      })}
    </Container>
  );
}

const mapStatetoProps = (state) => ({
  chart: state.chart,
});

export default connect(mapStatetoProps, {
  chartSetRange,
})(ChartRange);
