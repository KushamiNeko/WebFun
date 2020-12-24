import { useState, useEffect } from "react";
import styled from "styled-components";

import { fontBody1 } from "../../styles/typography";
import { layoutVertical, layoutAroundJustified } from "../../styles/layout";

import { willChange } from "../../styles/common";

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

  ${willChange("color", "0.1s")}
  ${willChange("background-color", "0.1s")}

  :focus {
    color: ${(props) => (props.error ? "white" : "black")};
    background-color: ${(props) =>
      props.error ? "var(--paper-red-900)" : "var(--paper-grey-200)"};
  }
`;

function LabelInput(props) {
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("input effect");
    checkError(props.value);
  }, []);

  useEffect(() => {
    console.log("input effect");
    if (props.onChange) {
      props.onChange(value);
    }

    if (props.onError) {
      props.onError(error);
    }
  }, [value, error]);

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

  function onChange(e) {
    checkError(e.target.value);
    setValue(e.target.value);
  }

  return (
    <Container>
      <Label>{props.label}</Label>
      <Input
        value={value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        onChange={onChange}
        error={error}
      />
    </Container>
  );
}

export default LabelInput;
