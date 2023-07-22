import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { Button, Grid, TextField } from "@mui/material";


function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling on mount

    return () => {
      document.body.style.overflow = 'auto'; // Enable scrolling on unmount
    };
  }, []);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Grid container sx={{ position: 'relative' }}>
      <BackgroundImage />
      <Grid
        item
        xs={12}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          height: '100vh',
          width: '100vw',
          display: 'grid',
          gridTemplateRows: '15vh 85vh',
        }}
      >
        <Header login />
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            gap: '1rem',
            textAlign: 'center',
            fontSize: '2rem',
          }}
        >
          <Grid item>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>Ready to watch? Enter your email to create or restart membership.</h6>
          </Grid>
          <Grid item container alignItems="center" justifyContent="center">
            <TextField
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
              sx={{
                backgroundColor: 'white',
                cursor: 'pointer',
                color: 'white',
                borderRadius: '0.4rem',
                fontWeight: 'bolder',
                fontSize: '1.0rem',
              }}
              InputProps={{
                style: {
                  backgroundColor: 'white',
                  color: 'black',
                  padding: '0.7rem 3rem',
                  borderRadius: '0.7rem',
                  border: 'none',
                },
              }}
            />

            {showPassword && (
              <TextField
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
                sx={{
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  color: 'white',
                  borderRadius: '0.4rem',
                  fontWeight: 'bolder',
                  fontSize: '1.0rem',
                }}
                InputProps={{
                  style: {
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '0.7rem 3rem',
                    borderRadius: '0.7rem',
                    border: 'none',
                  },
                }}
              />
            )}
            {!showPassword && (
              <Grid item container alignItems="center" justifyContent="center">
                <Button
                  onClick={() => setShowPassword(true)}
                  sx={{
                    backgroundColor: '#e50914',
                    borderRadius: '0.5rem',
                    transform: 'scale(0.8)',
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.05rem',
                    padding: '30px',
                    '&:hover': {
                      backgroundColor: '#e50914',
                      opacity: 1,
                    },
                  }}
                >
                  Get Started
                </Button>
              </Grid>
            )}
            {showPassword && (
              <Button
                onClick={handleSignIn}
                sx={{
                  padding: '1.5rem 7rem',
                  backgroundColor: '#e50914',
                  cursor: 'pointer',
                  color: 'white',
                  borderRadius: '0.2rem',
                  fontWeight: 'bolder',
                  fontSize: '1.0rem',
                  '&:hover': {
                    backgroundColor: '#e50914',
                    opacity: 1,
                  },
                }}
              >
                Log In
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}







export default Signup;
