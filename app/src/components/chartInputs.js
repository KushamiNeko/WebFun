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
} from "../actions/chartActions";

const now = new Date();

function ChartInputs(props) {
  const [state, setState] = useState({
    currentSetIndex: 0,
    currentSetItems: Object.values(props.symbols)[0],
    selectedItemIndex: 0,
  });

  const inputs = useRef({
    date: "",
    freq: "d",
    book: "",
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

  //  function makeInputsRequest(e) {
  //    if (e === null || e.which !== 13) {
  //      return;
  //    }
  //
  //    // if (state.symbolID === null) {
  //    //   return;
  //    // }
  //
  //    // if (state.error.date || state.error.freq || state.error.book) {
  //    //   return;
  //    // }
  //    if (error.date || error.frequency || error.book) {
  //      return;
  //    }
  //
  //    //chartRequest();
  //
  //    // inputsRequest(
  //    //   dateRef.current.value,
  //    //   state.symbols[state.symbolID],
  //    //   freqRef.current.value,
  //    //   bookRef.current.value
  //    // );
  //  }

  function changeSet(index) {
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
    if (index < 0 || index >= state.currentSetItems.length) {
      return;
    }

    if (props.chart.isWorking) {
      return;
    }

    setState({
      ...state,
      selectedItemIndex: index,
    });

    props.chartSetSymbol(state.currentSetItems[index]);
  }

  function keydownHandler(e) {
    if (e === null) {
      return;
    }

    if (props.chart.isWorking) {
      return;
    }

    if (focused.current.date || focused.current.freq || focused.current.book) {
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
            //props.chartSetFrequency("h");
            break;
          case 68:
            // d
            inputs.current.freq = "d";
            props.chartSetFrequency("d");
            break;
          case 87:
            // w
            inputs.current.freq = "w";
            props.chartSetFrequency("w");
            break;
          case 77:
            // m
            props.chartSetFrequency("m");
            break;
          case 13:
            // enter
            break;
          case 32:
            // space
            break;
          default:
            break;
        }
      }
    }
  }

  useEffect(() => {
    props.chartSetInputs(
      state.currentSetItems[state.selectedItemIndex],
      inputs.current.date,
      inputs.current.freq,
      inputs.current.book
    );
  }, []);

  useEffect(() => {
    console.log("chart inputs");

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [state]);

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

      <Button> random date </Button>

      <LabelInput
        label="Date"
        regex="^[0-9]{8}$"
        value={`${now.getFullYear()}${(now.getMonth() + 1)
          .toString()
          .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`}
        onFocus={() => (focused.current.date = true)}
        onBlur={() => (focused.current.date = false)}
        onKeyDown={() => {}}
        onChange={(value) => {
          inputs.current.date = value;
        }}
        onError={(err) => {
          errors.current.date = err;
        }}
      />

      <LabelInput
        label="Frequency"
        regex="^[dw]{1}$"
        value={inputs.current.freq}
        onFocus={() => (focused.current.freq = true)}
        onBlur={() => (focused.current.freq = false)}
        onKeyDown={() => {}}
        onChange={(value) => {
          inputs.current.freq = value;
        }}
        onError={(err) => {
          errors.current.freq = err;
        }}
      />

      <LabelInput
        label="Book"
        regex="^[0-9a-zA-Z]+$"
        value="01"
        onFocus={() => (focused.current.book = true)}
        onBlur={() => (focused.current.book = false)}
        onKeyDown={() => {}}
        onChange={(value) => {
          inputs.current.book = value;
        }}
        onError={(err) => {
          errors.current.book = err;
        }}
      />

      <CheckButton
        onCheck={(active) => {
          props.chartSetShowRecords(active);
        }}
      >
        {" "}
        show records{" "}
      </CheckButton>

      <Separator />

      <Button
        onClick={() => {
          if (
            errors.current.date ||
            errors.current.freq ||
            errors.current.book
          ) {
            console.error("inputs error");
          } else {
            props.chartSetInputs(
              state.currentSetItems[state.selectedItemIndex],
              inputs.current.date,
              inputs.current.freq,
              inputs.current.book
            );
          }
        }}
      >
        ok
      </Button>
    </SideBar>
  );
}

const mapStatetoProps = (state) => ({
  symbols: state.symbols,
  chart: state.chart,
});

export default connect(mapStatetoProps, {
  chartSetSymbol,
  chartSetFrequency,
  chartSetShowRecords,
  chartSetInputs,
  chartForward,
  chartBackward,
})(ChartInputs);
