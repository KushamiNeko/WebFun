import { useEffect } from "react";

import { errorClosePanel } from "../actions/errorActions";
import { connect } from "react-redux";

import styled from "styled-components";
import { layoutVertical } from "../styles/layout";

import Modal from "./modal";
import Title from "./inputs/title";

const Container = styled.div`
  ${layoutVertical}

  min-width: 212px;
`;

function ErrorMessage(props) {
  function keydownHandler(e) {
    if (e.which === 13) {
      props.errorClosePanel();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  });

  return (
    <Modal isOpen={props.error.showPanel}>
      <Container>
        <Title>{props.error.message}</Title>
      </Container>
    </Modal>
  );
}

const mapStatetoProps = (state) => ({
  error: state.error,
});

export default connect(mapStatetoProps, { errorClosePanel })(ErrorMessage);
