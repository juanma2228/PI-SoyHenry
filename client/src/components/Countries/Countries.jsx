import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import Country from './Country';
import {
  getAllCountries,
  orderAlpha,
  orderAlphaRev,
  orderPop,
  orderPopRev,
  orderCont,
  showActiv,
  getCountry
} from '../../redux/actions/actions.js';
import style from './countries.module.css';


const Countries = () => {

  const countries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);
  const searchCountry = useSelector(state => state.searchCountry)

  const [currentPage, setCurrentPage] = useState(0)


  let nextPage = () => {
    if (countries.length <= currentPage + 10) {
      return
    }
    if (currentPage === 0) setCurrentPage(9)
    else setCurrentPage(currentPage + 10);
  };
  let prevPage = () => {
    if (currentPage < 10) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 10);
    }
  };

  const firstPage = () => {
    setCurrentPage(0);
  };

  const lastPage = () => {

    if (countries.length >= 1)
      setCurrentPage(countries.length - 1);
  };


  const pagFirstPage = countries.slice(currentPage, currentPage + 9);
  let pagCountries = 0;
  currentPage < 10 ? pagCountries = countries.slice(pagFirstPage.length, currentPage + 10)
    : pagCountries = countries.slice(currentPage, currentPage + 10)

 

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState(false)
  const actFlat = activities?.flatMap(e => e[0])
  const actSeted = [...new Set(actFlat)]


  function handleOpen() {
    setOpen(!open)
  }

  const onClickHandleSort = (e) => {
    e.preventDefault()
    switch (e.target.value) {
      case 'all': dispatch(getAllCountries());
        break;
      case 'a-z': dispatch(orderAlpha());
        break;
      case 'z-a': dispatch(orderAlphaRev());
        break;
      case '↑ population': dispatch(orderPop());
        break;
      case '↓ population': dispatch(orderPopRev())
        break;
    }
  }

  const onClickHandleCont = (e) => {
    e.preventDefault()

    switch (e.target.value) {
      case 'all':
        if (searchCountry) {
          dispatch(getCountry(searchCountry))
            .then(() => setFilter(true))
          return
        } else {
          return dispatch(getAllCountries())
            .then(() => setFilter(true))
        };
      case 'Americas':
        if (searchCountry) {
          dispatch(getCountry(searchCountry))
            .then(() => dispatch(orderCont('Americas')))
            .then(() => setFilter(true))
          return
        } else {
          return dispatch(getAllCountries())
            .then(() => dispatch(orderCont('Americas')))
            .then(() => setFilter(true))
        };
      case 'Europe':
        if (searchCountry) {
          dispatch(getCountry(searchCountry))
            .then(() => dispatch(orderCont('Europe')))
            .then(() => setFilter(true))
          return
        } else {
          return dispatch(getAllCountries())
            .then(() => dispatch(orderCont('Europe')))
            .then(() => setFilter(true))
        };
      case 'Africa':
        if (searchCountry) {
          dispatch(getCountry(searchCountry))
            .then(() => dispatch(orderCont('Africa')))
            .then(() => setFilter(true))
          return
        } else {
          return dispatch(getAllCountries())
            .then(() => dispatch(orderCont('Africa')))
            .then(() => setFilter(true))
        };
      case 'Oceania':
        if (searchCountry) {
          dispatch(getCountry(searchCountry))
            .then(() => dispatch(orderCont('Oceania')))
            .then(() => setFilter(true))
          return
        } else {
          return dispatch(getAllCountries())
            .then(() => dispatch(orderCont('Oceania')))
            .then(() => setFilter(true))
        };
      case 'Asia':
        if (searchCountry) {
          dispatch(getCountry(searchCountry))
            .then(() => dispatch(orderCont('Asia')))
            .then(() => setFilter(true))
          return
        } else {
          return dispatch(getAllCountries())
            .then(() => dispatch(orderCont('Asia')))
            .then(() => setFilter(true))
        };
    }
  }

  const onClickHandleAct = (e) => {
    e.preventDefault()
    if (!e.target.value) return

    function resetCont() {

      var options = document.getElementById('selectCont')
      
        options.selectedIndex = 0;
      
    }

    const payload = activities.flatMap(n => n[0] !== e.target.value ? [] : [n[1]])
    console.log(countries);

    if (filter && countries.length > 0) {
      console.log('entra a filtro');
      if (searchCountry) {
        console.log('entra searchCountry');
        dispatch(getCountry(searchCountry))
          .then(() => dispatch(showActiv(payload)))
          .then(() => resetCont())
      } else {
        console.log('NO entra searchCountry');
        dispatch(getAllCountries())
          .then(() => dispatch(showActiv(payload)))
          .then(() => resetCont())
      }
    } else {
      console.log('NO entra filter');
      if (searchCountry) {
        console.log('entra searchCountry');
        dispatch(getCountry(searchCountry))
          .then(() => dispatch(showActiv(payload)))
      } else {
        console.log('NO entra searchCountry');
        dispatch(getAllCountries())
          .then(() => dispatch(showActiv(payload)))
      }
    }
  }

  const onClickReset = () => {
    var options = document.getElementsByName("select")

    for (var i = 0, l = options.length; i < l; i++) {
      options[i].selectedIndex = 0;
    }

    dispatch(getAllCountries())
  }

  useEffect(() => {
    firstPage()

  }, [countries]);

  return (
    <div>
      <div className={style.filters} >
        <ul className={style.ulContainerFilt} id='filters' >
          <div className={style.containerFilt1}>
            <button className={style.buttonReset} type='button' value='Reset' onClick={onClickReset} >Reset</button>
            <li>
              <p>Sort By</p>
              <div className={style.selectFilters}>
                <select name='select' id='selectSort' onClick={e => onClickHandleSort(e)}>
                  <option value='0' selected disabled>Sort By</option>
                  <option value="all">All</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="↑ population">↑ population</option>
                  <option value="↓ population">↓ population</option>
                </select>
              </div>
            </li>
          </div>

          <div className={style.hideFilter} >
            <li>
              <button className={style.btnFilters} onClick={handleOpen}>Filtros</button>
            </li>
            {open &&
              <div className={style.containerHidFilt1}>
                <div className={style.containerHidFilt2}>
                  <li>
                    <p>Filter by Continent</p>
                    <div className={style.selectFilters}>
                      <select name='select' id='selectCont' onClick={(e) => onClickHandleCont(e)}>
                        <option value='0' selected disabled>Filter By Continent</option>
                        <option value="all">All</option>
                        <option value="Americas">Americas</option>
                        <option value="Europe">Europe</option>
                        <option value="Africa">Africa</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Asia">Asia</option>
                      </select>
                    </div>
                  </li>

                  <li>
                    <p>Tourism Activities</p>
                    <div className={style.selectFilters}>
                      <select name='select' id='selectAct' onChange={e => onClickHandleAct(e)}>
                        <option value='0' selected disabled>Filter By Activities</option>
                        {actSeted && actSeted?.map(e => {
                          return (
                            <option key={e} value={e} >{e}</option>
                          )
                        })
                        }
                      </select>
                    </div>
                  </li>
                </div>
              </div>
            }
          </div>


        </ul>
      </div>
      <div className={style.pagin1}>
        <button onClick={firstPage} className={style.pagBtn} > &laquo; First Page </button>
        <button onClick={prevPage} className={style.pagBtn} >  &lsaquo; Previous   </button>
        <span className={style.pPag}>{Math.ceil(currentPage / 10) + 1} / {Math.floor(countries.length / 9.6)}</span>
        <button onClick={nextPage} className={style.pagBtn} >Next Page &rsaquo;</button>
        <button onClick={lastPage} className={style.pagBtn} >Last Page &raquo;</button>
      </div>
      <div className={style.grid} >
        <ul>
          {currentPage === 0 ? pagFirstPage && pagFirstPage?.map(e => (
            <li key={e.id}>
              <Country
                id={e.id}
                name={e.name}
                flags={e.flags}
                continents={e.continents} />
            </li>
          ))
            : pagCountries && pagCountries?.map(e => (
              <li key={e.id}>
                <Country
                  id={e.id}
                  name={e.name}
                  flags={e.flags}
                  continents={e.continents} />
              </li>
            ))
          }
        </ul>
      </div>
      <div className={style.pagin1}>
        <button onClick={firstPage} className={style.pagBtn} > &laquo; First Page </button>
        <button onClick={prevPage} className={style.pagBtn} >  &lsaquo; Previous   </button>
        <span className={style.pPag}>  {Math.ceil(currentPage / 10) + 1} / {Math.floor(countries.length / 9.6)}</span>
        <button onClick={nextPage} className={style.pagBtn} >Next Page &rsaquo;</button>
        <button onClick={lastPage} className={style.pagBtn} >Last Page &raquo;</button>
      </div>

    </div>
  )
};

export default Countries