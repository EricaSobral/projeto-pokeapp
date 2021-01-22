import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoadingScreen from '../loading/Loading';

const Type = ({ types }) => {
  return <div className="PokemonType">{types}</div>;
};

const Pokemon = ({ name, url }) => {
  const [types, setTypes] = useState([]);
  const [id, setId] = useState(1);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getAttributeList();
    setTimeout(() => setLoading(false), 1)
  }, []);

  const getAttributeList = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setId(data.id);
    setTypes(data.types);
  };

  // capturar pokemon

  function handleButtonClick(event) {
    let meusPokemonsURL = {
        name,
        url
    };
    
    if (localStorage.getItem('meusPokemons') === null) {
      localStorage.setItem('meusPokemons', JSON.stringify([meusPokemonsURL]));
    } else {
      //capturando dados no storage
      let myPokemons = JSON.parse(localStorage.getItem('meusPokemons'));
      
      //verificando se já existe pokemon cadastrado com esse nome
      let pokemonName = myPokemons.findIndex(item => item.name === name);

      //validando o pokemon já foi capturado
      if(pokemonName < 0){
        localStorage.setItem(
          'meusPokemons',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('meusPokemons')),
            meusPokemonsURL,
          ])
        );

      }

      
    }
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
        variant="primary" 
        id={id} 
        onClick={handleButtonClick} 
        className="btn-capturar"
      >
        {"Capturar"} 
      </Button>
    </div>
  ):(
    <LoadingScreen/>
  )}
  </>
)
}

export default Pokemon;