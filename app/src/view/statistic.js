import { connect } from "react-redux";

import styled from "styled-components";
import { layoutHorizontal } from "../styles/layout";

import StatisticInputs from "../components/statisticInputs";
import StatisticTable from "../components/statisticTable";
import ErrorMessage from "../components/errorMessage";

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

      <ErrorMessage />
    </>
  );
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {})(StatisticView);
