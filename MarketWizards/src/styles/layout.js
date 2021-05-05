import { css } from "styled-components";

export const layout = css`
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
`;

export const layoutInline = css`
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
`;

export const layoutHorizontal = css`
  ${layout}
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
`;

export const layoutHorizontalReverse = css`
  ${layout}
  -ms-flex-direction: row-reverse;
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
`;

export const layoutVertical = css`
  ${layout}
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
`;

export const layoutVerticalReverse = css`
  ${layout}
  -ms-flex-direction: column-reverse;
  -webkit-flex-direction: column-reverse;
  flex-direction: column-reverse;
`;

export const layoutWrap = css`
  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
`;

export const layoutWrapReverse = css`
  -ms-flex-wrap: wrap-reverse;
  -webkit-flex-wrap: wrap-reverse;
  flex-wrap: wrap-reverse;
`;

export const layoutFlexAuto = css`
  -ms-flex: 1 1 auto;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
`;

export const layoutFlexNone = css`
  -ms-flex: none;
  -webkit-flex: none;
  flex: none;
`;

export const layoutFlex = css`
  -ms-flex: 1 1 0.000000001px;
  -webkit-flex: 1;
  flex: 1;
  -webkit-flex-basis: 0.000000001px;
  flex-basis: 0.000000001px;
`;

export const layoutFlex2 = css`
  -ms-flex: 2;
  -webkit-flex: 2;
  flex: 2;
`;

export const layoutFlex3 = css`
  -ms-flex: 3;
  -webkit-flex: 3;
  flex: 3;
`;

export const layoutFlex4 = css`
  -ms-flex: 4;
  -webkit-flex: 4;
  flex: 4;
`;

export const layoutFlex5 = css`
  -ms-flex: 5;
  -webkit-flex: 5;
  flex: 5;
`;

export const layoutFlex6 = css`
  -ms-flex: 6;
  -webkit-flex: 6;
  flex: 6;
`;

export const layoutFlex7 = css`
  -ms-flex: 7;
  -webkit-flex: 7;
  flex: 7;
`;

export const layoutFlex8 = css`
  -ms-flex: 8;
  -webkit-flex: 8;
  flex: 8;
`;

export const layoutFlex9 = css`
  -ms-flex: 9;
  -webkit-flex: 9;
  flex: 9;
`;

export const layoutFlex10 = css`
  -ms-flex: 10;
  -webkit-flex: 10;
  flex: 10;
`;

export const layoutFlex11 = css`
  -ms-flex: 11;
  -webkit-flex: 11;
  flex: 11;
`;

export const layoutFlex12 = css`
  -ms-flex: 12;
  -webkit-flex: 12;
  flex: 12;
`;

export const layoutStart = css`
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
`;

export const layoutCenter = css`
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
`;

export const layoutEnd = css`
  -ms-flex-align: end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
`;

export const layoutBaseline = css`
  -ms-flex-align: baseline;
  -webkit-align-items: baseline;
  align-items: baseline;
`;

export const layoutStartJustified = css`
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
`;

export const layoutCenterJustified = css`
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
`;

export const layoutEndJustified = css`
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
`;

export const layoutAroundJustified = css`
  -ms-flex-pack: distribute;
  -webkit-justify-content: space-around;
  justify-content: space-around;
`;

export const layoutJustified = css`
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
`;

export const layoutCenterCenter = css`
  ${layoutCenter};
  ${layoutCenterJustified};
`;

export const layoutSelfStart = css`
  -ms-align-self: flex-start;
  -webkit-align-self: flex-start;
  align-self: flex-start;
`;

export const layoutSelfCenter = css`
  -ms-align-self: center;
  -webkit-align-self: center;
  align-self: center;
`;

export const layoutSelfEnd = css`
  -ms-align-self: flex-end;
  -webkit-align-self: flex-end;
  align-self: flex-end;
`;

export const layoutSelfStretch = css`
  -ms-align-self: stretch;
  -webkit-align-self: stretch;
  align-self: stretch;
`;

export const layoutSelfBaseline = css`
  -ms-align-self: baseline;
  -webkit-align-self: baseline;
  align-self: baseline;
`;

export const layoutStartAligned = css`
  -ms-flex-line-pack: start;
  -ms-align-content: flex-start;
  -webkit-align-content: flex-start;
  align-content: flex-start;
`;

export const layoutEndAligned = css`
  -ms-flex-line-pack: end;
  -ms-align-content: flex-end;
  -webkit-align-content: flex-end;
  align-content: flex-end;
`;

export const layoutCenterAligned = css`
  -ms-flex-line-pack: center;
  -ms-align-content: center;
  -webkit-align-content: center;
  align-content: center;
`;

export const layoutBetweenAligned = css`
  -ms-flex-line-pack: justify;
  -ms-align-content: space-between;
  -webkit-align-content: space-between;
  align-content: space-between;
`;

export const layoutAroundAligned = css`
  -ms-flex-line-pack: distribute;
  -ms-align-content: space-around;
  -webkit-align-content: space-around;
  align-content: space-around;
`;

export const layoutBlock = css`
  display: block;
`;

export const layoutInvisible = css`
  visibility: hidden !important;
`;

export const layoutRelative = css`
  position: relative;
`;

export const layoutFit = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const layoutScroll = css`
  -webkit-overflow-scrolling: touch;
  overflow: auto;
`;

export const layoutFullbleed = css`
  margin: 0;
  height: 100vh;
`;

export const layoutFixedTop = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const layoutFixedRight = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const layoutFixedBottom = css`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const layoutFixedLeft = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
`;
