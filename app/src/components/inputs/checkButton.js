import { useState } from "react";

import styled from "styled-components";
import { fontButton } from "../../styles/typography";
import { willChange } from "../../styles/common";
import { horizontalMargin, borderOutline } from "./common";

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

  return (
    <ActivateButton
      activated={checked}
      onClick={(e) => {
        setChecked(!checked);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      {props.children}
    </ActivateButton>
  );
}

export default CheckButton;
