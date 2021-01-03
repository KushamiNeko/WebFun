import { useEffect } from "react";

import { infoClosePanel } from "../actions/infoActions";
import { connect } from "react-redux";

import styled from "styled-components";
//import { layoutVertical } from "../styles/layout";

import { horizontalMargin } from "./inputs/common";
import { fontBody1 } from "../styles/typography";
import { noselect } from "../styles/common";

import Modal from "./modal";
//import Title from "./inputs/title";

const Container = styled.div``;
//${layoutVertical}
//min-width: 212px;

//${fontSubhead}
//font-weight: bold;
const Info = styled.pre`
  ${fontBody1}

  ${horizontalMargin}
  ${noselect}
  color: white;
  background-color: var(--paper-indigo-400);

  margin-bottom: 0.1em;

  padding: 2em;

  overflow: auto;
  max-height: 80vh;
`;

function InfoMessage(props) {
  function keydownHandler(e) {
    if (e.which === 13) {
      props.infoClosePanel();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  });

  return (
    <Modal isOpen={props.info.showPanel}>
      <Container>
        <Info>{props.info.message}</Info>
      </Container>
    </Modal>
  );
}

const mapStatetoProps = (state) => ({
  info: state.info,
});

export default connect(mapStatetoProps, { infoClosePanel })(InfoMessage);
