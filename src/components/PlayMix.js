import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import actions from '../store/actions'

// this component wraps around anything
// we want to play from click events
// it purely provides functionality—no visual styling
function PlayMix({ playMix, playing, id, currentMix, children, className, fromMixCloud }) {
    return (
        <div
            className={
                classNames({
                    [className]: className,
                    playing: id === currentMix && playing && fromMixCloud,
                    loading: id === currentMix && !playing && !fromMixCloud
                })
            }
            onClick={() => playMix({ currentMix: id, fromMixCloud: false })}>
            {children}
        </div>
    )
}

export default connect(state => state, actions)(PlayMix)