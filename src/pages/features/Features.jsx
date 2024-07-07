import React from 'react'
import "./features.css"
import Navbar from '../../components/navbar/Navbar'
import { Link } from 'react-router-dom'

export default function Features() {
  return (

    <div className="container">
    <Navbar/>
    <div class="featuresWrapper">
      <div className="featureContent">
        <Link className="setSched btnStyle" to="/schedule">
        <div ></div>
        </Link>
              
              <div className="timer btnStyle"></div>
      </div>
    </div>
    </div>
  )
}
