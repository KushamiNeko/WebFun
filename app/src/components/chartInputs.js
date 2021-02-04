import React, { useState, useRef, useEffect } from "react";

import { connect } from "react-redux";

import LabelInput from "./inputs/labelInput";
import CheckButton from "./inputs/checkButton";
import Button from "./inputs/button";
import Separator from "./inputs/separator";
import OptionTableSet from "./inputs/optionTableSet";

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
      let date = inputs.date;
      if (date.length === 4) {
        date = `${date}1231`;
      }

      props.chartSetInputs(
        state.currentSetItems[state.selectedItemIndex],
        //inputs.date,
        date,
        inputs.freq,
        inputs.book
      );
    }
  }

  function lastDateOfMonth(month) {
    switch (month) {
      case 1:
        return 31;
      case 2:
        return 28;
      case 3:
        return 31;
      case 4:
        return 30;
      case 5:
        return 31;
      case 6:
        return 30;
      case 7:
        return 31;
      case 8:
        return 31;
      case 9:
        return 30;
      case 10:
        return 31;
      case 11:
        return 30;
      case 12:
        return 31;
      default:
        throw new Error(`invalid month: ${month}`);
    }
  }

  function keydownHandler(e) {
    if (e === null) {
      return;
    }

    if (props.chart.isWorking) {
      return;
    }

    if (props.info.showPanel) {
      return;
    }

    if (e.which !== 32 && props.trade.showPanel) {
      return;
    }

    if (
      e.which !== 13 &&
      (focused.current.date || focused.current.freq || focused.current.book)
    ) {
      return;
    }

    let index;
    switch (e.which) {
      case 188:
        // <

        changeSet(-1);
        break;

      case 190:
        // >

        changeSet(1);
        break;

      case 38:
        // up

        if (state.selectedItemIndex === null) {
          return;
        }

        index = state.selectedItemIndex - 1;
        if (index < 0) {
          index = state.currentSetItems.length - 1;
        }

        setSelectedItemIndex(index);
        break;

      case 40:
        // down

        if (state.selectedItemIndex === null) {
          return;
        }

        index = state.selectedItemIndex + 1;
        if (index > state.currentSetItems.length - 1) {
          index = 0;
        }

        setSelectedItemIndex(index);
        break;

      case 37:
        // left

        if (e.shiftKey || e.ctrlKey || e.altKey) {
          let date;
          if (e.shiftKey && e.ctrlKey) {
            const inputsDate = new Date(
              parseInt(inputs.date.substring(0, 4)),
              parseInt(inputs.date.substring(4, 6)) - 1,
              parseInt(inputs.date.substring(6, 8))
            );
            if (inputsDate.getDay() === 1) {
              inputsDate.setDate(inputsDate.getDate() - 3);
            } else {
              inputsDate.setDate(inputsDate.getDate() - 1);
            }
            date = `${inputsDate.getFullYear()}${(inputsDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}${inputsDate
              .getDate()
              .toString()
              .padStart(2, "0")}`;
          } else if (e.shiftKey) {
            date = `${
              parseInt(inputs.date.substring(0, 4)) - 1
            }${inputs.date.substring(4)}`;
          } else if (e.ctrlKey) {
            let y = parseInt(inputs.date.substring(0, 4));
            let m = parseInt(inputs.date.substring(4, 6));

            m -= 1;
            if (m < 1) {
              m = 12;
              y -= 1;
            }

            date = `${y}${m.toString().padStart(2, "0")}${lastDateOfMonth(m)
              .toString()
              .padStart(2, "0")}`;
          } else if (e.altKey) {
            //date = `${parseInt(inputs.date.substring(0, 4)) - 1}1231`;
          }

          props.chartSetInputs(
            state.currentSetItems[state.selectedItemIndex],
            date,
            inputs.freq,
            inputs.book
          );
        } else {
          props.chartBackward();
        }
        break;

      case 39:
        // right

        if (e.shiftKey || e.ctrlKey || e.altKey) {
          let date;
          if (e.shiftKey && e.ctrlKey) {
            const inputsDate = new Date(
              parseInt(inputs.date.substring(0, 4)),
              parseInt(inputs.date.substring(4, 6)) - 1,
              parseInt(inputs.date.substring(6, 8))
            );
            if (inputsDate.getDay() === 5) {
              inputsDate.setDate(inputsDate.getDate() + 3);
            } else {
              inputsDate.setDate(inputsDate.getDate() + 1);
            }
            date = `${inputsDate.getFullYear()}${(inputsDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}${inputsDate
              .getDate()
              .toString()
              .padStart(2, "0")}`;
          } else if (e.shiftKey) {
            date = `${
              parseInt(inputs.date.substring(0, 4)) + 1
            }${inputs.date.substring(4)}`;
          } else if (e.ctrlKey) {
            let y = parseInt(inputs.date.substring(0, 4));
            let m = parseInt(inputs.date.substring(4, 6));

            m += 1;
            if (m > 12) {
              m = 1;
              y += 1;
            }

            date = `${y}${m.toString().padStart(2, "0")}${lastDateOfMonth(m)
              .toString()
              .padStart(2, "0")}`;
          } else if (e.altKey) {
            //date = `${parseInt(inputs.date.substring(0, 4))}1231`;
          }

          const now = new Date();

          const dateNow = `${now.getFullYear()}${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;

          if (parseInt(date) > parseInt(dateNow)) {
            date = dateNow;
          }

          props.chartSetInputs(
            state.currentSetItems[state.selectedItemIndex],
            date,
            inputs.freq,
            inputs.book
          );
        } else {
          props.chartForward();
        }
        break;

      case 71:
        // g

        setInputs({
          ...inputs,
          freq: "30m",
        });
        props.chartSetFrequency("30m");
        break;

      case 72:
        // h

        setInputs({
          ...inputs,
          freq: "h",
        });
        props.chartSetFrequency("h");
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
        if (e.which >= 48 && e.which <= 57) {
          // number keys 48: 0, 49-57 : 1-9

          keyStroke.current += (e.which - 48).toString();

          setTimeout(() => {
            if (keyStroke.current !== "") {
              setSelectedItemIndex(parseInt(keyStroke.current) - 1);
            }

            keyStroke.current = "";
          }, 250);
        }
    }

    //e.preventDefault();
  }

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  });

  useEffect(() => {
    if (props.chart.quote.date) {
      setInputs({
        ...inputs,
        date: props.chart.quote.date,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chart.quote]);

  return (
    <SideBar>
      <OptionTableSet
        multiSet
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
        regex="^(?:[0-9]{8}|[0-9]{4})$"
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
        regex="^(?:[hdwm]{1}|30m)$"
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
  info: state.info,
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
