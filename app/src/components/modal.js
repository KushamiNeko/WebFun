import styled from "styled-components";

import { layoutHorizontal, layoutAroundJustified } from "../styles/layout";

const ModalBackground = styled.div`
  ${layoutHorizontal}
  ${layoutAroundJustified}

  display: ${(props) => (props.isOpen ? "flex" : "none")};

  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: #263238bb;
`;

const Content = styled.div`
  background-color: var(--paper-indigo-400);
  border-radius: 1.5em;
  margin: auto;
  padding: 1em;
  height: min-content;
`;

function Modal(props) {
  return (
    <ModalBackground isOpen={props.isOpen}>
      <Content>
        modal
        {props.children}
      </Content>
    </ModalBackground>
  );
}

export default Modal;
