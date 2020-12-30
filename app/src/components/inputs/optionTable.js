import styled from "styled-components";

import { fontBody1 } from "../../styles/typography";
import { layoutVertical, layoutAroundJustified } from "../../styles/layout";

import { transitionLiteral, noselect } from "../../styles/common";

import { horizontalMargin, borderOutline } from "./common";

const Container = styled.div`
  ${fontBody1}
  ${layoutVertical}
  ${layoutAroundJustified}
  margin-top: 0.1em;
  margin-bottom: 0.1em;
`;

const Table = styled.table.attrs((props) => ({
  cellPadding: "0",
  cellSpacing: "0",
}))`
  ${noselect}
  cursor: pointer;
  width: 212px;

  ${fontBody1}
  ${horizontalMargin}
  ${borderOutline}

  color: white;

  background-color: var(--paper-blue-grey-400);

  padding-left: 0.25em;
  padding-right: 0.25em;

  ${transitionLiteral("color 0.1s ease, background-color 0.1s ease")}
`;

const TableRow = styled.tr`
  color: ${(props) => (props.selected ? "var(--paper-amber-300)" : "")};
`;

function OptionTable(props) {
  return (
    <Container>
      <Table>
        <tbody>
          {props.items?.map((item, index) => (
            <TableRow
              key={index}
              selected={
                props.multiSelect
                  ? props.selected?.includes(index)
                  : index === props.selected
              }
              onClick={() => {
                if (props.onSelect) {
                  props.onSelect(index, item);
                }
              }}
            >
              <td>
                {props.showNumber
                  ? `${(index + 1).toString().padStart(2, "0")}.  ${item}`
                  : item}
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OptionTable;
