import React from 'react'
import { connect } from 'react-redux'

import actions from '../store/actions'

// this component wraps around anything
// we want to play from click events
// it purely provides functionality—no visual styling
function PlayMix({ playMix, playing, id, currentMix, children }) {
    return (
        <div className={`pointer ${id === currentMix && playing && 'playing'}`}
            onClick={() => playMix({ currentMix: id, fromMixCloud: false })}>
            {children}
        </div>
    )
}

export default connect(state => state, actions)(PlayMix)