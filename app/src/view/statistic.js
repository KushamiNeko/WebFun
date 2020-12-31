import { connect } from "react-redux";

import styled from "styled-components";
import { layoutHorizontal } from "../styles/layout";

import StatisticInputs from "../components/statisticInputs";
import StatisticTable from "../components/statisticTable";

import Modal from "../components/modal";

const Container = styled.div`
  ${layoutHorizontal}
  height: 97%;
`;

function StatisticView(props) {
  return (
    <>
      <Container>
        <StatisticInputs />
        <StatisticTable />
      </Container>
    </>
  );
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {})(StatisticView);
