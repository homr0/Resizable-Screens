import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";

import Screen from "../components/Screen";

const HomePage = () => {
  const randomImage = "https://source.unsplash.com/random";
  const [images, setImages] = useState([]);
  const [screenList, setScreenList] = useState([]);

  useEffect(() => {
    const getImage = async () => {
      const image = await fetch(randomImage);
      console.log(image.url);
      setImages(images => [...images, image.url]);
      console.log(images);
    }

    getImage();
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
