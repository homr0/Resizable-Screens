import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";

import Screen from "../components/Screen";

const HomePage = () => {
  const initialImages = 32;
  const minW = 30;
  const minH = 30;
  const maxW = 1200;
  const maxH = 800;

  const [images, setImages] = useState([]);
  const [screenList, setScreenList] = useState([]);

  /**
   * Randomly generates a number from a range
   * @param {Number} min - Minimum number for the range
   * @param {Number} max - Maximum number for the range
   * @returns a random number in between a range
   */
  const random = (min, max) => Math.floor((Math.random() * (max -min)) + min);

  /**
   *Randomly generates an image.
   * @returns an image URL
   */
  const getImage = async () => {
    //  Fetches the image url with random width and height.
    const image = await fetch(`https://source.unsplash.com/random/${random(minW, maxW)}x${random(minH, maxH)}`);

    return image.url;
  };

  useEffect(() => {
    //  Loads an initial images.
    const loadImages = async () => {
      let arr = images;

      while (arr.length < initialImages) {
        const image = await getImage();
        arr.push(image);
        arr = Array.from(new Set(arr));
        setImages(arr);
      }
    }

    loadImages();
  }, []);

  return <Container>
    <Grid container>
      <Grid item xs={12}>
        <p>Item goes here</p>

        <p>Screen will go here</p>

        {(images.length > 0)
          ? images.map((image, index) => <Screen key={index} num={index} src={image} />)
          : <p>Add images here</p>}
      </Grid>
    </Grid>
  </Container>
}

export default HomePage;
