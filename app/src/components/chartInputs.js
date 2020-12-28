import React, { useState, useRef, useEffect } from "react";

import { connect } from "react-redux";

import LabelInput from "./inputs/labelInput";
import CheckButton from "./inputs/checkButton";
import Button from "./inputs/button";
import Separator from "./inputs/separator";
import TableSet from "./inputs/tableSet";

import SideBar from "./sidebar";

import {
  chartSetSymbol,
  chartSetFrequency,
  chartSetShowRecords,
  chartSetInputs,
  chartForward,
  chartBackward,
  chartRandomDate,
} from "../actions/chartActions";

import { tradeShowPanel } from "../actions/tradeActions";

function ChartInputs(props) {
  const [state, setState] = useState({
    currentSetIndex: 0,
    currentSetItems: Object.values(props.symbols)[0],
    selectedItemIndex: 0,
  });

  const [inputs, setInputs] = useState({
    date: "",
    freq: "d",
    book: "01",
  });

  const errors = useRef({
    date: false,
    freq: false,
    book: false,
  });

  const focused = useRef({
    date: false,
    freq: false,
    book: false,
  });

  const keyStroke = useRef("");

  function changeSet(index) {
    if (props.chart.isWorking) {
      return;
    }

    let newIndex = state.currentSetIndex + index;
    let finalIndex = Object.keys(props.symbols).length - 1;

    if (newIndex < 0) {
      newIndex = finalIndex;
    }

    if (newIndex > finalIndex) {
      newIndex = 0;
    }

    const items = Object.values(props.symbols)[newIndex];

    props.chartSetSymbol(items[0]);

    setState({
      ...state,
      selectedItemIndex: 0,
      currentSetIndex: newIndex,
      currentSetItems: items,
    });
  }

  function setSelectedItemIndex(index) {
    if (props.chart.isWorking) {
      return;
    }

    if (index < 0 || index >= state.currentSetItems.length) {
      return;
    }

    setState({
      ...state,
      selectedItemIndex: index,
    });

    props.chartSetSymbol(state.currentSetItems[index]);
  }

  function makeInputsRequest() {
    if (errors.current.date || errors.current.freq || errors.current.book) {
      console.error("inputs error");
    } else {
      props.chartSetInputs(
        state.currentSetItems[state.selectedItemIndex],
        inputs.date,
        inputs.freq,
        inputs.book
      );
    }
  }

  function keydownHandler(e) {
    if (e === null) {
      return;
    }

    if (e.which !== 32 && props.trade.showPanel) {
      return;
    }

    if (props.chart.isWorking) {
      return;
    }

    if (
      e.which !== 13 &&
      (focused.current.date || focused.current.freq || focused.current.book)
    ) {
      return;
    }

    if (e.which === 38 || e.which === 40) {
      if (state.selectedItemIndex === null) {
        return;
      }

      let index;
      if (e.which === 38) {
        index = state.selectedItemIndex - 1;
        if (index < 0) {
          index = state.currentSetItems.length - 1;
        }
      } else if (e.which === 40) {
        index = state.selectedItemIndex + 1;
        if (index > state.currentSetItems.length - 1) {
          index = 0;
        }
      }

      setSelectedItemIndex(index);
    } else {
      if (e.which === 37) {
        props.chartBackward();
      } else if (e.which === 39) {
        props.chartForward();
      } else if (e.which >= 48 && e.which <= 57) {
        // number keys 48: 0, 49-57 : 1-9
        keyStroke.current += (e.which - 48).toString();

        setTimeout(() => {
          if (keyStroke.current !== "") {
            setSelectedItemIndex(parseInt(keyStroke.current) - 1);
          }

          keyStroke.current = "";
        }, 250);
      } else {
        //console.log(e.which);
        switch (e.which) {
          case 72:
            // h
            //setInputs({
            //...inputs,
            //freq: "h",
            //});
            //props.chartSetFrequency("h");
            break;
          case 68:
            // d
            setInputs({
              ...inputs,
              freq: "d",
            });
            props.chartSetFrequency("d");
            break;
          case 87:
            // w
            setInputs({
              ...inputs,
              freq: "w",
            });
            props.chartSetFrequency("w");
            break;
          case 77:
            // m
            setInputs({
              ...inputs,
              freq: "m",
            });
            props.chartSetFrequency("m");
            break;
          case 13:
            // enter
            makeInputsRequest();
            break;
          case 32:
            // space
            props.tradeShowPanel(!props.trade.showPanel);
            break;
          default:
            break;
        }
      }
    }
  }

  useEffect(() => {
    console.log("chart inputs init");

    const now = new Date();
    const date = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;

    props.chartSetInputs(
      state.currentSetItems[state.selectedItemIndex],
      date,
      inputs.freq,
      inputs.book
    );
  }, []);

  useEffect(() => {
    console.log("chart inputs listener");

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  });

  useEffect(() => {
    console.log("chart inputs quote");

    if (props.chart.quote.date) {
      setInputs({
        ...inputs,
        date: props.chart.quote.date,
      });
    }
  }, [props.chart.quote]);

  return (
    <SideBar>
      <TableSet
        label="Symbols"
        set={Object.keys(props.symbols)[state.currentSetIndex]}
        items={state.currentSetItems}
        selected={state.selectedItemIndex}
        onChangeSet={changeSet}
        onSelect={(index) => {
          setSelectedItemIndex(index);
        }}
        showNumber
      />

      <Separator />

      <Button
        onClick={() => {
          if (props.chart.isWorking) {
            return;
          }

          props.chartRandomDate();
        }}
      >
        random date
      </Button>

      <LabelInput
        label="Date"
        regex="^[0-9]{8}$"
        value={inputs.date}
        onFocus={() => (focused.current.date = true)}
        onBlur={() => (focused.current.date = false)}
        onKeyDown={() => {}}
        onValueChange={(value) => {
          setInputs({
            ...inputs,
            date: value.trim(),
          });
        }}
        onError={(err) => {
          errors.current.date = err;
        }}
      />

      <LabelInput
        label="Frequency"
        regex="^[hdwm]{1}$"
        value={inputs.freq}
        onFocus={() => (focused.current.freq = true)}
        onBlur={() => (focused.current.freq = false)}
        onKeyDown={() => {}}
        onValueChange={(value) => {
          setInputs({
            ...inputs,
            freq: value.trim(),
          });
        }}
        onError={(err) => {
          errors.current.freq = err;
        }}
      />

      <LabelInput
        label="Book"
        regex="^[0-9a-zA-Z]+$"
        value={inputs.book}
        onFocus={() => (focused.current.book = true)}
        onBlur={() => (focused.current.book = false)}
        onKeyDown={() => {}}
        onValueChange={(value) => {
          setInputs({
            ...inputs,
            book: value.trim(),
          });
        }}
        onError={(err) => {
          errors.current.book = err;
        }}
      />

      <CheckButton
        checked={props.chart.showRecords}
        onCheck={(active) => {
          if (props.chart.isWorking) {
            return;
          }

          props.chartSetShowRecords(active);
        }}
      >
        show records
      </CheckButton>
    </SideBar>
  );
}

const mapStatetoProps = (state) => ({
  symbols: state.symbols,
  chart: state.chart,
  trade: state.trade,
});

export default connect(mapStatetoProps, {
  chartSetSymbol,
  chartSetFrequency,
  chartSetShowRecords,
  chartSetInputs,
  chartForward,
  chartBackward,
  chartRandomDate,
  tradeShowPanel,
})(ChartInputs);
