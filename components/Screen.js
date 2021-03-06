import React, { useState } from "react";
import Image from "next/image";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import reactable from "reactablejs";
import { format } from "date-fns";

const useStyles = makeStyles({
  screen: {
    display: "inline-block",
    boxShadow: "0 4px 8px 4px rgba(0, 0, 0, 0.8)",
    minWidth: "30px",
    minHeight: "30px",
    position: "relative"
  },

  close: {
    position: "absolute",
    transform: "translate(-50px, 10px)",
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "rgba(255, 255, 255, 0.9)",
    cursor: "default",
    borderRadius: "50%"
  },

  timestamp: {
    textAlign: "right",
    padding: "0.5rem 0.5rem",
    margin: "-0.25rem 0",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    right: "0",
    bottom: "0"
  }
});

/**
 * A component containing the image.
 * @param {Object} props - Image properties
 * @returns A node with an image
 */
const ScreenImage = (props) => {
  const { src, w, h, num, getRef, remove } = props;

  const classes = useStyles();

  const [time, setTime] = useState(new Date());

  setInterval(() => setTime(new Date()), 1000);

  return (<div className={classes.screen} ref={getRef}>
    <Image src={src} width={w} height={h} alt={`Image ${num}`}placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />

    <Close onClick={remove} className={classes.close} />

    <p className={classes.timestamp}>{format(time, "yyyy-MM-dd HH:mm:ss xxx")}</p>
  </div>);
};

const Reactable = reactable(ScreenImage);

/**
 * The movable, resizable, and removable image component.
 * @param {Object} props Image properties
 * @returns A node with an image that can be moved around a canvas
 */
const Screen = (props) => {
  const { num, url, w, h, remove } = props;

  const [size, setSize] = useState({ w: w, h: h });

  return (<Reactable
    num={num} src={url} remove={remove}

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

        interact.modifiers.restrictSize({
          min: { width: 60, height: 60 }
        })
      ]
    }}

    {...size}
  />)
};

export default Screen;
