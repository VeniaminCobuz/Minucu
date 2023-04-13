import './Hand.scss'

import React from 'react'
import Card from '../Card'

export default function Hand(prop: { data: Number }) {
    return (
        <div className={`hand-wrapper`}>
            <Card data={'card'} />
            <Card data={'card'} />
            <Card data={'card'} />
            <Card data={'card'} />
            <Card data={'card'} />
        </div>
    )
}
