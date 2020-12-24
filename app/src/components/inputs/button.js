import styled from "styled-components";
import { fontButton } from "../../styles/typography";
import { willChange } from "../../styles/common";
import { horizontalMargin, borderOutline } from "./common";

const Button = styled.button`
  ${willChange("background-color", "0.1s")}

  ${fontButton}
  ${horizontalMargin}
  ${borderOutline}

  color: white;

  margin-top: 2px;
  margin-bottom: 2px;

  background-color: var(--paper-blue-grey-700);

  :focus {
    background-color: var(--paper-grey-500);
  }

  :hover {
    background-color: var(--paper-grey-500);
  }

  :active {
    color: black;
    background-color: var(--paper-grey-200);
  }
`;

export default Button;
