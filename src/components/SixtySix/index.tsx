import './SixtySix.scss'

import React from 'react'
import Hand from './Hand'

export default function SixtySix(prop: { data: Number }) {
    return (
        <div className={`sixtySix-wrapper`}>
            <Hand data={prop.data} />
        </div>
    )
}
