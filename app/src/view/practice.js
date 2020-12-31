import { connect } from "react-redux";

import styled from "styled-components";
import { layoutHorizontal } from "../styles/layout";

import ChartInputs from "../components/chartInputs";
import ChartCanvas from "../components/chartCanvas";
import Modal from "../components/modal";

import ChartParameters from "../components/chartParameters";
import ChartRange from "../components/chartRange";

import TradeInputs from "../components/tradeInputs";

const Container = styled.div`
  ${layoutHorizontal}
  height: 97%;
`;

function PracticeView(props) {
  return (
    <>
      <Container>
        <ChartInputs />
        <ChartCanvas />
      </Container>
      <Modal isOpen={props.trade.showPanel}>
        <TradeInputs />
        <ChartRange />
        <ChartParameters />
      </Modal>
    </>
  );
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {})(PracticeView);
