import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import Country from './Country';
import {
  getAllCountries,
  orderAlpha,
  orderAlphaRev,
  orderPop,
  orderPopRev,
  orderCont,
  showActiv
} from '../../redux/actions/actions.js';
import style from './countries.module.css';


const Countries = () => {

  const countries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);

  const [currentPage, setCurrentPage] = useState(0)


  let nextPage = () => {
    if (countries.length <= currentPage + 10) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 10);
  };
  let prevPage = () => {
    if (currentPage < 10) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 10);
    }
  };

  const firstPage = () => {
    setCurrentPage(0);
  };

  const lastPage = () => {
    if (countries.length >= 5)//sacar para arreglar
      setCurrentPage(countries.length - 5);
  };


  const pagFirstPage = countries.slice(currentPage, currentPage + 9);
  const pagCountries = countries.slice(currentPage, currentPage + 10);

  const dispatch = useDispatch();

  const onClickHandleSort = (e) => {
    e.preventDefault()
    switch (e.target.value) {
      case 'all': dispatch(getAllCountries());
        break;
      case 'a-z': dispatch(orderAlpha());
        break;
      case 'z-a': dispatch(orderAlphaRev());
        break;
      case '↑ population': dispatch(orderPop());
        break;
      case '↓ population': dispatch(orderPopRev())
        break;
      default: dispatch(getAllCountries());
        break;
    }
  }

  const [filter, setFilter] = useState(false)

  const onClickHandleCont = (e) => {
    e.preventDefault()
    switch (e.target.value) {
      case 'all': dispatch(getAllCountries());
        break;
      case 'Americas':
        dispatch(getAllCountries())
          .then(() => dispatch(orderCont('Americas')))
          .then(() => setFilter(true))
        break;
      case 'Europe':
        dispatch(getAllCountries())
          .then(() => dispatch(orderCont('Europe')))
          .then(() => setFilter(true))
        break;
      case 'Africa':
        dispatch(getAllCountries())
          .then(() => dispatch(orderCont('Africa')))
          .then(() => setFilter(true))
        break;
      case 'Oceania':
        dispatch(getAllCountries())
          .then(() => dispatch(orderCont('Oceania')))
          .then(() => setFilter(true))
        break;
      case 'Asia':
        dispatch(getAllCountries())
          .then(() => dispatch(orderCont('Asia')))
          .then(() => setFilter(true))
        break;
      default: dispatch(getAllCountries())
        break;
    }
  }
  /* const countXAct = countries?.filter(e => e.activities.length > 0);
  const actFlat = countXAct?.flatMap(e => e.activities.slice(''))
  const actMap = actFlat?.flatMap(e => e.name );
  const actSeted = [...new Set(actMap)] */

  const actFlat = activities?.flatMap(e => e[0])
  const actSeted = [...new Set(actFlat)]

  const onClickHandleAct = (e) => {
    e.preventDefault()
    if (!e.target.value) return

    const payload = activities.flatMap(n => n[0] !== e.target.value ? [] : [n[1]])

    if (filter && countries.length > 0) {
      dispatch(showActiv(payload))
      setFilter(false)
    } else {
      dispatch(getAllCountries())
        .then(() => dispatch(showActiv(payload)))
    }
  }

  const onClickReset = (e) => {
    e.preventDefault()
    dispatch(getAllCountries())
  }


  useEffect(() => {
    firstPage()

  }, [countries]);

  return (
    <div>
      {console.log(filter)}

      <button onClick={firstPage} className='button' >  {'<<'}  </button>
      <button onClick={prevPage} className='button' >  {'<'}   </button>
      <p>  {Math.ceil(currentPage / 10) + 1}  </p>
      <button onClick={nextPage} className='button' >  {'>'}   </button>
      <button onClick={lastPage} className='button' >  {'>>'}</button>

      <div className={style.filters} >
        <ul id='filters' >
          <li>
            <p>Sort By</p>
            <select name="sortby" id="sortby" size='5' onClick={e => onClickHandleSort(e)}>
              <option value="all">All</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="↑ population">↑ population</option>
              <option value="↓ population">↓ population</option>
            </select>
          </li>
          <li>
            <p>Filter by Continent</p>
            <select size='6' onClick={(e) => onClickHandleCont(e)}>
              <option value="all">All</option>
              <option value="Americas">Americas</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
              <option value="Asia">Asia</option>
            </select>
          </li>
          <li>
            <p>Tourism Activities</p>
            <select id='select' onChange={e => onClickHandleAct(e)}>
              {actSeted && actSeted?.map(e => {
                return (
                  <option key={e} value={e} >{e}</option>
                )
              })
              }
            </select>
          <button type='reset' onClick={e => onClickReset(e)} >Reset</button>
          </li>
        </ul>

      </div>


      <div className={style.grid} >
        <ul>
          {currentPage === 0 ? pagFirstPage && pagFirstPage?.map(e => (
            <li key={e.id}>
              <Country
                id={e.id}
                name={e.name}
                flags={e.flags}
                continents={e.continents} />
            </li>
          ))
            : pagCountries && pagCountries?.map(e => (
              <li key={e.id}>
                <Country
                  id={e.id}
                  name={e.name}
                  flags={e.flags}
                  continents={e.continents} />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
};

export default Countries