import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container, Grid,
  ImageList, ImageListItem, ImageListItemBar
} from "@material-ui/core";

import Screen from "../components/Screen";
import { description } from "platform";

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
      for (let i = 0; i < initialImages; i++) {
        const image = await getImage();
        setImages(images => [...images, image]);
      }
    }

    loadImages();
  }, []);

  return <>
    <Head>
      <meta charSet="utf-8" />

      <title>Resizable Screens</title>
      <meta name="description" content="Demo of images/screens that can be moved, resized, and removed." />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Container>
      <Grid container spacing={3} id="canvas">
        <Grid item xs={12} sm={3} component={"section"} id="gallery">
          <ImageList cols={1} variant="masonry" gap={8}>
            {(images.length > 0)
              ? images.map((image, index) => <ImageListItem key={image}>
                <Screen key={index} num={index} src={image} />

                <ImageListItemBar title={`Screen ${index + 1}`} />
                </ImageListItem>)
              : <p>Images will be loaded here.</p>}
          </ImageList>
        </Grid>

        <Grid item xs={12} sm={9} component={"section"}>
          {(screenList.length > 0)
            ? screenList.map((image, index) => <Screen key={index} num={index} src={image} />)
            : <p>Screens will be displayed here.</p>}
        </Grid>
      </Grid>
    </Container>
  </>
}

export default HomePage;
