import React from 'react';
import { Link } from 'react-router-dom';
import './country.css'

const Country = ({id, name, flags, continents}) => {
  return (
    <div>
      <Link to={`./home/${id}`}>
      <h2>{name}</h2>
          <div className='flags'>
            <img src={flags} alt={name} />
          </div>
          <h3>{continents}</h3>
      </Link>
    </div>
  )
}

export default Country;