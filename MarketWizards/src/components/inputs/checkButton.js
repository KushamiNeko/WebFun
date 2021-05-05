import styled from "styled-components";
import Button from "./button";

const ActivateButton = styled(Button)`
  color: ${(props) => (props.chcecked ? "black" : "white")};

  background-color: ${(props) =>
    props.chcecked ? "var(--paper-yellow-600)" : "var(--paper-blue-grey-700)"};

  :focus {
    background-color: ${(props) =>
      props.chcecked ? "var(--paper-yellow-800)" : "var(--paper-grey-500)"};
  }

  :hover {
    background-color: ${(props) =>
      props.chcecked ? "var(--paper-yellow-300)" : "var(--paper-grey-500)"};
  }
`;

function CheckButton(props) {
  return (
    <ActivateButton
      chcecked={props.checked}
      onClick={() => {
        if (props.onCheck) {
          props.onCheck(!props.checked);
        }
      }}
    >
      {props.children}
    </ActivateButton>
  );
}

export default CheckButton;
