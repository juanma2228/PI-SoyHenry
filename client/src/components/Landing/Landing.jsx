import React from 'react';
import { Link } from 'react-router-dom';
import style from './landing.module.css';


const Landing = () => {


  const position = document.documentElement;
  position.addEventListener('mousemove', e => {
    position.style.setProperty('--x', e.clientX + 'px');
  })

  return (
    <>
      <section>
        <div className={style.text}>
          <h2 className={style.h2_1} ><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <h2 className={style.h2_2}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <h2 className={style.h2_3}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <h2 className={style.h2_4}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <a href="/home" className={style.btnNeon} >
            <span className={style.span1} id="span1"></span>
            <span className={style.span2} id="span2"></span>
            <span className={style.span3} id="span3"></span>
            <span className={style.span4} id="span4"></span>
            HOME
          </a>
          <h2 className={style.h2_5}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <h2 className={style.h2_6}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <h2 className={style.h2_7}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <h2 className={style.h2_8}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <h2 className={style.h2_9}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
          <h2 className={style.h2_10}><span>Argentina</span><span>Trinidad and Tobago</span><span>España</span><span>Taiwan</span><span>United States</span><span>Hungria</span><span>Ivory Coast</span><span>Taiwan</span><span>Argentina</span><span>Japon</span><span>Jamaica</span><span>Colombia</span><span>Netherlands</span><span>Indonesia</span><span>Brasil</span><span>South Korea</span><span>Argentina</span><span>Taiwan</span><span>Ivory Coast</span><span>Indonesia</span><span>Jamaica</span></h2>
        </div>
      </section>
    </>
  )
}

export default Landing