import styled from "styled-components";

import { horizontalMargin } from "./common";
import { fontSubhead } from "../../styles/typography";
import { noselect } from "../../styles/common";

const Title = styled.span`
  ${fontSubhead}
  ${horizontalMargin}
  ${noselect}
  color: white;
  margin-bottom: 0.1em;
  font-weight: bold;
`;

export default Title;
