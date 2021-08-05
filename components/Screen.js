import React, { useState, useEffect } from "react";
import Image from "next/image";

const Screen = ({ num, src }) => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  console.log(src);

  return (<div>
    {src
      ? <Image src={src} width={width} height={height} alt={`Screen ${num}`}
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        onResize={() => console.log("Resize images")} />
      : <p>Image did not load</p>}
  </div>);
};

export default Screen;
