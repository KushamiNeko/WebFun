import React, { useEffect, useRef, useState } from "react";

import { connect } from "react-redux";
import { chartRequest } from "../actions/chartActions";

import styled from "styled-components";

import { fontSubhead, fontBody1 } from "../styles/typography";
import { layout, layoutFlex10 } from "../styles/layout";
import { noselect, willChange, transitionLiteral } from "../styles/common";

const Container = styled.div`
  ${layoutFlex10}
`;

const ChartContainer = styled.div`
  ${layout}
  ${noselect}
  ${willChange("opacity", "0.075s")}

  color: red;
`;

const ChartInfo = styled.div`
  ${fontSubhead}
  @media (max-width: var(--media-max-width)) {
    ${fontBody1}
  }

  ${noselect}

  ${transitionLiteral("top 0.1s ease, left 0.1s ease")}

  display: ${(props) => (props.isMoving ? "block" : "none")};

  white-space: pre;
  position: absolute;
  z-index: 2;
  color: white;
  opacity: var(--dark-primary-opacity);
  background-color: rgba(255, 255, 255, 0);
`;

const ChartCover = styled.canvas`
  ${noselect}
  position: absolute;
  top: auto;

  z-index: 1;
`;

const ChartImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const coverColor = "rgba(0, 0, 0, 0.8)";
const inspectColor = "rgba(255, 255, 255, 0.8)";
const anchorColor = "rgba(255, 255, 255, 0.5)";

