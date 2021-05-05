import { css } from "styled-components";

export const fontCommonBase = css`
  //font-family: 'Roboto', 'Noto', sans-serif;

  -webkit-font-smoothing: antialiased;
`;

export const fontCommonCode = css`
  //font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;

  -webkit-font-smoothing: antialiased;
`;

export const fontCommonExpensiveKerning = css`
  text-rendering: optimizeLegibility;
`;

export const fontCommonNowrap = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const fontDisplay4Spec = css`
  font-size: 112px;
  font-weight: 300;
  letter-spacing: -0.044em;
  line-height: 120px;
`;

export const fontDisplay4 = css`
  ${fontCommonBase};
  ${fontCommonNowrap};
  ${fontDisplay4Spec};
`;

export const fontDisplay3Spec = css`
  font-size: 56px;
  font-weight: 400;
  letter-spacing: -0.026em;
  line-height: 60px;
`;

export const fontDisplay3 = css`
  ${fontCommonBase};
  ${fontCommonNowrap};
  ${fontDisplay3Spec};
`;

export const fontDisplay2Spec = css`
  font-size: 45px;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 48px;
`;

export const fontDisplay2 = css`
  ${fontCommonBase};
  ${fontDisplay2Spec};
`;

export const fontDisplay1Spec = css`
  font-size: 34px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 40px;
`;

export const fontDisplay1 = css`
  ${fontCommonBase};
  ${fontDisplay1Spec};
`;

export const fontHeadlineSpec = css`
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.012em;
  line-height: 32px;
`;

export const fontHeadline = css`
  ${fontCommonBase};
  ${fontHeadlineSpec};
`;

export const fontTitleSpec = css`
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

export const fontTitle = css`
  ${fontCommonBase};
  ${fontCommonNowrap};
  ${fontTitleSpec};
`;

export const fontSubheadSpec = css`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

export const fontSubhead = css`
  ${fontCommonBase};
  ${fontSubheadSpec};
`;

export const fontBody2Spec = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
`;

export const fontBody2 = css`
  ${fontCommonBase};
  ${fontBody2Spec};
`;

export const fontBody1Spec = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

export const fontBody1 = css`
  ${fontCommonBase};
  ${fontBody1Spec};
`;

export const fontCaptionSpec = css`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.011em;
  line-height: 20px;
`;

export const fontCaption = css`
  ${fontCommonBase};
  ${fontCommonNowrap};
  ${fontCaptionSpec};
`;

export const fontMenuSpec = css`
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
`;

export const fontMenu = css`
  ${fontCommonBase};
  ${fontCommonNowrap};
  ${fontMenuSpec};
`;

export const fontButtonIconSpec = css`
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
  vertical-align: text-top;
  margin: 0 0.15em 0 0;
`;

export const fontButtonSpec = css`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.018em;
  line-height: 24px;
  text-transform: uppercase;
`;

export const fontButton = css`
  ${fontCommonBase};
  ${fontCommonNowrap};
  ${fontButtonSpec};
`;

export const fontCode2Spec = css`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export const fontCode2 = css`
  ${fontCommonCode};
  ${fontCode2Spec};
`;

export const fontCode1Spec = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

export const fontCode1 = css`
  ${fontCommonCode};
  ${fontCode1Spec};
`;
