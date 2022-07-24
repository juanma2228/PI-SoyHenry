import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  GET_COUNTRY_BY_ID,
  SET_SEARCH_COUNTRY,
  ORD_ALPHA,
  ORD_ALPHA_REV,
  ORD_POP,
  ORD_POP_REV,
  ORD_CONTINENT,
  SHOW_ACTIV,
  GET_ALL_ACTIVITIES
} from '../actions-types/actionsTypes.js';

import { ordAlpha, ordPop } from './orderBy';

const initialState = {
  countries: [],//array todos los paises + act
  countryDetail: [],//array con los paises traidos x id. Info pais + act.
  searchCountry: '',//string con el nombre del pais buscado en el searchBar
  activities: [] //array name country + id activities
}

export default function rootReducer(state = initialState, { type, payload }) {

  switch (type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: payload
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryDetail: payload
      };
    case GET_COUNTRY:
      return {
        ...state,
        countries: payload
      };
    case SET_SEARCH_COUNTRY:
      return {
        ...state,
        searchCountry: payload
      };
    case ORD_ALPHA: 
    {
      return {
        ...state,
        countries: state.countries.slice().sort(ordAlpha)
      };
    };
    case ORD_ALPHA_REV: 
    {
      return {
        ...state,
        countries: state.countries.slice().sort(ordAlpha).reverse()
      };
    };
    case ORD_POP: 
    {
      return {
        ...state,
        countries: state.countries.slice().sort(ordPop).reverse()
      };
    };
    case ORD_POP_REV: 
    {
      return {
        ...state,
        countries: state.countries.slice().sort(ordPop)
      };
    };
    case ORD_CONTINENT: 
    {
      return {
        ...state,
        countries: state.countries.filter((c) => c.continents === payload)
      };
    };
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: payload
      };
    case SHOW_ACTIV: 
    {
      return {
        ...state,
        countries: state.countries.filter(c => payload.includes(c.name))
      };
    };
    default: return state;
  };
}

