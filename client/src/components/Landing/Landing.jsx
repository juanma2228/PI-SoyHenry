import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css'

const Landing = () => {
  return (
    <div className='mainContainer'>
      <Link to='/home'>
         HOME
      </Link>
    </div>
  )
}

export default Landing