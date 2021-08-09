import React, { useState, useEffect } from "react";
import Image from "next/image";
import reactable from "reactablejs";

/**
 * Creates a resizable image screen.
 * @param {Object} props
 * @returns an image screen
 */
const ScreenImage = (props) => {
  const { src, w, h, x, y, num, getRef } = props;

  return (<div className="screen" ref={getRef}>
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

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);

  return (<Reactable
    num={num} x={x} y={y} src={url} w={width} h={height}
    draggable
    onDragMove={event => {
      const { dx, dy, target } = event;
      const posX = (parseFloat(target.getAttribute("data-x")) || 0) + dx;
      const posY = (parseFloat(target.getAttribute("data-y")) || 0) + dy;

      setX(posX);
      setY(posY);

      target.style.transform = `translate(${posX}px, ${posY}px)`;
      target.setAttribute("data-x", posX);
      target.setAttribute("data-y", posY);
    }}

  />)
};

export default Screen;
