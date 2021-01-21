import React, {useEffect, useState} from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import './teste.css'

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
        <div className="PokemonItem my-2">
    <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} waves />
        <MDBCardBody>
          <MDBCardTitle>{id} - {name}</MDBCardTitle>
          <MDBCardText style={{height:"4rem" }}>
          {types.map(item => (
                <Type
                key={item.type.name}
                types={item.type.name}/>
            ))}
          </MDBCardText>    
        <MDBBtn color="primary" className="btn-pokemon">Default</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
     </div>
    )
}
export default Pokemon;