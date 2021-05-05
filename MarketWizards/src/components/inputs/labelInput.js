import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { fontBody1 } from "../../styles/typography";
import { noselect } from "../../styles/common";
import { layoutVertical, layoutAroundJustified } from "../../styles/layout";

import { transitionLiteral } from "../../styles/common";

import { horizontalMargin, borderOutline } from "./common";

const Container = styled.div`
  ${fontBody1}
  ${layoutVertical}
  ${layoutAroundJustified}
  margin-top: 0.1em;
  margin-bottom: 0.1em;
`;

const Label = styled.span`
  ${fontBody1}
  ${horizontalMargin}
  ${noselect}
  color: white;
  margin-bottom: 0.1em;
`;

const Input = styled.input.attrs((props) => ({
  type: "text",
}))`
  ${fontBody1}
  ${horizontalMargin}
  ${borderOutline}

  color: white;

  background-color: ${(props) =>
    props.error ? "var(--paper-red-900)" : "var(--paper-blue-grey-400)"};

  padding-left: 0.25em;
  padding-right: 0.25em;

  ${transitionLiteral("color 0.1s ease, background-color 0.1s ease")}

  :focus {
    color: ${(props) => (props.error ? "white" : "black")};
    background-color: ${(props) =>
      props.error ? "var(--paper-red-900)" : "var(--paper-grey-200)"};
  }
`;

//function LabelInput(props) {
const LabelInput = React.forwardRef((props, ref) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    checkError(props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  useEffect(() => {
    if (props.onError) {
      props.onError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  function checkError(value) {
    if (props.regex) {
      const regex = RegExp(props.regex);

      if (!regex.test(value)) {
        setError(true);
      } else {
        if (error) {
          setError(false);
        }
      }
    }
  }

  return (
    <Container>
      <Label>{props.label}</Label>
      <Input
        ref={ref}
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        onChange={(e) => {
          //checkError(e.target.value);
          if (props.onValueChange) {
            props.onValueChange(e.target.value);
          }
        }}
        error={error}
      />
    </Container>
  );
});

export default LabelInput;
