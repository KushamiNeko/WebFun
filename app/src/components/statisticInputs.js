import { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import {
  tradeReadAllBooks,
  tradeReadStatistic,
  tradeSetStatisticRange,
} from "../actions/tradeActions";

import SideBar from "./sidebar";
import OptionTableSet from "./inputs/optionTableSet";
import Button from "./inputs/button";
import Separator from "./inputs/separator";
import LabelInput from "./inputs/labelInput";

function StatisticInputs(props) {
  const [state, setState] = useState({
    books: [],
    selected: [],

    startDate: "",
    endDate: "",
  });

  const errors = useRef({
    startDate: false,
    endDate: false,
  });

  useEffect(() => {
    props.tradeReadAllBooks();
  }, []);

  useEffect(() => {
    setState({
      ...state,
      books: props.trade.books,
    });
  }, [props.trade.books]);

  useEffect(() => {
    if (state.selected.length === 0) {
      return;
    }

    const titles = [];

    state.selected.forEach((i) => {
      titles.push(state.books[i]);
    });

    props.tradeReadStatistic(titles);
  }, [state.selected, props.trade.startDate, props.trade.endDate]);

  return (
    <SideBar>
      <OptionTableSet
        multiSelect
        label="Books"
        selected={state.selected}
        items={state.books}
        onSelect={(index) => {
          if (!state.selected.includes(index)) {
            setState({
              ...state,
              selected: [...state.selected, index],
            });
          } else {
            const i = state.selected.indexOf(index);
            const newArray = [...state.selected];
            newArray.splice(i, 1);

            setState({
              ...state,
              selected: newArray,
            });
          }
        }}
      />

      <Button
        onClick={() => {
          const newArray = [];

          for (let i = 0; i < state.books.length; i++) {
            newArray.push(i);
          }

          setState({
            ...state,
            selected: newArray,
          });
        }}
      >
        all
      </Button>

      <Button
        onClick={() => {
          setState({
            ...state,
            selected: [],
          });
        }}
      >
        clear
      </Button>

      <Separator />

      <LabelInput
        label="Start Date"
        regex="^(?:[0-9]{8})?$"
        value={state.startDate}
        onFocus={() => {}}
        onBlur={() => {}}
        onKeyDown={() => {}}
        onValueChange={(value) => {
          setState({
            ...state,
            startDate: value,
          });
        }}
        onError={(err) => {
          errors.current.startDate = err;
        }}
      />

      <LabelInput
        label="End Date"
        regex="^(?:[0-9]{8})?$"
        value={state.endDate}
        onFocus={() => {}}
        onBlur={() => {}}
        onKeyDown={() => {}}
        onValueChange={(value) => {
          setState({
            ...state,
            endDate: value,
          });
        }}
        onError={(err) => {
          errors.current.endDate = err;
        }}
      />

      <Button
        onClick={() => {
          if (errors.current.startDate || errors.current.endDate) {
            console.error("invalid start date or end date");
            return;
          }

          props.tradeSetStatisticRange(state.startDate, state.endDate);
        }}
      >
        ok
      </Button>
    </SideBar>
  );
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {
  tradeReadAllBooks,
  tradeReadStatistic,
  tradeSetStatisticRange,
})(StatisticInputs);
