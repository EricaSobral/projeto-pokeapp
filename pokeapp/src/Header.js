import React from 'react';

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid py-2 d-flex flex-column flex-md-row align-items-center">
          <a className="navbar-brand">PokeApp</a>
          <div className="mt-2 d-flex flex-wrap">
            <Link to="/" className="navbar-brand">
              Pokemons
            </Link>
            <Link to="/meuspokemons" className="navbar-brand">
              Meus Pokemons
            </Link>

            <form class="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Pesquisar pokemon"
                aria-label="Pesquisar"
              />
              <button className="btn btn-outline-success" type="submit">
                Pesquisar
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
