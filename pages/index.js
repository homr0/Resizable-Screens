import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Grid,
  ImageList, ImageListItem, ImageListItemBar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Screen from "../components/Screen";

const useStyles = makeStyles({
  canvas: {
    height: "100vh",
    overflow: "hidden"
  },

  gallery: {
    height: "100vh",
    overflowX: "hidden",
    overflowY: "scroll",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    textAlign: "center",
    padding: "0 !important"
  },

  galleryHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    color: "white",
    textAlign: "center",
    width: "100%"
  },

  screens: {
    position: "absolute"
  }
});

const HomePage = () => {
  const initialImages = 32;
  const minW = 30;
  const minH = 30;
  const maxW = 1200;
  const maxH = 800;

  const classes = useStyles();

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
    const w = random(minW, maxW);
    const h = random(minH, maxH);
    const image = await fetch(`https://source.unsplash.com/random/${w}x${h}`);

    return {
      url: image.url, w, h
    };
  };

  // Initial loading of images and interactables.
  useEffect(() => {
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

    <Grid container spacing={3} className={classes.canvas}>
      <Grid item xs={12} sm={3} id="gallery" className={classes.gallery}>
        <Grid container>
          <Grid item className={classes.galleryHeader}>
            <h1>Screen Gallery</h1>
          </Grid>
        </Grid>

        <ImageList cols={1} variant="masonry" gap={8} >
          {(images.length > 0)
            ? images.map((image, index) => <ImageListItem key={image.url}>
              <Image src={image.url} width={image.w} height={image.h}
                alt={`Image ${index}`} placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                onClick={() => setScreenList(screenList => [...screenList, image])} />

              <ImageListItemBar title={`Screen ${index + 1}`} />
              </ImageListItem>)
            : <p>Images will be loaded here.</p>}
        </ImageList>
      </Grid>

      <Grid item xs={12} sm={9} className={classes.screens}>
        {(screenList.length > 0)
          ? screenList.map((image, index) => <Screen key={index} num={index} {...image} />)
          : <p>Screens will be displayed here.</p>}
      </Grid>
    </Grid>
  </>
}

export default HomePage;
