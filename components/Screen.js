import React, { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Creates a resizable image screen.
 * @param {Number} num - Index of the image in the array
 * @param {String} src - Image URL
 * @param {Boolean} screen - Checks if the image is a screen or a regular image
 * @returns
 */
const Screen = ({ num, src, screen = true }) => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);

  // Gets the image's actual width and height if it's not in the gallery.
  useEffect(() => {
    if (screen) {
      const url = new URL(src);
      setWidth(url.searchParams.get("w"));
      setHeight(url.searchParams.get("h"));
    }
  }, []);

  return (<div>
    {src
      ? <Image src={src} width={width} height={height} alt={`Image ${num}`}
        placeholder="blur" className="screen"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUUpCqBwABhQDVMfwd+AAAAABJRU5ErkJggg==" />
      : <p>Image did not load</p>}
  </div>);
};

export default Screen;
