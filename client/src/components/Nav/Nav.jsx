/* renderiza un boton home y un search bar
importar iconos react-icons */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAllCountries, getCountry, setSearch } from '../../redux/actions/actions';


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
    const onlyLetters = /^[A-Za-z]+$/
    if (input.name) {
      if (onlyLetters.test(input.name)) {
        await dispatch(setSearch(input.name))
        await dispatch(getCountry(searchCountry))
        history.push(`/home`)
        setInput({name:''});
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
      <div>
        <ul>
          <>
            <Link to='/home'>
              <button onClick={() => dispatch(getAllCountries())}> HOME </button>
            </Link>
          </>
          <div className='search-bar'>
            <form onSubmit={(e) => submitHandler(e)}>
              <input type='search'
                id='inputSearch'
                placeholder='Search Country'
                autoComplete="off"
                value={input.name}
                onChange={(e) => onChangeHandler(e)} />
              <button type='submit'>BUSCAR</button>
            </form>
          </div>
        </ul>
      </div>
    </>
  )
}

export default Nav