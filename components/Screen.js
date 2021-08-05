import React, { useState, useEffect } from "react";
import Image from "next/image";

const Screen = ({ num, src }) => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);

  // Gets the image's actual width and height.
  useEffect(() => {
    const url = new URL(src);
    setWidth(url.searchParams.get("w"));
    setHeight(url.searchParams.get("h"));
  }, []);

  return (<div>
    {src
      ? <Image src={src} width={width} height={height} alt={`Image ${num}`}
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUUpCqBwABhQDVMfwd+AAAAABJRU5ErkJggg==" />
      : <p>Image did not load</p>}
  </div>);
};

export default Screen;
