import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoadingScreen from './Loading';

const Type = ({ types }) => {
  return <div className="PokemonType">{types}</div>;
};


function getTypeStatus(value) {
  switch(value) {
    case true:
      return 'Soltar';
    case false:
      return 'Indisponível';
    default:
      return 'Capturar';
  }
}

function verifyStorage(){
  if (localStorage.getItem('meusPokemons') === null) {
    localStorage.setItem('meusPokemons', JSON.stringify([]));
  } 
}

function getMyPokemonsList(){
  verifyStorage();

  //capturando dados no storage
  let pokemonsCaptured = JSON.parse(localStorage.getItem('meusPokemons'));

  return pokemonsCaptured;
}

function setMyPokemonsList( verifyStorage ){

  localStorage.setItem(
    'meusPokemons',
    JSON.stringify(verifyStorage)
  );
}

const Pokemon = ({ name, url }) => {
  const [ types, setTypes ] = useState([]);
  const [ id, setId ] = useState(1);
  const [ loading, setLoading ] = useState(true);
  const [ pokemonStatus, setPokemonStatus ] = useState('Carregando');

  useEffect(() => {
    getAttributeList();
    setTimeout(() => setLoading(false), 1)
  }, []);

  const getAttributeList = async () => {
    getPokemonStatus();
    const response = await fetch(url);
    const data = await response.json();
    setId(data.id);
    setTypes(data.types);
  };

  
  function getPokemonStatus() {
    setPokemonStatus('Carregando');

    //capturando dados no storage
    let myPokemons = getMyPokemonsList();
    
    //verificando se já existe pokemon cadastrado com esse nome
    let pokemonId = myPokemons.findIndex(item => item.name === name);

    let pokemonTextStatus = (pokemonId < 0) ? 
      //pokemon não capturado
      getTypeStatus(''):
      //pokemon já capturado
      getTypeStatus(myPokemons[pokemonId].status);

      setPokemonStatus(pokemonTextStatus);
  }

  // capturar e soltar pokemon
  // o pokemon só pode ser captura e solto uma vez
  function handleButtonClick(event) {
    //capturando dados no storage
    let pokemonsCaptured = getMyPokemonsList();

    //verificando se já existe pokemon cadastrado com esse nome
    let pokemonId = pokemonsCaptured.findIndex(item => item.name === name);

    //validando o pokemon já foi capturado
    if(pokemonId < 0){
      //Pokemon não foi capturado
      setPokemonStatus('Soltar');
      
      let meusPokemonsURL = {
          name,
          url,
          status: true,
      };

      setMyPokemonsList([
        ...pokemonsCaptured,
        meusPokemonsURL,
      ]);

    } else {
      //Pokemon já catpurado
      //Soltando Pokemon
      pokemonsCaptured[pokemonId].status = false;
      setMyPokemonsList(pokemonsCaptured);
    }

    getPokemonStatus();
  }

  return (
    <>
    {loading === false ? (
        <div className="PokemonItem" key={id}>
        <h1>
          #{id} - {name}
        </h1>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt="Imagem Pokemon"
          width="130"
        />
        {types.map((item) => (
          <Type key={item.type.name} types={item.type.name} />
        ))}
        <Button 
          variant={
            {
            'Soltar': 'dark',
            'Indisponível': 'light'
            }[pokemonStatus]
          }
          id={id} 
          onClick={handleButtonClick} 
          className="btn-action"
        >
          { pokemonStatus } 
        </Button>
      </div>
    ):(
      <LoadingScreen/>
    )}
  </>
)
}

export default Pokemon;