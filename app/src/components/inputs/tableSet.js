import styled from "styled-components";

import { fontBody1 } from "../../styles/typography";
import { layoutVertical, layoutAroundJustified } from "../../styles/layout";

import { willChange, noselect } from "../../styles/common";

import { horizontalMargin, borderOutline } from "./common";

import Button from "./button";

const Container = styled.div`
  ${fontBody1}
  ${layoutVertical}
  ${layoutAroundJustified}
  margin-top: 0.1em;
  margin-bottom: 0.1em;
`;

const Label = styled.span`
  ${fontBody1}
  ${horizontalMargin}
  color: white;
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

  ${willChange("color", "0.1s")}
  ${willChange("background-color", "0.1s")}
`;

const TableRow = styled.tr`
  color: ${(props) => (props.selected ? "var(--paper-amber-300)" : "")};
`;

function TableSet(props) {
  return (
    <>
      <Container>
        <Label>{props.label}</Label>
        <Button
          onClick={() => {
            console.log("change set click");
            if (props.onChangeSet) {
              props.onChangeSet(1);
            }
          }}
          onContextMenu={(e) => {
            console.log("change set context menu");
            e.preventDefault();

            if (props.onChangeSet) {
              props.onChangeSet(-1);
            }
          }}
        >
          {props.set}
        </Button>
      </Container>

      <Container>
        <Table>
          <tbody>
            {props.items?.map((item, index) => (
              <TableRow
                key={index}
                selected={index === props.selected}
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
    </>
  );
}

export default TableSet;
