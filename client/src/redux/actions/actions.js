import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  GET_COUNTRY_BY_ID,
  SET_SEARCH_COUNTRY
} from '../actions-types/actionsTypes';
import axios from 'axios';

export function getAllCountries() {
  return (dispatch) => {
    return axios('http://localhost:3001/countries/')
      .then(res => dispatch({
        type: GET_ALL_COUNTRIES,
        payload: res.data
      }))
  }
};

export function getCountryById(id) {
  return async (dispatch) => {
    const res = await axios(`http://localhost:3001/countries/${id}`)
    dispatch(
      {
        type: GET_COUNTRY_BY_ID,
        payload: res.data
      }
    )
  };
};

export function getCountry(name) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/countries?name=${name}`);
      dispatch({
        type: GET_COUNTRY,
        payload: res.data
      });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export function createActivity(activity) {
  return async function () {
    try {
      const res = await axios.post('http://localhost:3001/activities/', activity);
      console.log('newActivity added to DB', res);
    } catch (error) {
      console.log(error);
    }
  }
};

export function setSearch(value) {
  return async function (dispatch) {
    try {
      const event = await value
      dispatch({
        type: SET_SEARCH_COUNTRY,
        payload: event
      })
    } catch (error) {
      console.log(error);
    }
  }
}