import React from 'react';
import Stat from './Stat';

export default function About({ mixes }) {
    return (
        <div className="ph3 ph4-l pad-bottom">
            <div className="measure center lh-copy">

                <p className="mt0">
                    Marmalade.fm features the latest and greatest in grooves, beats and world music.
                </p>
                <p className="mb4">
                    Whether you’re into hip hop, trip hop, classic jazz, fusion jazz, afro beat or break beat… we have you covered!
                </p>

                <Stat statName='Featuring...' statNumber={mixes.length} statWord="mixes" />
                <Stat statName='Played...' statNumber={mixes.reduce((accumulator, current) => accumulator + current.play_count, 0)} statWord="times" />
                <Stat statName='For...' statNumber={mixes.reduce((accumulator, current) => accumulator + current.audio_length, 0)} statWord="seconds" />

            </div>
        </div>
    )
}
