import React from 'react'
import { connect } from 'react-redux';
import differenceInDays from 'date-fns/difference_in_days'

import Stat from './Stat'

const Tag = ({ name, url }) => (
    <div className="mr2 mb2 o-70">
        <a target="_blank" rel="noopener noreferrer" href={url} className="block f6 link blue b ba bw1 b--blue br2 pv1 ph2 lh-title">
            {name}
        </a>
    </div>
)

const Tags = ({ tags = [] }) => (
    <div className="tags flex flex-wrap">
        {tags.map(tag => <Tag {...tag} />)}
    </div>
)

const Show = ({ tags, description, play_count, created_time, audio_length }) => (
    <div className="ph3 ph4-l pad-bottom">
        <div className="measure center lh-copy">
            <Tags tags={tags} />

            <p>{description}</p>

            <Stat statName="Played" statNumber={play_count || 0} statWord="times" />
            <Stat statName="Uploaded" statNumber={differenceInDays(new Date(), created_time)} statWord="days ago" />
            <Stat statName="Plays for" statNumber={audio_length} statWord="seconds" />
        </div>
    </div>
)

// this is called a selector—it takes a certain piece of data from our state
const getMix = (mixes, slug) => {
    const [mix = {}] = mixes.filter(mix => mix.slug === slug);
    return mix;
}

export default connect((state, props) => ({
    ...getMix(state.mixes, props.match.params.slug)
}))(Show)