/* renderiza un boton home y un search bar
importar iconos react-icons */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAllCountries, getCountry, setSearch } from '../../redux/actions/actions';
import style from './nav.module.css';


const Nav = () => {

  const dispatch = useDispatch()
  const history = useHistory();
  const countries = useSelector(state => state.countries)
  const searchCountry = useSelector(state => state.searchCountry)


  const submitHandler = (e) => {
    e.preventDefault();
    
    const input = document.getElementById("inputSearch").value;
    const onlyLetters = /^[a-zA-Z\s]*$/
    const countriesNames = countries.map(e => e.name).some(el => el.toLowerCase().includes(input.toLowerCase()))
    history.push(`/home`)
    
    
    if (onlyLetters.test(input)) {
      
      if (countriesNames) {
        
        history.push('/home')
        dispatch(setSearch(input))
        dispatch(getCountry(searchCountry))
        document.getElementById("inputSearch").value = ''

      }
      else {
        history.push('/home')
        alert('Country not found')
        document.getElementById("inputSearch").value = ''
      }
    }
    else {
      console.log('Only letters!!');
      history.push('/home')
      alert('Only letters!!')
      document.getElementById("inputSearch").value = ''
    }

  }

  return (
    <>
      <div className={style.topnav} >
        <a href='/home' className={style.link} onClick={() => dispatch(getAllCountries())}>
          HOME
        </a>
        <a href='/form' className={style.link}>
          CREATE ACTIVITY
        </a>
        <Link to='/' className={style.link}>
          EXIT
        </Link>
        <form className={style.searchbar} id='form' onSubmit={(e) => submitHandler(e)}>
          <input type='search'
            id='inputSearch'
            placeholder='Search Country'
            autoComplete="off"
          />
        </form>
      </div>
    </>
  )
}

export default Nav