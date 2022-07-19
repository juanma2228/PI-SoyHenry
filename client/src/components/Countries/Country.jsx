import React from 'react';
import { Link } from 'react-router-dom';
import style from './country.module.css';

const Country = ({ id, name, flags, continents }) => {
  return (
      <div className={style.container} >
        <Link to={`./home/${id}`}>
        <div className={style.card} >
          <div className={style.flags} >
            <img src={flags} alt={name} />
            <h2>{name}</h2>
          </div>
          <div className={style.content} >
            <p>{continents}</p>
          </div>
        </div>
        </Link>
      </div>
  )
}

export default Country;