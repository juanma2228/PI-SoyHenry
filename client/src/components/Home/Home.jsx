import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities, getAllCountries, getCountry } from '../../redux/actions/actions.js'
import { useEffect } from 'react';
import Countries from '../Countries/Countries'

const Home = () => {
  
  const searchCountry = useSelector(state => state.searchCountry)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries())
    dispatch(getCountry(searchCountry))
    dispatch(getAllActivities())
  }, [searchCountry,dispatch])

  return (
    <div>
        <Countries />
    </div>
  )
}

export default Home