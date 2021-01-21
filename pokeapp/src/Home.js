import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokemon from "./Pokemon";
import Pagination from '@material-ui/lab/Pagination';

import Footer from './Footer';

export default function Home() {
  
  const APP_URL = "https://pokeapi.co/api/v2/pokemon";
  //ANTES:https://pokeapi.co/api/v2/pokemon?limit=4

  const LIMIT_ITENS_PER_PAGE = 20;
  
  const [ totalPages, setTotalPages] = useState(1);

  const handleChangePage = (event, value) => {
    let rangeSelected = ((value-1) <= 0) ? 0 : value - 1;
    let offset = rangeSelected * LIMIT_ITENS_PER_PAGE;
    let url_link = APP_URL + `?offset=${ offset }&limite=${LIMIT_ITENS_PER_PAGE}`;
 
    getPokemonsList(url_link);
   
  };
  
  const [pokemons, setPokemons] = useState([]);

  useEffect( () => {
    getPokemonsList('');
  }, [] );

  const getPokemonsList = async (url) => {
    let urlSelected = ((url) && (url.length > 0)) ? url : APP_URL;
    const response = await fetch(urlSelected);
    
    const data = await response.json();

    let numberOfPages = Math.ceil(data.count/LIMIT_ITENS_PER_PAGE);  
    setTotalPages(numberOfPages);

    setPokemons(data.results);
  };

  //const [pesquisa, setPesquisa] = useState('');

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