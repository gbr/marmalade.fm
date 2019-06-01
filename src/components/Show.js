import React, { Component } from 'react'

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

export default class Show extends Component {
    render() {
        const { match, mixes } = this.props;;

        const [mix = {}] = mixes.filter(mix => mix.slug === match.params.slug)

        return (
            <div className="ph3 ph4-l pad-bottom">
                <div className="measure center lh-copy">
                    <Tags tags={mix.tags} />

                    <p>{mix.description}</p>

                    <Stat statName="Played" statNumber={mix.play_count || 0} statWord="times" />
                    <Stat statName="Uploaded" statNumber={differenceInDays(new Date(), mix.created_time)} statWord="days ago" />
                    <Stat statName="Plays for" statNumber={mix.audio_length} statWord="seconds" />
                </div>
            </div>
        );
    }
}