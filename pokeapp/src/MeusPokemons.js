import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';

export default function MeusPokemons() {
  // recupera a URL dos pokemons salvos na storage
  const meusPokemonsURL = JSON.parse(localStorage.getItem('meusPokemons'));

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div></div>
      </div>
    </>
  );
}
