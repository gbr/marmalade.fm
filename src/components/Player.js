/* global Mixcloud */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../store/actions'

class Player extends Component {

    // gets props whenever they change
    componentWillReceiveProps(nextProps) {
        // const { playMix } = this.props;
        if (!nextProps.widgetReady) return;

        if (nextProps.currentMix !== this.props.currentMix) {
            // if there is a new mix in the props
            // start playing the mix
            this.widget.load(nextProps.currentMix, true);
            /// if the event hasn't come from mixcloud, we want to
            // toggle the play/pause on our audio
        } else if (!nextProps.fromMixCloud) {
            this.widget.togglePlay();
        }
        // playMix({
        //     playing: this.widget.getIsPaused(),
        //     fromMixCloud: nextProps.fromMixCloud
        // })
    }

    mountAudio = async () => {
        const { playMix, setWidgetReady } = this.props;
        this.widget = Mixcloud.PlayerWidget(this.player);
        await this.widget.ready;

        setWidgetReady(true);

        // TODO on load, set this to the featured mix

        // using the mixcloud widget events we can detect when our
        // audio has been paused, set playing state to false
        this.widget.events.pause.on(() =>
            playMix({
                playing: false,
                fromMixCloud: true
            })
        );
        // audio is playing again, set playing state to true
        this.widget.events.play.on(() =>
            playMix({
                playing: true,
                fromMixCloud: true
            })
        );
    };

    componentDidMount() {
        this.mountAudio();
    }

    render() {
        return (
            <iframe
                title="Marmalade Player"
                src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&feed=%2Fspartacus%2Fparty-time%2F"
                width="100%" height="60" frameBorder="0" className="player db fixed bottom-0 z-5"
                ref={player => this.player = player}
            />
        )
    }
}

export default connect(state => state, actions)(Player)