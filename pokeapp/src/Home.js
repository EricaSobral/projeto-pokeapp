import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokemon from "./Pokemon";
import './estiloCard.css'

export default function Home() {
  //API content code below
  const APP_URL = "https://pokeapi.co/api/v2/pokemon?limit=12";

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemonsList();
  }, []);

  const getPokemonsList = async () => {
    const response = await fetch(APP_URL);
    const data = await response.json();
    console.log(data.results);
    setPokemons(data.results);
  };
  //End API content code

  const [pesquisa, setPesquisa] = useState('');
  return (
    <>
      <Header />
      <div className="">Home</div>
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
