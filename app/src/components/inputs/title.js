import styled from "styled-components";

import { horizontalMargin } from "./common";
import { fontBody1 } from "../../styles/typography";

const Title = styled.span`
  ${fontBody1}
  ${horizontalMargin}
  color: white;
  margin-bottom: 0.1em;
  font-weight: bold;
`;

export default Title;
