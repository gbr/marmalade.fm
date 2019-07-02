import React from 'react';
import { connect } from 'react-redux'

import PlayButton from './PlayButton';
import PlayMix from './PlayMix';

const FeaturedMix = ({ name, pictures = {}, ...props }) => (
    <div className='w-50-l vh-100 flex items-center justify-center cover bg-center bg-featured pad-bottom fixed-l left-0 mix-overlay' style={{ backgroundImage: `url(${pictures.extra_large})` }}>
        <PlayMix {...props} >
            <div className="w-100 tc pa3 relative z-2">
                <p className="b biryani f6 white ttu">Featured Mix</p>
                <h1 className="mix-title mt0 mb3 anton white ttu">{name}</h1>
                <PlayButton />
            </div>
        </PlayMix>
    </div>
)

// on the show page, we are going to set the featuredMix
// to be teh currently viewed mix

// if there's a mix playing, we want to set that as our
// featured mix

// if neither, we want to display our first mix as our featured mix

// this is called a selector—it takes a certain piece of data from our state
const getMix = (state) => {
    // 1. if we have a featuredMix in redux, we show that first
    // 2. if there's a currently playing mix, we show that next
    // 3. otherwise, we just show the first mix

    const [featuredMix] = state.mixes.filter(mix => mix.id === state.featuredMix)

    const [playingMix] = state.mixes.filter(mix => mix.id === state.currentMix)

    const [firstMix = {}] = state.mixes

    return featuredMix || firstMix;
}

export default connect(state => ({
    ...getMix(state)
}))(FeaturedMix)