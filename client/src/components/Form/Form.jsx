import React, { useState, useEffect } from 'react';
import validate from './validates.js';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getAllCountries } from '../../redux/actions/actions.js';
import { useHistory } from 'react-router-dom';
import s from './form.module.css';


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

    let validatedErrors = validate({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(validatedErrors);

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
    e.preventDefault()

    let validatedErrors = validate({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(validatedErrors);

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
      alert('Name must have at least two characteres')
    }
    if (input["countryID"].length <= 1) {
      form = false;
      alert('Must select at least one country')
    }
    if (errors.length > 0) {
      form = false
    }

    if (form) {
      dispatch(createActivity(input))
        .then(() => {
          setCountryName([]);
          setInput({
            season: []
          })
          setErrors({})
          history.push('/home')
        })
      alert("Activity added")
    } else {
      return alert("Form with errors!!!!");
    }
  };


  return (
    <div className={s.container}>
      <form onSubmit={e => submitForm(e)} id="form" >
        <div className={s.row}>
          <div className={s.col_25}>
            <label>Enter a Name: </label>
          </div>
          <div className={s.col_75}>
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
        </div>
        <div className={s.row}>
          <div className={s.col_25}>
            <label>Hours requires: </label>
          </div>
          <div className={s.col_75}>
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
        </div>
        <div className={s.row}>
          <div className={s.col_25}>
            <label>Difficulty: </label>
          </div>
          <div className={s.col_75}>
            <select name="difficulty" id="difficulty" size='6' onChange={onChangeHandler}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.difficulty && (
              <p className="danger">{errors.difficulty}</p>
            )}
          </div>
        </div>
        <div className={s.row}>
          <div className={s.col_25}>
            <label>Select Season: </label>
          </div>
          <div className={s.col_75}>
            <select name="season" id="season" size='5' onClick={(e) => onChangeSeason(e)} >
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>
            <div className={s.errors}>
              {errors.season && (
                <span className="danger">{errors.season}</span>
              )}
            </div>
            <div className={s.cont_btn_addC}>
              {input.season?.map(el => {
                return (
                  <span className={s.spn_btn_addC} key={el}>
                    <button className={s.btn_addC} type='button' value={el} onClick={(e) => unselectSeason(e)} >{el} &#10008;</button>
                  </span>
                )
              })
              }
            </div>
          </div>
        </div>
        <div className={s.row}>
          <div className={s.col_25}>
            <label>Add Countries: </label>
          </div>
          <div className={s.col_75}>
            <select id="countryID" size='8' onClick={e => { onChangeCountry(e) }} >
              {countries && countries?.map(e => {
                return (
                  <option value={e.id} key={e.id} name={`${e.name}`} >{e.name}</option>
                )
              })}
            </select>
            <div className={s.errors}>
              {errors.countryID && (
                <span className="danger">{errors.countryID}</span>
              )}
            </div>
            <div className={s.cont_btn_addC}>
              {countryName?.map(el => {
                return (
                  <span className={s.spn_btn_addC} key={el}>
                    <button className={s.btn_addC} type='button' value={el} onClick={unselectCountry} >{el} &#10008;</button>
                  </span>
                )
              })
              }
            </div>
          </div>
        </div>
        <div className={s.row}>
          <input type="submit" value="Add activity" />
        </div>
      </form>
    </div>
  )
}

export default Form