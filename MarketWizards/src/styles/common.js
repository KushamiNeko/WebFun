import { css } from "styled-components";

export const noselect = css`
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`;

export function willChange(prop, len, func = "ease") {
  return `
    will-change: ${prop};
    -webkit-transition: ${prop} ${len} ${func};
    transition: ${prop} ${len} ${func};
  `;
}

export function transitionLiteral(prop) {
  const split = prop.split(",");

  let properties = [];

  split.forEach((s) => {
    const ss = s.trim().split(" ");
    properties.push(ss[0].trim());
  });

  const p = properties.join(", ");

  return `
    will-change: ${p};
    -webkit-transition: ${prop};
    transition: ${prop};
  `;
}
