import './Card.scss'

import React from 'react'
import Backcard from './assets/backcard2.png'

export default function Card({ data }) {
    return (
        <div className={`card-wrapper`}>
            <img className='card' src={Backcard} alt='card'></img>
        </div>
    )
}
