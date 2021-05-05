import { connect } from "react-redux";

import styled from "styled-components";
import { layoutHorizontal } from "../styles/layout";

import StatisticInputs from "../components/statisticInputs";
import StatisticTable from "../components/statisticTable";
import InfoMessage from "../components/infoMessage";

const Container = styled.div`
  ${layoutHorizontal}
  height: 97%;
`;

function StatisticView() {
  return (
    <>
      <Container>
        <StatisticInputs />
        <StatisticTable />
      </Container>

      <InfoMessage />
    </>
  );
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {})(StatisticView);
