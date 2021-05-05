import { connect } from "react-redux";

import styled from "styled-components";
import { layoutHorizontal, layoutAroundJustified } from "../styles/layout";

import Modal from "../components/modal";
//import Separator from "../components/inputs/separator";

import TradeInputs from "../components/tradeInputs";
import ChartRange from "../components/chartRange";
import ChartParameters from "../components/chartParameters";
//import ChartNote from "../components/chartNote";

const Container = styled.div`
  ${layoutHorizontal}
  ${layoutAroundJustified}
`;

function TradePanel(props) {
  return (
    <Modal isOpen={props.trade.showPanel}>
      <Container>
        <TradeInputs />
        <ChartRange />
        <ChartParameters />
      </Container>
    </Modal>
  );
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {})(TradePanel);
