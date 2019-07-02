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

// this is called a selector—it takes a certain piece of data from our state
const getMix = (mixes) => {
    const [firstMix = {}] = mixes
    return firstMix;
}

export default connect(state => ({
    ...getMix(state.mixes)
}))(FeaturedMix)