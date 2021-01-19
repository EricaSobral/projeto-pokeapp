import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

export default function Header() {
  return (
    <>
      <Navbar expand="lg" variant="light" bg="light">
        <Container className="d-flex justify-content-around align-center py-2">
          <Link to="/">
            <Navbar.Brand>PokeApp</Navbar.Brand>
          </Link>

          <div>
            <Link to="/">
              <Navbar.Brand>Home</Navbar.Brand>
            </Link>
            <Link to="/meuspokemons">
              <Navbar.Brand>Meus pokemons</Navbar.Brand>
            </Link>
          </div>

          <Form className="d-flex mt-2">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}
