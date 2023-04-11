import './Hand.scss'

import React from 'react'
import Card from '../Card'

export default function Hand({ data }) {
    return (
        <div className={`hand-wrapper`}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}
