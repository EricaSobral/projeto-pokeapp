import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import PokemonImgTitle from '../../assets/image/pokemon-logo-1.png';

export default function Header({ pageName }) {
  
  return (
    <>
      <Navbar expand="lg" variant="dark" bg="primary">
        <Container className="d-flex justify-content-around align-center py-2">
          <Link to="/">
            <Navbar.Brand>
              <div>
                <img
                  className="PageHomeImg"
                  src={ PokemonImgTitle }
                  alt="Loading Image"
                />
              </div>
            </Navbar.Brand>
          </Link>
          <div>
            <Link to="/">
              <Navbar.Brand className={
                pageName === "Home" ? "NavePageIn" : "NavePage"
              }>Home</Navbar.Brand>
            </Link>
            <Link to="/meuspokemons">
              <Navbar.Brand className={
                pageName != "Home" ? "NavePageIn" : "NavePage"
              }>Meus pokemons</Navbar.Brand>
            </Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
}