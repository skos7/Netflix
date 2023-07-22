import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";

function Netflix() {

  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  function openVideoTrailer() {
    const trailerKey = "HhesaQXLuRY";

    const iframeContainer = document.createElement("div");
    iframeContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  `;

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
    iframe.frameborder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.cssText = `
    width: 1000px;
    height: 650px;
  `;

    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    font-weight: bold;
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
  `;

    closeButton.addEventListener("click", () => {
      document.body.removeChild(iframeContainer);
    });

    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(closeButton);
    document.body.appendChild(iframeContainer);
  }


  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img
              src={MovieLogo}
              alt="Movie Logo"
              style={{ width: "1500px", height: "auto" }}
            />
          </div>
          <div className="buttons flex">
            <button onClick={openVideoTrailer} className="flex j-center a-center">
              <FaPlay />
              Play
            </button>
            <button
              className="flex j-center a-center"
              onClick={() => window.open("https://www.themoviedb.org/tv/1396-breaking-bad", "_blank")}
            >
              <AiOutlineInfoCircle />
              More Info
            </button>

          </div>
        </div>
      </div>
      <div id="video-trailer"></div> {/* Placeholder for the video trailer */}
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
      }
      
      button {
        font-size: 1.4rem;
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.5rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
        transition: 0.2s ease-in-out;
      
        &:hover {
          opacity: 0.8;
        }
      
        &:nth-of-type(2) {
          background-color: #e50914; /* Netflix red color */
          color: #fff;
          display: flex;
          align-items: center;
      
          svg {
            font-size: 1.8rem;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
`;
export default Netflix;
