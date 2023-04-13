import './Card.scss'

import React from 'react'
// import Backcard from './assets/backcard.png'

export default function Card(prop: { data: string }) {
    return (
        <div className={`card-wrapper`}>
            <img className='card' src={require('./assets/backcard2.png')} alt='card'></img>
        </div>
    )
}
