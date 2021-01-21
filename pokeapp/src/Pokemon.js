import React, {useEffect, useState} from "react";

const Type = ({types}) => {
    return (
        <div className="PokemonType">{types}</div>
    )
}

const Pokemon = ({name, url}) => {
    const [types, setTypes] = useState([]);
    const [id, setId] = useState(1);

    useEffect(() => {
        getAttributeList()
        }, []);

    const getAttributeList = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setId(data.id);
        setTypes(data.types);
    }

    return (
        <div className="PokemonItem">
            <h1>#{id} - {name}</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="Imagem Pokemon" />
            {types.map(item => (
                <Type
                key={item.type.name}
                types={item.type.name}/>
            ))}
        </div>
    )
}

export default Pokemon;