function ChartCanvas(props) {
  //const { inspectRequest, imageSrc } = useContext(ChartContext);

  const [state, setState] = useState({
    isMoving: false,
  });

  const infoRef = useRef(null);

  const inspectRef = useRef(null);
  const coverRef = useRef(null);

  const imageRef = useRef(null);

  const drawCover = useRef({
    left: false,
    right: false,
    both: false,
  });

  const drawAnchor = useRef({
    active: false,
    anchorX: 0,
    anchorY: 0,
  });

  //const variables = useRef({
  //left: false,
  //right: false,
  //both: false,
  //calc: false,
  //calcX: 0,
  //calcY: 0,
  //});

  function eventXOffset(e) {
    return e.clientX - imageRef.current.offsetLeft;
  }

  function eventYOffset(e) {
    return e.clientY - imageRef.current.offsetTop;
  }

  function initCanvasSize() {
    //inspectRef.current.width = Math.floor(imageRef.current.clientWidth) - 1;
    //inspectRef.current.height = Math.floor(imageRef.current.clientHeight) - 1;

    //coverRef.current.width = Math.floor(imageRef.current.clientWidth) - 1;
    //coverRef.current.height = Math.floor(imageRef.current.clientHeight) - 1;

    inspectRef.current.width = imageRef.current.clientWidth;
    inspectRef.current.height = imageRef.current.clientHeight;

    coverRef.current.width = imageRef.current.clientWidth;
    coverRef.current.height = imageRef.current.clientHeight;
  }

  function singleCoverR(e) {
    const cctx = coverRef.current.getContext("2d");

    cctx.clearRect(0, 0, coverRef.current.width, coverRef.current.height);
    cctx.fillStyle = coverColor;

    cctx.fillRect(
      eventXOffset(e),
      0,
      coverRef.current.width - eventXOffset(e),
      coverRef.current.height
    );
  }

  function singleCoverL(e) {
    const cctx = coverRef.current.getContext("2d");

    cctx.clearRect(0, 0, coverRef.current.width, coverRef.current.height);
    cctx.fillStyle = coverColor;

    cctx.fillRect(0, 0, eventXOffset(e), coverRef.current.height);
  }

  function doubleCover(e) {
    const cctx = coverRef.current.getContext("2d");

    cctx.clearRect(0, 0, coverRef.current.width, coverRef.current.height);
    cctx.fillStyle = coverColor;

    //if (eventXOffset(e) >= variables.current.calcX) {
    //cctx.fillRect(0, 0, variables.current.calcX, coverRef.current.height);

    if (eventXOffset(e) >= drawAnchor.current.anchorX) {
      cctx.fillRect(0, 0, drawAnchor.current.anchorX, coverRef.current.height);

      cctx.fillRect(
        eventXOffset(e),
        0,
        coverRef.current.width - eventXOffset(e),
        coverRef.current.height
      );
    } else {
      cctx.fillRect(0, 0, eventXOffset(e), coverRef.current.height);

      cctx.fillRect(
        //variables.current.calcX,
        drawAnchor.current.anchorX,
        0,
        //coverRef.current.width - variables.current.calcX,
        coverRef.current.width - drawAnchor.current.anchorX,
        coverRef.current.height
      );
    }
  }

  function inspectInfo(e) {
    const x = Math.max(
      Math.min(eventXOffset(e) / inspectRef.current.width, 1),
      0
    );

    const y = Math.max(
      Math.min(
        (inspectRef.current.height - eventYOffset(e)) /
          inspectRef.current.height,
        1
      ),
      0
    );

    //if (variables.current.calc) {
    if (drawAnchor.current.active) {
      const ax = Math.max(
        //Math.min(variables.current.calcX / inspectRef.current.width, 1),
        Math.min(drawAnchor.current.anchorX / inspectRef.current.width, 1),
        0
      );

      const ay = Math.max(
        Math.min(
          //(inspectRef.current.height - variables.current.calcY) /
          (inspectRef.current.height - drawAnchor.current.anchorY) /
            inspectRef.current.height,
          1
        ),
        0
      );

      //inspectRequest(
      //(data) => {
      //infoRef.current.innerHTML = data;
      //},
      //x,
      //y,
      //ax,
      //ay
      //);
    } else {
      //inspectRequest(
      //(data) => {
      //infoRef.current.innerHTML = data;
      //},
      //x,
      //y
      //);
    }

    const offset = 20;

    let l;
    if (eventXOffset(e) > inspectRef.current.width / 2) {
      l = `${e.clientX - infoRef.current.clientWidth - offset}px`;
    } else {
      l = `${e.clientX + offset}px`;
    }

    infoRef.current.style.left = l;

    let t;
    if (eventYOffset(e) > inspectRef.current.height / 2) {
      t = `${e.clientY - infoRef.current.offsetHeight - offset}px`;
    } else {
      t = `${e.clientY + offset}px`;
    }

    infoRef.current.style.top = t;
  }

  function inspect(e) {
    const ictx = inspectRef.current.getContext("2d");

    ictx.clearRect(0, 0, inspectRef.current.width, inspectRef.current.height);
    ictx.strokeStyle = inspectColor;

    ictx.beginPath();
    ictx.moveTo(eventXOffset(e), 0);

    ictx.lineTo(eventXOffset(e), inspectRef.current.height);

    ictx.stroke();
    ictx.closePath();

    ictx.beginPath();

    ictx.moveTo(0, eventYOffset(e));

    ictx.lineTo(inspectRef.current.width, eventYOffset(e));

    ictx.stroke();
    ictx.closePath();
  }

  function calcAnchor() {
    const ictx = inspectRef.current.getContext("2d");

    ictx.strokeStyle = anchorColor;

    ictx.beginPath();
    //ictx.moveTo(variables.current.calcX, 0);
    ictx.moveTo(drawAnchor.current.anchorX, 0);

    //ictx.lineTo(variables.current.calcX, inspectRef.current.height);
    ictx.lineTo(drawAnchor.current.anchorX, inspectRef.current.height);

    ictx.stroke();
    ictx.closePath();

    ictx.beginPath();

    //ictx.moveTo(0, variables.current.calcY);
    ictx.moveTo(0, drawAnchor.current.anchorY);

    //ictx.lineTo(inspectRef.current.width, variables.current.calcY);
    ictx.lineTo(inspectRef.current.width, drawAnchor.current.anchorY);

    ictx.stroke();
    ictx.closePath();
  }

  function handlerUp() {
    //variables.current.left = false;
    //variables.current.right = false;
    //variables.current.both = false;
    //variables.current.calc = false;

    drawCover.current.left = false;
    drawCover.current.right = false;
    drawCover.current.both = false;

    drawAnchor.current.active = false;
  }

  function handlerMove(e) {
    if (!state.isMoving) {
      setState({ ...state, isMoving: true });
    }

    inspectInfo(e);

    //if (variables.current.both) {
    //doubleCover(e);
    //} else if (variables.current.left) {
    //singleCoverL(e);
    //} else if (variables.current.right) {
    //singleCoverR(e);
    //}

    if (drawCover.current.both) {
      doubleCover(e);
    } else if (drawCover.current.left) {
      singleCoverL(e);
    } else if (drawCover.current.right) {
      singleCoverR(e);
    }

    inspect(e);

    //if (variables.current.calc) {
    //calcAnchor(e);
    //}

    if (drawAnchor.current.active) {
      calcAnchor(e);
    }
  }

  function handlerDown(e) {
    const ictx = inspectRef.current.getContext("2d");
    const cctx = coverRef.current.getContext("2d");

    ictx.clearRect(0, 0, inspectRef.current.width, inspectRef.current.height);
    cctx.clearRect(0, 0, inspectRef.current.width, inspectRef.current.height);

    //variables.current.left = false;
    //variables.current.right = false;
    //variables.current.both = false;

    drawCover.current.left = false;
    drawCover.current.right = false;
    drawCover.current.both = false;

    if (e.ctrlKey) {
      //variables.current.left = true;
      drawCover.current.left = true;
    } else if (e.shiftKey) {
      //variables.current.right = true;
      drawCover.current.right = true;
    } else if (e.altKey) {
      //variables.current.both = true;
      drawCover.current.both = true;
    }

    //variables.current.calc = true;
    //variables.current.calcX = eventXOffset(e);
    //variables.current.calcY = eventYOffset(e);

    drawAnchor.current.active = true;
    drawAnchor.current.anchorX = eventXOffset(e);
    drawAnchor.current.anchorY = eventYOffset(e);

    setState({
      ...state,
      isMoving: false,
    });
  }

  useEffect(() => {
    const imgLoaded = () => {
      initCanvasSize();
    };

    const imgRef = imageRef.current;

    imgRef.addEventListener("load", imgLoaded);

    window.addEventListener("resize", () => {
      initCanvasSize();
    });

    window.addEventListener("mouseup", handlerUp);
    window.addEventListener("mousemove", handlerMove);
    window.addEventListener("mousedown", handlerDown);

    return () => {
      imgRef.removeEventListener("load", imgLoaded);
      window.removeEventListener("mouseup", handlerUp);
      window.removeEventListener("mousemove", handlerMove);
      window.removeEventListener("mousedown", handlerDown);
    };
  });

  useEffect(() => {
    console.log("useEffect chart request");
    props.chartRequest();
  }, [
    props.chart.func,
    props.chart.symbol,
    props.chart.date,
    props.chart.freq,
    props.chart.book,
    props.chart.records,
    props.chart.x,
    props.chart.y,
    props.chart.ax,
    props.chart.ay,
    props.chart.parameters,
  ]);

  return (
    <>
      <ChartInfo ref={infoRef} isMoving={state.isMoving}>
        tsetsetsetsetsettstset
      </ChartInfo>
      <Container>
        <ChartContainer>
          <ChartCover ref={inspectRef} />
          <ChartCover ref={coverRef} />
          <ChartImage ref={imageRef} src="test.jpg" />
        </ChartContainer>
      </Container>
    </>
  );
}

const mapStatetoProps = (state) => ({
  symbols: state.symbols,
  chart: state.chart,
});

//export default ChartCanvas;
export default connect(mapStatetoProps, { chartRequest })(ChartCanvas);
