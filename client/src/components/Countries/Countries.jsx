import React, { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
import './countries.css'
import Country from './Country';


const Countries = () => {

  const countries = useSelector(state => state.countries);

  const [currentPage, setCurrentPage] = useState(0)

  let nextPage = () => {
    if (countries.length <= currentPage + 10) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 10);
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
    setCurrentPage(countries.length - 5);
  };

  useEffect(() => {
    firstPage()
  }, [countries]);

  const pagFirstPage = countries.slice(currentPage, currentPage +9)
  const pagCountries = countries.slice(currentPage, currentPage + 10);


  return (
    <div>
      <button onClick={firstPage} className='button' >  {'<<'}  </button>
      <button onClick={prevPage} className='button' >  {'<'}   </button>
      <p>  {(currentPage/10)+1}  </p>
      <button onClick={nextPage} className='button' >  {'>'}   </button>
      <button onClick={lastPage} className='button' >  {'>>'}</button>
      <div className='grid' >
        {currentPage === 0 ? pagFirstPage && pagFirstPage?.map(e => (
            <div key={e.id}>
              <Country
                id={e.id}
                name={e.name}
                flags={e.flags}
                continents={e.continents} />
            </div>
          ))
          :pagCountries && pagCountries?.map(e => (
            <div key={e.id}>
              <Country
                id={e.id}
                name={e.name}
                flags={e.flags}
                continents={e.continents} />
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default Countries