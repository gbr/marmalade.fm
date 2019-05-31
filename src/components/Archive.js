import React from 'react'

import PlayButton from './PlayButton';
import PlayMix from './PlayMix';

export default function Archive({ mixes, ...props }) {
    return (
        <ul className="list pl0 archive mv0 pad-bottom">
            {mixes.map(mix => (
                <li className="ph3 ph4-l">
                    <PlayMix {...props} id={mix.key}>
                        <div className="pv3 bb b--light-gray flex justify-between items-center">
                            <h1 className="f6 mv0 black ttu biryani pr2">{mix.name}</h1>
                            {mix.name}

                            <PlayButton />
                        </div>
                    </PlayMix>
                </li>
            ))}
        </ul>
    )
}
