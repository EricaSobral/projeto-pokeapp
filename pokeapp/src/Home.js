import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokemon from "./Pokemon";

export default function Home() {
  //API content code below
  const APP_URL = "https://pokeapi.co/api/v2/pokemon?limit=2000";

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemonsList();
  }, []);

  const getPokemonsList = async () => {
    const response = await fetch(APP_URL);
    const data = await response.json();
    setPokemons(data.results);
  };
  //End API content code

  const [pesquisa, setPesquisa] = useState('');
  return (
    <>
      <Header />
      <div className="container mt-4">Home</div>
      <div className="pokemon-cards">
        {pokemons.map(item => (
          <Pokemon
            key={item.name}
            name={item.name} 
            url={item.url} 
            />
        ))}
      </div>
    </>
  );
}
