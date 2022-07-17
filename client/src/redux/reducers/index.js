import { GET_ALL_COUNTRIES , GET_COUNTRY, GET_COUNTRY_BY_ID, SET_SEARCH_COUNTRY } from '../actions-types/actionsTypes.js';

const initialState = {
  countries:[],//array todos los paises + act
  countryDetail:[],//array con los paises traidos x id. Info pais + act.
  searchCountry:'',//string con el nombre del pais buscado en el searchBar
}

export default function rootReducer (state = initialState, {type, payload}) {

  switch (type) {
    case GET_ALL_COUNTRIES: 
      return {
        ...state,
        countries:payload
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
        }
    default: return state;
  }
}

