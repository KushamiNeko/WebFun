import { useState, useEffect } from "react";

import styled from "styled-components";
import { connect } from "react-redux";

import { chartSetParameters } from "../actions/chartActions";

import { layoutVertical, layoutAroundJustified } from "../styles/layout";

import Title from "./inputs/title";
import Button from "./inputs/button";
import CheckButton from "./inputs/checkButton";
import Separator from "./inputs/separator";

const Container = styled.div`
  ${layoutVertical}
  ${layoutAroundJustified}

  min-width: 212px;
`;

const defaultParameters = {
  0: [0, 1, 3, 4],
  1: [1, 4, 6, 7, 8],
};

function ChartParameters(props) {
  const [state, setState] = useState({
    presetIndex: 0,
    preset: "",
    parameters: [],
    checkedParametersIndex: [],
  });

  useEffect(() => {
    const keys = Object.keys(props.parameters);

    setState({
      ...state,
      presetIndex: 0,
      preset: keys[0],
      parameters: Object.values(props.parameters)[0],
      checkedParametersIndex: defaultParameters[0],
    });
  }, []);

  useEffect(() => {
    const ps = { Preset: state.preset };

    state.parameters.forEach((param) => {
      const key = param.replaceAll(" ", "");
      ps[key] = state.checkedParametersIndex.includes(
        state.parameters.indexOf(param)
      );
    });

    props.chartSetParameters(ps);
  }, [state.preset, state.checkedParametersIndex]);

  return (
    <Container>
      <Title>Preset Parameters</Title>
      <Separator />
      <Button
        onClick={() => {
          const keys = Object.keys(props.parameters);

          let newIndex = (state.presetIndex += 1);
          if (newIndex >= keys.length) {
            newIndex = 0;
          }

          setState({
            ...state,
            presetIndex: newIndex,
            preset: keys[newIndex],
            parameters: Object.values(props.parameters)[newIndex],
            checkedParametersIndex: defaultParameters[newIndex],
          });
        }}
      >
        {state.preset}
      </Button>
      <Separator />
      {state.parameters.map((item, index) => (
        <CheckButton
          key={index}
          onCheck={(checked) => {
            if (checked) {
              if (!state.checkedParametersIndex.includes(index)) {
                setState({
                  ...state,
                  checkedParametersIndex: [
                    ...state.checkedParametersIndex,
                    index,
                  ],
                });
              }
            } else {
              if (state.checkedParametersIndex.includes(index)) {
                const i = state.checkedParametersIndex.indexOf(index);
                const newArray = [...state.checkedParametersIndex];
                newArray.splice(i, 1);

                setState({
                  ...state,
                  checkedParametersIndex: newArray,
                });
              }
            }
          }}
          checked={state.checkedParametersIndex.includes(index)}
        >
          {item}
        </CheckButton>
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
})(ChartParameters);
