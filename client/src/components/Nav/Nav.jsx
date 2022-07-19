/* renderiza un boton home y un search bar
importar iconos react-icons */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAllCountries, getCountry, setSearch } from '../../redux/actions/actions';
import style from './nav.module.css';


const Nav = () => {

  const searchCountry = useSelector(state => state.searchCountry)
  const dispatch = useDispatch()
  const [input, setInput] = useState({name: ''});
  const history = useHistory();


  const onChangeHandler = (e) => {
    e.preventDefault()

    setInput({
      ...input,
      name: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // let form = document.getElementById('form')
    const onlyLetters = /^[a-zA-Z\s]*$/
    if (input.name) {
      if (onlyLetters.test(input.name)) {
        await dispatch(setSearch(input.name))
        await dispatch(getCountry(searchCountry))
        history.push(`/home`)
        setInput({name:''});
        // form.reset()
      } 
      else {
        alert('Only letters!!')
        history.push('/home')
        setInput({name:''});
      }
    } 
    else {
      dispatch(getAllCountries())
    }
  }

  return (
    <>
      <div className={style.topnav} >
            <a  href='/home' className={style.link} onClick={() => dispatch(getAllCountries())}>
            HOME
            </a>
          <a href='/form' className={style.link}>
          CREATE ACTIVITY
          </a>
          <Link to='/' className={style.link}>
          EXIT
          </Link>
            <form className={style.searchbar} id='form' onSubmit={(e) => submitHandler(e)}>
              <input type='text'
                id='inputSearch'
                placeholder='Search Country'
                autoComplete="off"
                value={input.name}
                onChange={(e) => onChangeHandler(e)} />
            </form>
      </div>
    </>
  )
}

export default Nav