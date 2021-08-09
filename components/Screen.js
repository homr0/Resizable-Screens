import React, { useState } from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import reactable from "reactablejs";

const useStyles = makeStyles({
  screen: {
    display: "inline-block"
  }
});

const ScreenImage = (props) => {
  const { src, w, h, x, y, num, getRef } = props;

  const classes = useStyles();

  return (<div className={classes.screen} ref={getRef}>
    <Image src={src} width={w} height={h} alt={`Image ${num}`}placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />

    <p>
      X: {x}<br />
      Y: {y}<br />
      Width: {w}<br />
      Height: {h}
    </p>
  </div>);
};

const Reactable = reactable(ScreenImage);

const Screen = (props) => {
  const { num, url, w, h } = props;

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    w: w,
    h: h
  })

  return (<Reactable
    num={num} src={url}

    draggable={{
      onmove: event => {
        const { dx, dy, target } = event;
        const posX = (parseFloat(target.getAttribute("data-x")) || 0) + dx;
        const posY = (parseFloat(target.getAttribute("data-y")) || 0) + dy;

        target.style.transform = `translate(${posX}px, ${posY}px)`;
        target.setAttribute("data-x", posX);
        target.setAttribute("data-y", posY);

        setPos(coordinates => ({ ...coordinates, x: posX, y: posY }));
      },

      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
    }}

    {...pos}
  />)
};

export default Screen;
