import { useState, useEffect } from "react";

import { connect } from "react-redux";

import { tradeReadAllBooks } from "../actions/tradeActions";

import SideBar from "./sidebar";
import OptionTableSet from "./inputs/optionTableSet";
import Button from "./inputs/button";
import Separator from "./inputs/separator";
import LabelInput from "./inputs/labelInput";

function StatisticInputs(props) {
  const [state, setState] = useState({
    books: [],
    selected: [],
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

      <Button>all</Button>
      <Button>clear</Button>

      <Separator />

      <LabelInput
        label="Start Date"
        regex="^[0-9]{8}$"
        value=""
        onFocus={() => {}}
        onBlur={() => {}}
        onKeyDown={() => {}}
        onValueChange={(value) => {
        }}
        onError={(err) => {
        }}
      />

      <LabelInput
        label="End Date"
        regex="^[0-9]{8}$"
        value=""
        onFocus={() => {}}
        onBlur={() => {}}
        onKeyDown={() => {}}
        onValueChange={(value) => {
        }}
        onError={(err) => {
        }}
      />

      <Button>ok</Button>
    </SideBar>
  );
}

const mapStatetoProps = (state) => ({
  trade: state.trade,
});

export default connect(mapStatetoProps, {
  tradeReadAllBooks,
})(StatisticInputs);
