import { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import { connect } from "react-redux";

import { layoutVertical } from "../styles/layout";

import { tradeNewMarketOrder } from "../actions/tradeActions";

import LabelInput from "./inputs/labelInput";
import Button from "./inputs/button";
import Title from "./inputs/title";
import Separator from "./inputs/separator";

const Container = styled.div`
  ${layoutVertical}
  min-width: 212px;
`;

function TradeInputs(props) {
  const [inputs, setInputs] = useState({
    book: "",
    symbol: "",
    date: "",
    price: "",
    leverage: "1",
    operation: "+",
  });

  const errors = useRef({
    book: false,
    symbol: false,
    date: false,
    price: false,
    leverage: false,
  });

  const focused = useRef({
    book: false,
    symbol: false,
    date: false,
    price: false,
    leverage: false,
    operation: false,
  });

  const leverageInput = useRef(null);

  useEffect(() => {
    if (
      !focused.current.book &&
      !focused.current.symbol &&
      !focused.current.date &&
      !focused.current.price &&
      !focused.current.operation
    ) {
      leverageInput.current.focus();
    }
  });

  useEffect(() => {
    if (props.chart.quote.date && props.chart.quote.close) {
      setInputs({
        ...inputs,
        symbol: props.chart.symbol.toUpperCase(),
        date: props.chart.quote.date,
        price: props.chart.quote.close,
        book: props.chart.book,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chart.quote, props.chart.symbol, props.chart.book]);

  return (
    <Container>
      <Title>Trade Inputs</Title>
      <Separator />

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

      <LabelInput
        label="Symbol"
        regex="^[0-9a-zA-Z]+$"
        value={inputs.symbol}
        onFocus={() => (focused.current.symbol = true)}
        onBlur={() => (focused.current.symbol = false)}
        onKeyDown={() => {}}
        onValueChange={(value) => {
          setInputs({
            ...inputs,
            symbol: value.trim().toUpperCase(),
          });
        }}
        onError={(err) => {
          errors.current.symbol = err;
        }}
      />

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
        label="Price"
        regex="^[0-9.]+$"
        value={inputs.price}
        onFocus={() => (focused.current.price = true)}
        onBlur={() => (focused.current.price = false)}
        onKeyDown={() => {}}
        onValueChange={(value) => {
          setInputs({
            ...inputs,
            price: value.trim(),
          });
        }}
        onError={(err) => {
          errors.current.price = err;
        }}
      />

      <LabelInput
        ref={leverageInput}
        label="Leverage"
        regex="^[0-9.]+$"
        value={inputs.leverage}
        onFocus={() => (focused.current.leverage = true)}
        onBlur={() => (focused.current.leverage = false)}
        onKeyDown={() => {}}
        onValueChange={(value) => {
          setInputs({
            ...inputs,
            leverage: value.trim(),
          });
        }}
        onError={(err) => {
          errors.current.leverage = err;
        }}
      />

      <Button
        onFocus={() => {
          focused.current.operation = true;
        }}
        onBlur={() => {
          focused.current.operation = false;
        }}
        onClick={() => {
          if (inputs.operation === "+") {
            setInputs({
              ...inputs,
              operation: "-",
            });
          } else {
            setInputs({
              ...inputs,
              operation: "+",
            });
          }
        }}
      >
        {inputs.operation === "+" ? "long" : "short"}
      </Button>

      <Separator />

      <Button
        onClick={() => {
          if (props.chart.isWorking) {
            return;
          }

          if (props.trade.isWorking) {
            return;
          }

          if (
            errors.current.book ||
            errors.current.symbol ||
            errors.current.date ||
            errors.current.price ||
            errors.current.leverage
          ) {
            console.error("inputs error");
          } else {
            props.tradeNewMarketOrder({
              book: inputs.book,
              symbol: inputs.symbol,
              datetime: inputs.date,
              price: inputs.price,
              leverage: inputs.leverage,
              operation: inputs.operation,
            });
          }
        }}
      >
        ok
      </Button>
    </Container>
  );
}

const mapStatetoProps = (state) => ({
  chart: state.chart,
  trade: state.trade,
});

export default connect(mapStatetoProps, {
  tradeNewMarketOrder,
})(TradeInputs);
