import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
      toast.error(error.message);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container >
      <BackgroundImage />
      <Grid style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Header />
        <Grid container direction="column" alignItems="center"  >
          <Grid item>
            <Grid
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)', /* Black with 50% opacity */
                padding: '1rem 0.1rem',
                borderRadius: '5px',
              }}
            >
              <Grid container direction="column" style={{ marginTop: '3rem' }} >
                <Typography variant="h4" style={{ color: 'white', marginLeft: '15%', marginBottom: '3%' }}>
                  <strong>Login</strong>
                </Typography>
                <Grid item>
                  <TextField
                    placeholder="Username"
                    type="text"
                    variant="filled"
                    style={{
                      transform: 'scale(0.7)',
                      width: '100%',
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    InputLabelProps={{ style: { color: 'black' } }}
                    InputProps={{
                      style: {
                        backgroundColor: 'white',
                        color: 'black',
                        padding: '0.4rem 1rem',
                        borderRadius: '0.7rem',
                        border: 'none',
                        fontSize: '1.5rem',
                      },
                      classes: {
                        underline: 'underline-none',
                        adornedEnd: 'adorned-end',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="filled"
                    style={{
                      transform: 'scale(0.7)',
                      width: '100%',
                      marginBottom: '1rem',
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    InputLabelProps={{
                      style: { color: 'white' },
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: 'white',
                        color: 'black',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.7rem',
                        border: 'none',
                        fontSize: '1.5rem',
                      },
                      classes: {
                        underline: 'underline-none',
                        adornedEnd: 'adorned-end',
                      },
                      endAdornment: (
                        <div onClick={toggleShowPassword}>
                          {showPassword ? (
                            <VisibilityOffIcon style={{ color: 'gray', fontSize: 30 }} />
                          ) : (
                            <VisibilityIcon style={{ color: 'gray', fontSize: 30 }} />
                          )}
                        </div>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    style={{
                      backgroundColor: '#e50914',
                      borderRadius: '0.5rem',
                      transform: 'scale(0.7)',
                      width: '100%',
                      cursor: 'pointer',
                      color: 'white',
                      border: 'none',
                      fontWeight: 'bold',
                      fontSize: '1.05rem',
                      transition: 'background-color 0.3s ease',
                      height: '80px'
                    }}
                  >
                    Login to your account
                  </Button>
                </Grid>
                <Grid item container >
                  <Grid item style={{ marginTop: 10, color: 'gray', marginLeft: '15%' }}>
                    <input type="checkbox" /> Remember me
                  </Grid>
                  <Grid item style={{ marginTop: 10, marginLeft: '20%' }}>
                    <p className="text-right">
                      <Link
                        style={{ textDecoration: 'none', color: 'gray' }}
                        href="https://help.netflix.com/hr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white"
                        onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                        onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                      >
                        Need Help?
                      </Link>
                    </p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: 50, color: 'gray', marginLeft: '15%' }}>
                <Grid className="py-8">
                  <span style={{ color: 'gray', fontSize: 16 }}>This is your first time with Netflix?</span>
                  <Link style={{ textDecoration: 'none', color: 'white', marginLeft: 5, fontSize: 18 }} to="/signup" className="text-white">
                    Sign In!
                  </Link>
                  <br />
                  <br />
                  <Grid style={{ color: 'gray', marginRight:'10%', marginLeft:'0.2%', fontSize:13 }}>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot.
                  </Grid>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                    onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                    onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                  >
                    Learn more.
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
