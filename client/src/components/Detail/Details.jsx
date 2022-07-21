import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountryById } from '../../redux/actions/actions';
import s from './details.module.css'


const Details = () => {

  const countryDet = useSelector(state => state?.countryDetail);

  const tourAct = countryDet.activities

  const dispatch = useDispatch();

  let { id } = useParams();


  useEffect(() => {
    dispatch(getCountryById(id))
  }, [id, dispatch]);

  return (
    <div className={s.container}>
      <div className={s.contDetails}>
        <div className={s.contFlag} >
          <img src={countryDet.flags} alt={countryDet.name} />
          <div>
            <dl className={s.details}>
              <dt>Name: </dt>
              <dd>{countryDet.name}</dd>
              <dt>Capital: </dt>
              <dd>{countryDet.capital}</dd>
              <dt>Continent: </dt>
              <dd>{countryDet.continents}</dd>
              <dt>Sub-Region: </dt>
              <dd>{countryDet.subregion}</dd>
              <dt>Population: </dt>
              <dd>{countryDet.population} inhab.</dd>
              <dt>Total Area: </dt>
              <dd>{countryDet.area} km<sup>2</sup></dd>
              <dt>Code ISO 3166-1 alpha-3: </dt>
              <dd>{countryDet.id}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={s.contAct}>
        <details>
          <summary>Tourisc Activities</summary>
          {tourAct && tourAct?.map(el => (
            <details key={el.id}>
              <summary>{el.name}</summary>
              <ul>
                <li>Dificult: {el.difficulty}</li>
                <li>Duration: {el.duration} hs.</li>
                <li>Season: {el.season.join(', ')}</li>
              </ul>
            </details>
          ))}
        </details>
      </div>
    </div>
  )
}

export default Details