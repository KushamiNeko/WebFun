import styled from "styled-components";

import { fontBody1 } from "../../styles/typography";
import { layoutVertical, layoutAroundJustified } from "../../styles/layout";

import { horizontalMargin } from "./common";

import Button from "./button";
import OptionTable from "./optionTable";

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

function OptionTableSet(props) {
  return (
    <>
      <Container>
        <Label>{props.label}</Label>

        {props.multiSet ? (
          <Button
            onClick={() => {
              if (props.onChangeSet) {
                props.onChangeSet(1);
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault();

              if (props.onChangeSet) {
                props.onChangeSet(-1);
              }
            }}
          >
            {props.set}
          </Button>
        ) : null}
      </Container>

      <OptionTable
        multiSelect={props.multiSelect}
        showNumber={props.showNumber}
        items={props.items}
        selected={props.selected}
        onSelect={(index, item) => {
          if (props.onSelect) {
            props.onSelect(index, item);
          }
        }}
      />
    </>
  );
}

export default OptionTableSet;
