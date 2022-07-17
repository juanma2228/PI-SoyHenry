import React, { useState, useEffect } from 'react';
import validate from './validates.js';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getAllCountries } from '../../redux/actions/actions.js';



const Form = () => {

  const countries = useSelector(state => state.countries)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  const [input, setInput] = useState({
    name: '',
    duration: '',
    difficulty: '',
    season: [],
    countryID: []
  });

  const stateReset = () => {
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countryID: [],
    });
  };

  const [errors, setErrors] = useState({
    name: 'Name is required',
    duration: '',
    difficulty: '',
    countryID: 'Country is required'
  });


  const onChangeHandler = function (e) {
    e.preventDefault()

    let validatedErrors = validate({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(validatedErrors);

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }
  const [countryName, setCountryName] = useState([]);
  // let countryName = [];

  const matchIdCountry = () => {
    input.countryID?.map(e => {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].id === e) {
          setCountryName([...countryName,{
            name: countries[i].name,
            id: countries[i].id
          }])
          return
        }
      }
    })
  }
  const unselectCountry =  (e) => {

    const countFiltered = input.countryID.filter((c) => c !== e.target.value)

     setInput({
      ...input,
      countryID: countFiltered
    })
    const nameFiltered = countryName.filter(c => c.id !== e.target.value)

    setCountryName(nameFiltered)
  }

  const onChanSelHandCountId = (e) => {
    e.preventDefault()

    if (input.countryID.includes(e.target.value)) return

    setInput({
      ...input,
      countryID: [...input.countryID, e.target.value]
    })

    matchIdCountry()

  }
  /* function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id != id));
  } */

  const onChanSelHandSeason = (e) => {
    if (input.season.includes(e.target.value)) return
    setInput({
      ...input,
      season: [...input.season, e.target.value]
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(input);
    let form = true;

    if (input["name"].length < 2) {
      form = false;
    } else if (!input["countryID"].length >= 1) {
      form = false;
    }

    if (form) {
      dispatch(createActivity(input))
        .then(() => stateReset())
        .then(() => alert("Activity added"));
    } else {
      return alert("Please fill all the fields before creating a new activity");
    }
  };



  const clearAllSeasons = () => {
    setInput({
      ...input,
      season: []
    })
  }

  const clearAllCountries = () => {
    setInput({
      ...input,
      countryID: []
    })
  }


  return (
    <div>
      {console.log(input.countryID)}
      <form onSubmit={e => submitForm(e)}>
        <div className='inputName'>
          <label>Enter a Name: </label>
          <input type="text"
            name='name'
            placeholder='Name'
            autoComplete='off'
            onChange={(e) => onChangeHandler(e)}
          />
          {errors.name && (
            <p className="danger">{errors.name}</p>
          )}
        </div>
        <div className='inputDuration'>
          <label>Hours requires: </label>
          <input type="text"
            name='duration'
            placeholder='Duration'
            autoComplete='off'
            onChange={(e) => onChangeHandler(e)}
          />
          {errors.duration && (
            <p className="danger">{errors.duration}</p>
          )}
        </div>
        <div className='inputDifficulty'>
          <select name="difficulty" id="difficulty" size='6' onChange={onChangeHandler}>
            <optgroup label='Difficulty'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </optgroup>
          </select>
          {errors.difficulty && (
            <p className="danger">{errors.difficulty}</p>
          )}
        </div>
        <div className='inputSeason'>
          <select name="season" id="season" size='6' onChange={onChanSelHandSeason} >
            <optgroup label='Seasons'>
              <option onClick={clearAllSeasons}>Clear Selection</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </optgroup>
          </select>
        </div>
        <div>
          <select name="countryID" id="countryID" size='30' onChange={e => {
            onChanSelHandCountId(e)
          }} >
            <optgroup label='Countries'>
              <option onClick={clearAllCountries}>Clear Selection</option>
              {countries && countries?.map(e => {
                return (
                  <option value={e.id} key={e.id} >{e.name}</option>
                )
              })}
            </optgroup>
          </select>
          {errors.countryID && (
            <p className="danger">{errors.countryID}</p>
          )}
          {countryName && countryName?.map((e) => {
            return (
              <div key={e.id}>
                <p>{e.name}</p>
                <button type='button' value={e.id} onClick={unselectCountry} >X</button>
              </div>
            )
          })}
        </div>
        <div>
          <input type="submit" value="Add activity" />
        </div>
      </form>
    </div>
  )
}

export default Form