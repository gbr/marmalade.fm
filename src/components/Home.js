import React from 'react';

import Mix from './Mix';

const Home = ({ mixes, ...props }) => (
    <div className="flex flex-wrap justify-between mixes ph3 ph4-l pad-bottom mb5">
        {/* loop through all mixes */}
        {mixes.slice(0, 6).map((mix, idx) => (
            <div key={idx} className="mix mb4">
                <Mix  {...props} {...mix} id={mix.key} />
            </div>
        ))}
    </div>
)

export default Home;