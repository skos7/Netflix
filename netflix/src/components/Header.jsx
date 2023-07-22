import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Button, Grid } from "@mui/material";

export default function Header(props) {

  const navigate = useNavigate();

  return (
    <StyledHeader className="flex a-center j-between">
      <Grid className="logo">
        <img src={logo} alt="logo" />
      </Grid>
      <Button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign In"}
      </Button>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
    }
  }
  Button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
    &:hover {
      background-color: #ff5a5f;
    }
  }
`;
