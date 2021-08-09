import React, { useState } from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import reactable from "reactablejs";

const useStyles = makeStyles({
  screen: {
    display: "inline-block",
    boxShadow: "0 4px 8px 4px rgba(0, 0, 0, 0.8)"
  }
});

/**
 * A component containing the image.
 * @param {Object} props - Image properties
 * @returns A node with an image
 */
const ScreenImage = (props) => {
  const { src, w, h, num, getRef } = props;

  const classes = useStyles();

  return (<div className={classes.screen} ref={getRef}>
    <Image src={src} width={w} height={h} alt={`Image ${num}`}placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
  </div>);
};

const Reactable = reactable(ScreenImage);

/**
 * The movable, resizable, and removable image component.
 * @param {Object} props Image properties
 * @returns A node with an image that can be moved around a canvas
 */
const Screen = (props) => {
  const { num, url, w, h } = props;

  const [size, setSize] = useState({ w: w, h: h });

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
      },

      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true
        }),
      ],
    }}

    resizable={{
      edges: { left: true, right: true, top: true, bottom: true },

      onmove: event => {
        const { target, rect, deltaRect } = event;
        const { width, height } = rect;
        const { left, top } = deltaRect;
        const { x, y } = target.dataset;

        const posX = (parseFloat(x) || 0) + left;
        const posY = (parseFloat(y) || 0) + top;

        target.style.transform = `translate(${posX}px, ${posY}px)`;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;

        target.dataset.x = posX;
        target.dataset.y = posY;

        setSize({ w: width, h: height });
      },

      modifiers: [
        interact.modifiers.restrictEdges({
          outer: "parent",
          endOnly: true,
        }),
      ]
    }}

    {...size}
  />)
};

export default Screen;
