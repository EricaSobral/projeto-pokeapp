import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokemon from "./Pokemon";
import Pagination from '@material-ui/lab/Pagination';
import LoadingScreen from './Loading';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import Footer from './Footer';

export default function Home() {
  
  const APP_URL = "https://pokeapi.co/api/v2/pokemon";
  const LIMIT_ITENS_PER_PAGE = 20;
  const [ totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true)

  const handleChangePage = (event, value) => {
    let rangeSelected = ((value-1) <= 0) ? 0 : value - 1;
    let offset = rangeSelected * LIMIT_ITENS_PER_PAGE;
    let url_link = APP_URL + `?offset=${ offset }&limite=${LIMIT_ITENS_PER_PAGE}`;
 
    getPokemonsList(url_link);
  };
  
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect( () => {
    getPokemonsList('');
    setTimeout(() => setLoading(false), 1);
  }, [] );

  const getPokemonsList = async (url) => {
    let urlSelected = ((url) && (url.length > 0)) ? url : APP_URL;
    const response = await fetch(urlSelected);
    const data = await response.json();

    let numberOfPages = Math.ceil(data.count/LIMIT_ITENS_PER_PAGE);  
    setTotalPages(numberOfPages);

    getAllPokemonsList(data.count);

    setPokemons(data.results);
  };

  // funcao de filtro dos Pokemons
  const [pesquisar, setPesquisar] = useState('');
  const handleChange = (event) => {
    setPesquisar(event.target.value);
  };

  useEffect(() => {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pesquisar.toLowerCase())
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
            placeholder="Pesquisar Pokemon"
            className="mr-sm-2"
            value={pesquisar}
            onChange={handleChange}
          />
          <Button variant="outline-info">Pesquisar</Button>
        </Form>
      </div>
      {loading === false ? (
      <div className="pokemon-cards d-flex flex-wrap">
        {pokemons.map(item => (
          <Pokemon
            key={item.name}
            name={item.name} 
            url={item.url} 
            />
        ))}
      </div>
      ) : (
      <LoadingScreen />
      )}
      <Pagination 
        count={ (totalPages) ? totalPages : 1 } 
        variant="outlined" 
        color="secondary" 
        size="small" 
        shape="rounded" 
        showFirstButton 
        showLastButton
        onChange={ handleChangePage }  />
      <Footer />
    </>
  );
}