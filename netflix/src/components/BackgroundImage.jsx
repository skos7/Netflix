import React from "react";
import { Grid } from "@mui/material";
import background from "../assets/login.jpg";

export default function BackgroundImage() {
  return (
    <Grid
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <img
        src={background}
        alt="background"
        sx={{
          height: "100vh",
          width: "100vw",
          objectFit: "cover",
        }}
      />
    </Grid>
  );
}
