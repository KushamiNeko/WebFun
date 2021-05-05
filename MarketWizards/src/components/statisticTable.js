import { connect } from "react-redux";

import styled from "styled-components";
import { horizontalMargin } from "./inputs/common";
import { noselect } from "../styles/common";
import { fontBody1 } from "../styles/typography";

import Title from "./inputs/title";
import Separator from "./inputs/separator";

const Container = styled.div``;

const Table = styled.table.attrs((props) => ({
  cellPadding: "0",
  cellSpacing: "0",
  aligh: "center",
}))`
  ${noselect}

  ${fontBody1}
  ${horizontalMargin}

  border-collapse: collapse;
  border: 1px solid white;

  color: white;

  padding-left: 0.25em;
  padding-right: 0.25em;

  margin-top: 0.5em;
`;

const TableCell = styled.th`
  width: 10em;
  text-align: left;
  border: 1px solid white;
  padding-left: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

function StatisticTable(props) {
  return (
    <Container>
      <Title>
        {props.trade.statistic["statistic_start"]}
        {` ~ `}
        {props.trade.statistic["statistic_end"]}
      </Title>
      <Separator width="97%" />
      <Table>
        <thead>
          <tr>
            <TableCell>Operation</TableCell>
            <TableCell>Number of Trades</TableCell>
            <TableCell>Batting Average</TableCell>
            <TableCell>Win Loss Ratio</TableCell>
            <TableCell>Adj Win Loss Ratio</TableCell>
            <TableCell>Win Holding Mean</TableCell>
            <TableCell>Loss Holding Mean</TableCell>
            <TableCell>Profit Mean</TableCell>
            <TableCell>Loss Mean</TableCell>
            <TableCell>Expected Value</TableCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell>All</TableCell>
            <TableCell>{props.trade.statistic["total_trades"]}</TableCell>
            <TableCell>{props.trade.statistic["batting_average"]}</TableCell>
            <TableCell>
              {props.trade.statistic["nominal_win_loss_ratio"]}
              <br />
              {props.trade.statistic["leveraged_win_loss_ratio"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["nominal_adjusted_win_loss_ratio"]}
              <br />
              {props.trade.statistic["leveraged_adjusted_win_loss_ratio"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["winners_holding_mean"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["losers_holding_mean"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["winners_nominal_pl_mean"]}
              <br />
              {props.trade.statistic["winners_leveraged_pl_mean"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["losers_nominal_pl_mean"]}
              <br />
              {props.trade.statistic["losers_leveraged_pl_mean"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["nominal_expected_value"]}
              <br />
              {props.trade.statistic["leveraged_expected_value"]}
            </TableCell>
          </tr>
          <tr>
            <TableCell>Long</TableCell>
            <TableCell>{props.trade.statistic["total_long_trades"]}</TableCell>
            <TableCell>
              {props.trade.statistic["batting_average_long"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["nominal_win_loss_ratio_long"]}
              <br />
              {props.trade.statistic["leveraged_win_loss_ratio_long"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["nominal_adjusted_win_loss_ratio_long"]}
              <br />
              {props.trade.statistic["leveraged_adjusted_win_loss_ratio_long"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["winners_holding_mean_long"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["losers_holding_mean_long"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["winners_nominal_pl_mean_long"]}
              <br />
              {props.trade.statistic["winners_leveraged_pl_mean_long"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["losers_nominal_pl_mean_long"]}
              <br />
              {props.trade.statistic["losers_leveraged_pl_mean_long"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["nominal_expected_value_long"]}
              <br />
              {props.trade.statistic["leveraged_expected_value_long"]}
            </TableCell>
          </tr>
          <tr>
            <TableCell>Short</TableCell>
            <TableCell>{props.trade.statistic["total_short_trades"]}</TableCell>
            <TableCell>
              {props.trade.statistic["batting_average_short"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["nominal_win_loss_ratio_short"]}
              <br />
              {props.trade.statistic["leveraged_win_loss_ratio_short"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["nominal_adjusted_win_loss_ratio_short"]}
              <br />
              {props.trade.statistic["leveraged_adjusted_win_loss_ratio_short"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["winners_holding_mean_short"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["losers_holding_mean_short"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["winners_nominal_pl_mean_short"]}
              <br />
              {props.trade.statistic["winners_leveraged_pl_mean_short"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["losers_nominal_pl_mean_short"]}
              <br />
              {props.trade.statistic["losers_leveraged_pl_mean_short"]}
            </TableCell>
            <TableCell>
              {props.trade.statistic["nominal_expected_value_short"]}
              <br />
              {props.trade.statistic["leveraged_expected_value_short"]}
            </TableCell>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {})(StatisticTable);
