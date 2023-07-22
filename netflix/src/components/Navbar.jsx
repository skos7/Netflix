import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Grid, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const handleIconClick = () => {
    setIsPopoutOpen(!isPopoutOpen);
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <Grid className="left flex a-center">
          <Grid className="brand flex a-center j-center">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </Grid>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </Grid>
        <Grid className="right flex a-center">
          <Grid className={`search ${showSearch ? "show-search" : ""}`}>
            <Button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <SearchIcon style={{ color: 'white', fontSize: 30 }} />
            </Button>
            <TextField
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </Grid>
          <Grid style={{ position: 'relative' }}>
            <Button onClick={handleIconClick} style={{ backgroundColor: isPopoutOpen ? '#202020' : 'transparent', border: 'none', padding: '0' }}>
              <MoreHorizIcon style={{ color: 'white', fontSize: 30 }} />
            </Button>
            {isPopoutOpen && (
              <Grid style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#202020', border: '1px solid #202020', padding: '8px', paddingLeft: '80px', paddingRight: '80px' }}>
                <Button
                  style={{ color: 'white' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#555555'} onMouseLeave={(e) => e.target.style.backgroundColor = '#202020'} onClick={() => window.open('https://help.netflix.com/en/node/100627', '_blank')}>Settings</Button>
                <Button
                  style={{ color: 'white' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#555555'} onMouseLeave={(e) => e.target.style.backgroundColor = '#202020'} onClick={() => signOut(firebaseAuth)}>Sign Out</Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        .MuiTextField-root {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          input {
            color: white; /* Set the input text color to white */
          }
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        .MuiTextField-root {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
