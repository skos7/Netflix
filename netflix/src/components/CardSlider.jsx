import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";
import { Grid } from "@mui/material";

export default React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    const cardWidth = 230; // Width of each card
    const wrapperWidth = listRef.current.offsetWidth; // Width of the slider wrapper
    const maxSliderPosition = Math.floor(wrapperWidth / cardWidth) - 1; // Maximum slider position

    let newPosition = sliderPosition;

    if (direction === "left" && sliderPosition > 0) {
      newPosition = sliderPosition - 1;
    }

    if (direction === "right" && sliderPosition < maxSliderPosition) {
      newPosition = sliderPosition + 1;
    }

    const distance = newPosition * cardWidth * -1;
    listRef.current.style.transform = `translateX(${distance}px)`;
    setSliderPosition(newPosition);
  };

  return (
    <Grid
      container
      direction="column"
      className="slider-container"
      sx={{
        position: "relative",
        padding: "2rem 0",
        gap: "1rem",
        h1: {
          marginLeft: "50px",
        },
        ".wrapper": {
          ".slider": {
            width: "max-content",
            gap: "1rem",
            transform: "translateX(0px)",
            transition: "0.3s ease-in-out",
            marginLeft: "50px",
          },
          ".slider-action": {
            position: "absolute",
            zIndex: 99,
            height: "100%",
            top: 0,
            bottom: 0,
            width: "50px",
            transition: "0.3s ease-in-out",
            svg: {
              fontSize: "2rem",
            },
          },
          ".none": {
            display: "none",
          },
          ".left": {
            left: 0,
          },
          ".right": {
            right: 0,
          },
        },
      }}
      // showControls={showControls ? "true" : "false"}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <Grid container className="wrapper">
        <Grid
          item
          className={`slider-action left ${!showControls ? "none" : ""} flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </Grid>
        <Grid item className="slider flex" ref={listRef}>
          {data.map((movie) => (
            <Card movieData={movie} key={movie.id} />
          ))}
        </Grid>
        <Grid
          item
          className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </Grid>
      </Grid>
    </Grid>
  );
});
