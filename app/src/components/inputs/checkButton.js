import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./button";

const ActivateButton = styled(Button)`
  color: ${(props) => (props.activated ? "black" : "white")};

  background-color: ${(props) =>
    props.activated ? "var(--paper-yellow-600)" : "var(--paper-blue-grey-700)"};

  :focus {
    background-color: ${(props) =>
      props.activated ? "var(--paper-yellow-800)" : "var(--paper-grey-500)"};
  }

  :hover {
    background-color: ${(props) =>
      props.activated ? "var(--paper-yellow-300)" : "var(--paper-grey-500)"};
  }
`;

function CheckButton(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checked = props.checked ?? false;

    setChecked(checked);
  }, [props.checked]);

  return (
    <ActivateButton
      activated={checked}
      onClick={() => {
        if (props.onCheck) {
          props.onCheck(!checked);
        }

        setChecked(!checked);
      }}
    >
      {props.children}
    </ActivateButton>
  );
}

export default CheckButton;
