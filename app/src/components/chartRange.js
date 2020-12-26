import { useState, useEffect } from "react";

import styled from "styled-components";
import { connect } from "react-redux";

import { chartSetParameters } from "../actions/chartActions";

import { layoutVertical } from "../styles/layout";

import Title from "./inputs/title";
import CheckButton from "./inputs/checkButton";
import Separator from "./inputs/separator";

const Container = styled.div`
  ${layoutVertical}
  min-width: 212px;
`;

const rangePreset = ["3M", "6M", "9M", "1Y", "3Y", "5Y"];

function ChartRange(props) {
  return (
    <Container>
      <Title>Chart Range</Title>
      <Separator />
      {rangePreset.map((item, index) => (
        <CheckButton key={index}>{item}</CheckButton>
      ))}
    </Container>
  );
}

const mapStatetoProps = (state) => ({
  symbols: state.symbols,
  parameters: state.parameters,
  chart: state.chart,
});

export default connect(mapStatetoProps, {
  chartSetParameters,
})(ChartRange);
