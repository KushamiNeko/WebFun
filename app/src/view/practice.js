//import React from "react";
//import ChartInputs from "../../components/chart_inputs/chart_input";
//import Canvas from "../../components/canvas/canvas";

import styled from "styled-components";
import { layoutHorizontal } from "../styles/layout";

import ChartInputs from "../components/chartInputs";
import ChartCanvas from "../components/chartCanvas";
import Modal from "../components/modal";

import ChartParameters from "../components/chartParameters";
import ChartRange from "../components/chartRange";

//import { ChartProvider } from "../../context/chart";

const Container = styled.div`
  ${layoutHorizontal}
  height: 97%;
`;

function PracticeView() {
  console.log("practice");

  return (
    <>
      <Container>
        <ChartInputs />
        <ChartCanvas />
      </Container>
      <Modal>
        <ChartParameters />
        <ChartRange />
      </Modal>
    </>
    //<div className={styles.content}>
    //<ChartProvider>
    //<Canvas />
    //</ChartProvider>
    //</div>
  );
}

export default PracticeView;
