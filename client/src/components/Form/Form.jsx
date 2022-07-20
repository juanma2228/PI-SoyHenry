import React, { useState, useEffect } from 'react';
import validate from './validates.js';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getAllCountries } from '../../redux/actions/actions.js';
import { useHistory } from 'react-router-dom';



const Form = () => {

  const countries = useSelector(state => state.countries)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  const [input, setInput] = useState({
    name: '',
    duration: '',
    difficulty: '',
    season: [],
    countryID: [],
  });


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

  const matchIdCountry = (value) => {
    countries?.map(c => {
      if (c.id === value) {
        return setCountryName([
          ...countryName,
          c.name
        ])
      }
    })
  }

  const onChangeCountry = (e) => {
    e.preventDefault()

    if (input.countryID.includes(e.target.value) || !e.target.value) return
    console.log(e.target.value);
    setInput({
      ...input,
      countryID: [...input.countryID, e.target.value],
    })

    matchIdCountry(e.target.value)

  }

  const unselectCountry = async (e) => {

    const nameFiltered = countryName.filter(c => c !== e.target.value)
    setCountryName(nameFiltered)

    const idMatch = await countries?.filter(c => {
      if (c.name === e.target.value) return c.id
    })

    const countFiltered = input.countryID.filter((c) => c !== idMatch[0].id);

    setInput({
      ...input,
      countryID: countFiltered,
    })
  }

  const onChangeSeason = (e) => {

    if (input.season.includes(e.target.value) || !e.target.value) return
    setInput({
      ...input,
      season: [...input.season, e.target.value]
    })
  }

  const unselectSeason = (e) => {

    setInput({
      ...input,
      season: input.season.filter(s => s !== e.target.value)
    })
  }

  const submitForm = (e) => {
    e.preventDefault();

    let form = true;

    if (input["name"].length < 2) {
      form = false;
    } else if (!input["countryID"].length >= 1) {
      form = false;
    }

    if (form) {
      dispatch(createActivity(input))
        .then(() => {
          setCountryName([]);
          setInput({
            season:[]
          })
          history.push('/home')
        })
      alert("Activity added")
    } else {
      return alert("Please fill all the fields before creating a new activity");
    }
  };
  

  return (
    <div>
      <form onSubmit={e => submitForm(e)} id="form" >
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
          <select name="season" id="season" size='5' onClick={(e) => onChangeSeason(e)} >
            <optgroup label='Seasons'>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </optgroup>
          </select>
          {input.season?.map(el => {
            return (
              <div key={el}>
                <p>{el}</p>
                <button type='button' value={el} onClick={(e) => unselectSeason(e)} >X</button>
              </div>
            )
          })
          }
        </div>
        <div>
          <select id="countryID" size='30' onClick={e => { onChangeCountry(e) }} >
            <optgroup label='Countries'>
              {countries && countries?.map(e => {
                return (
                  <option value={e.id} key={e.id} name={`${e.name}`} >{e.name}</option>
                )
              })}
            </optgroup>
          </select>
          {errors.countryID && (
            <p className="danger">{errors.countryID}</p>
          )}
          <div>
          {countryName?.map(el => {
            return (
              <div key={el}>
                <button type='button' value={el} onClick={unselectCountry} >{el} &#10008;</button>
              </div>
            )
          })
          }
          </div>
        </div>
        <div>
          <input type="submit" value="Add activity" />
        </div>
      </form>
    </div>
  )
}

export default Form