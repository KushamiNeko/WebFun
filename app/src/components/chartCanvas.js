import React, { useEffect, useRef, useState } from "react";

import { connect } from "react-redux";
import {
  chartImageRequest,
  chartInspectRequest,
  chartSetInspect,
} from "../actions/chartActions";

import styled from "styled-components";

import { fontSubhead, fontBody1 } from "../styles/typography";
import { layout } from "../styles/layout";
import { noselect, willChange } from "../styles/common";

const Container = styled.div``;

const ChartContainer = styled.div`
  ${layout}
  ${noselect}
  ${willChange("opacity", "0.075s")}
`;

const ChartInfo = styled.div`
  ${fontSubhead}
  @media (max-width: var(--media-max-width)) {
    ${fontBody1}
  }

  ${noselect}

  display: ${(props) => (props.active ? "block" : "none")};

  padding: 8px 16px 8px 16px;
  border-radius: 16px;

  white-space: pre;
  position: absolute;
  z-index: 2;
  color: white;
  opacity: var(--dark-primary-opacity);
  background-color: rgba(0, 0, 0, 0.5);
`;
//${transitionLiteral("top 0.05s ease, left 0.05s ease")}
//left: 25%;

const ChartCover = styled.canvas`
  ${noselect}
  position: absolute;
  top: auto;

  z-index: 1;
`;

const ChartImage = styled.img`
  max-width: 99%;
  max-height: 100%;
`;

const coverColor = "rgba(0, 0, 0, 0.8)";
const inspectColor = "rgba(255, 255, 255, 0.8)";
const anchorColor = "rgba(255, 255, 255, 0.5)";

function ChartCanvas(props) {
  const [state, setState] = useState({
    showInfo: false,
  });

  const infoRef = useRef(null);

  const inspectRef = useRef(null);
  const coverRef = useRef(null);

  const imageRef = useRef(null);

  const inspectCursor = useRef({
    x: 0,
    y: 0,
  });

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
        drawAnchor.current.anchorX,
        0,
        coverRef.current.width - drawAnchor.current.anchorX,
        coverRef.current.height
      );
    }
  }

  function inspectInfo(e) {
    props.chartSetInspect();

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

    inspectCursor.current.x = x;
    inspectCursor.current.y = y;

    if (drawAnchor.current.active) {
      const ax = Math.max(
        Math.min(drawAnchor.current.anchorX / inspectRef.current.width, 1),
        0
      );

      const ay = Math.max(
        Math.min(
          (inspectRef.current.height - drawAnchor.current.anchorY) /
            inspectRef.current.height,
          1
        ),
        0
      );

      props.chartInspectRequest(
        (data) => {
          infoRef.current.innerHTML = data;
        },
        x,
        y,
        ax,
        ay
      );
    } else {
      props.chartInspectRequest(
        (data) => {
          infoRef.current.innerHTML = data;
        },
        x,
        y
      );
    }

    const offset = 35;

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
    ictx.moveTo(drawAnchor.current.anchorX, 0);

    ictx.lineTo(drawAnchor.current.anchorX, inspectRef.current.height);

    ictx.stroke();
    ictx.closePath();

    ictx.beginPath();

    ictx.moveTo(0, drawAnchor.current.anchorY);

    ictx.lineTo(inspectRef.current.width, drawAnchor.current.anchorY);

    ictx.stroke();
    ictx.closePath();
  }

  function handlerUp() {
    drawCover.current.left = false;
    drawCover.current.right = false;
    drawCover.current.both = false;

    drawAnchor.current.active = false;
  }

  function handlerMove(e) {
    if (!state.showInfo) {
      setState({ ...state, showInfo: true });
    }

    inspectInfo(e);

    if (drawCover.current.both) {
      doubleCover(e);
    } else if (drawCover.current.left) {
      singleCoverL(e);
    } else if (drawCover.current.right) {
      singleCoverR(e);
    }

    inspect(e);

    if (drawAnchor.current.active) {
      calcAnchor(e);
    }
  }

  function handlerDown(e) {
    const ictx = inspectRef.current.getContext("2d");
    const cctx = coverRef.current.getContext("2d");

    ictx.clearRect(0, 0, inspectRef.current.width, inspectRef.current.height);
    cctx.clearRect(0, 0, inspectRef.current.width, inspectRef.current.height);

    drawCover.current.left = false;
    drawCover.current.right = false;
    drawCover.current.both = false;

    if (e.ctrlKey) {
      drawCover.current.left = true;
    } else if (e.shiftKey) {
      drawCover.current.right = true;
    } else if (e.altKey) {
      drawCover.current.both = true;
    }

    drawAnchor.current.active = true;
    drawAnchor.current.anchorX = eventXOffset(e);
    drawAnchor.current.anchorY = eventYOffset(e);

    if (state.showInfo) {
      setState({
        ...state,
        showInfo: false,
      });
    }
  }

  function keydownHandler(e) {
    if (props.info.showPanel) {
      return;
    }

    if (e.which === 78) {
      props.chartInspectRequest(
        (data) => {
          infoRef.current.innerHTML = data;
        },
        inspectCursor.current.x,
        inspectCursor.current.y,
        null,
        null,
        true
      );
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.showInfo]);

  useEffect(() => {
    props.chartImageRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    //props.chart.function,
    //props.chart.symbol,
    //props.chart.date,
    //props.chart.frequency,
    //props.chart.range,
    //props.chart.book,
    //props.chart.showRecords,
    //props.chart.parameters,
    props.chart.timestamp,
  ]);

  return (
    <>
      <Container>
        <ChartInfo ref={infoRef} active={state.showInfo}></ChartInfo>
        <ChartContainer>
          <ChartCover ref={inspectRef} />
          <ChartCover ref={coverRef} />
          <ChartImage ref={imageRef} src={props.chart.image} />
        </ChartContainer>
      </Container>
    </>
  );
}

const mapStatetoProps = (state) => ({
  symbols: state.symbols,
  chart: state.chart,
  info: state.info,
});

export default connect(mapStatetoProps, {
  chartImageRequest,
  chartInspectRequest,
  chartSetInspect,
})(ChartCanvas);
