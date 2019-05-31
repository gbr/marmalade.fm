import React from 'react'

// this component wraps around anything
// we want to play from click events
// it purely provides functionality—no visual styling
export default function PlayMix({ playMix, playing, id, currentMix, children }) {
    return (
        <div className={`pointer ${id === currentMix && playing && 'playing'}`} onClick={() => playMix(id)}>
            {children}
        </div>
    )
}

