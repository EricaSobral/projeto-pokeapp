import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokemon from "./Pokemon";
import Pagination from '@material-ui/lab/Pagination';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import Footer from './Footer';


function verifyStorage(){
  if (localStorage.getItem('meusPokemons') === null) {
    localStorage.setItem('meusPokemons', JSON.stringify([]));
  } 
}

function getMyPokemonsActiveList(){
  verifyStorage();

  //capturando dados no storage
  let pokemonsCaptured = JSON.parse(localStorage.getItem('meusPokemons'));

  let filteredActivePokemons = pokemonsCaptured.filter((pokemon) =>
    pokemon.status === true
  );

  return filteredActivePokemons;
}


export default function MeusPokemons() {

  const LIMIT_ITENS_PER_PAGE = 20;
  const [ totalPages, setTotalPages] = useState(1);

  const handleChangePage = (event, value) => {
    let rangeSelected = ((value-1) <= 0) ? 0 : value - 1;
    
    getMyPokemon(rangeSelected);
  };
  
  const [myPokemon, setMyPokemon] = useState([]);

  useEffect( () => {
    getMyPokemon();
  }, [] );

  const getMyPokemon = async (page) => {
    let initialItem = (page && page.length > 0) ? page : 0;
    let finalItem = (page && page.length > 0) ? (page+1) * LIMIT_ITENS_PER_PAGE : LIMIT_ITENS_PER_PAGE;
    
    verifyStorage();

    let storagePokemons = getMyPokemonsActiveList();
    
    let myPokemonFiltered = storagePokemons.slice(initialItem, finalItem);
    
    let numberOfPages = Math.ceil(storagePokemons.length/LIMIT_ITENS_PER_PAGE);  
    setTotalPages(numberOfPages);

    setMyPokemon(myPokemonFiltered);

  };


  // funcao de filtro dos Pokemons
  const [pesquisar, setPesquisar] = useState('');
  const handleChange = (event) => {
    
    setPesquisar(event.target.value);
  };

  useEffect(() => {
    verifyStorage();

    let storagePokemons = getMyPokemonsActiveList();
    
    const filteredPokemons = storagePokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pesquisar.toLowerCase())
    );
    
    setMyPokemon(filteredPokemons);
    
  }, [pesquisar]);



  return (
    <>
      <Header />
      <div className="container mt-4 d-flex justify-content-between">
        <h2>Meus Pokemons</h2>
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
      <div className="pokemon-cards d-flex flex-wrap">
        {myPokemon.map(item => (
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