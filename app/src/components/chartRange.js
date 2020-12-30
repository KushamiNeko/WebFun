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

const rangePresetDaily = ["3M", "6M", "9M", "1Y"];
const rangePresetWeekly = ["3Y", "4Y", "5Y"];
const rangePresetMonthly = ["15Y", "18Y", "20Y"];

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
    }
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
