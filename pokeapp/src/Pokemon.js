import React, { useEffect, useState } from 'react';

const Type = ({ types }) => {
  return <div className="PokemonType">{types}</div>;
};

const Pokemon = ({ name, url }) => {
  const [types, setTypes] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    getAttributeList();
  }, []);

  const getAttributeList = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setId(data.id);
    setTypes(data.types);
  };

  // capturar pokemon

  function handleButtonClick(event) {
    let meusPokemonsURL = url;
    //meusPokemons.name = name;
    //meusPokemons.url = url;

    if (localStorage.getItem('meusPokemons') === null) {
      localStorage.setItem('meusPokemons', JSON.stringify([meusPokemonsURL]));
    } else {
      localStorage.setItem(
        'meusPokemons',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('meusPokemons')),
          meusPokemonsURL,
        ])
      );
    }
  }

  return (
    <div className="PokemonItem" key={id}>
      <h1>
        #{id} - {name}
      </h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt="Imagem Pokemon"
        width="150"
        height="150"
      />
      {types.map((item) => (
        <Type key={item.type.name} types={item.type.name} />
      ))}
      <button id={id} onClick={handleButtonClick}>
        Salvar
      </button>
    </div>
  );
};

export default Pokemon;
