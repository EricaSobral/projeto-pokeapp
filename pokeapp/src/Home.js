import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokemon from './Pokemon';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

export default function Home() {
  //API content code below
  const APP_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';

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

  // funcao de filtro dos Pokemons
  const [pesquisar, setPesquisar] = useState('');
  const handleChange = (event) => {
    setPesquisar(event.target.value);
  };

  useEffect(() => {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pesquisar)
    );
    setPokemons(filteredPokemons);
  }, [pesquisar]);

  return (
    <>
      <Header />

      <div className="container mt-4 d-flex justify-content-between">
        <h2>Home</h2>
        <Form className="d-flex mt-2">
          <FormControl
            type="text"
            name="pesquisarPokemon"
            placeholder="Pesquisar pokemon"
            className="mr-sm-2"
            value={pesquisar}
            onChange={handleChange}
          />
          <Button variant="outline-info">Pesquisar</Button>
        </Form>
      </div>

      <div className="pokemon-cards d-flex flex-wrap">
        {pokemons.map((item) => (
          <div>
            <Pokemon key={item.name} name={item.name} url={item.url} />
          </div>
        ))}
      </div>
    </>
  );
}
