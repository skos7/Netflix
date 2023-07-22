import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Dialog, Grid, Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default React.memo(function Card({ movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [trailerKey, setTrailerKey] = useState(false);

  // onAuthStateChanged(firebaseAuth, (currentUser) => {
  //   if (currentUser) {
  //     setEmail(currentUser.email);
  //   } else navigate("/login");
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate('/login');
      }
    });
    return () => {
      unsubscribe(); // Clean up the subscription when the component unmounts
    };
  }, []);

  const addToList = async () => {
    try {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);

      const movieExists = movies?.some((savedMovie) => savedMovie.id === movieData.id);
      if (movieExists) {
        // Movie is already saved
        toast.error('Movie is already saved.', { autoClose: 1000 });
        return;
      }

      // Movie is not saved, proceed with adding to the list
      await axios.post('http://localhost:5000/api/user/add', {
        email,
        data: movieData,
      });

      // Movie added successfully
      toast.success('Movie added to your list.', { autoClose: 1000 });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=d47ac7bc04beb278dd02c17f20a2c190`)
      .then((response) => {
        const trailers = response.data.results;
        const officialTrailers = trailers.filter((result) => result.site === 'YouTube' && result.type === 'Trailer');

        if (officialTrailers.length > 0) {
          const trailerKey = officialTrailers[0].key;
          setTrailerKey(trailerKey);
        } else {
          alert('No official YouTube trailer available.');
        }
      })
      .catch((error) => {
        console.log('Error fetching movie trailers:', error);
      });
  };

  const handleCloseClick = () => {
    console.log('Close button clicked');
    setTimeout(() => {
      setTrailerKey(null);
    }, 1000); // 1000 milliseconds = 1 seconds
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {trailerKey && (
        <Dialog
          open={!!trailerKey}
          onClose={() => setTrailerKey(null)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: 'black',
              opacity: 2,
            },
          }}
          BackdropProps={{
            style: {
              backgroundColor: 'transparent',
            },
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
            onClick={handleCloseClick}
          >
            <CloseIcon />
          </IconButton>
          <iframe
            width="1200px"
            height="1200px"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Dialog>
      )}
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <Grid className="hover">
          <Grid className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() => navigate("/player")}
            />
            <video
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              autoPlay={true}
              loop
              muted
              onClick={handlePlayClick}
            />
          </Grid>
          <Grid className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <Grid className="icons flex j-between">
              <Grid className="controls flex">
                <Tooltip title="Play" >
                  <PlayCircleOutlineIcon
                    onClick={handlePlayClick} // Call the handlePlayClick function here
                  />
                </Tooltip>
                <Tooltip title="Like">
                  <ThumbUpAltOutlinedIcon />
                </Tooltip>
                <Tooltip title="Dislike">
                  <ThumbDownOutlinedIcon />
                </Tooltip>
                {isLiked ? (
                  <Tooltip title="Remove from List">
                    <RemoveIcon
                      onClick={() =>
                        dispatch(
                          removeMovieFromLiked({ movieId: movieData.id, email })
                        )
                      }
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Add to my list">
                    <AddIcon onClick={addToList} />
                  </Tooltip>
                )}
              </Grid>
              <Grid className="info">     
              <Tooltip title="More info">
                  <a
                    href={`https://www.themoviedb.org/movie/${movieData.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <InfoOutlinedIcon />
                  </a>
                </Tooltip>          
              </Grid>
            </Grid>
            <Grid className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 270px;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 35rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 340px;
      img {
        width: 100%;
        height: 340px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 340px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
