/* global Mixcloud */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import About from './About';
import Archive from './Archive';
import FeaturedMix from './FeaturedMix';
import Header from './Header';
import Home from './Home';
import Show from './Show';

import mixesData from '../data/mixes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentMix: '',
      mixIds: mixesData,
      mix: null,
      mixes: []
    }
  }

  fetchMixes = async () => {
    const { mixIds } = this.state;

    mixIds.map(async id => {
      try {
        const response = await fetch(
          `https://api.mixcloud.com/${id}`
        );
        const data = await response.json();

        this.setState((prevState, props) => ({
          mixes: [...prevState.mixes, data]
        }));
        // console.log(this.state.mixes)
      } catch (error) {
        console.error(error);
      }
    })

  }

  mountAudio = async () => {
    this.widget = Mixcloud.PlayerWidget(this.player);
    await this.widget.ready;

    // using the mixcloud widget events we can detect when our
    // audio has been paused, set playing state to false
    this.widget.events.pause.on(() =>
      this.setState({
        playing: false
      })
    );
    // audio is playing again, set playing state to true
    this.widget.events.play.on(() =>
      this.setState({
        playing: true
      })
    );
  };

  componentDidMount() {
    this.mountAudio();
    this.fetchMixes();
  }

  actions = {
    togglePlay: async () => {
      this.widget.togglePlay();
    },
    playMix: async mixName => {
      // if the mixName is the same as the currently
      // playing mix, we want to pause it instead of starting a new stream
      const { currentMix } = this.state;
      if (mixName === currentMix) {
        return this.widget.togglePlay();
      }
      this.setState({
        currentMix: mixName
      });
      await this.widget.load(mixName, this.state.playing);
      await this.mountAudio();
      return this.widget.togglePlay();
    }
  }


  render() {
    // if array is empty, assign default value of empty object
    const [firstMix = {}] = this.state.mixes;

    return (
      // router wraps our whole page and lets us use react-router
      <Router>
        {/* outermost container */}
        <div>
          {/* page container */}
          <div className='flex-l justify-end'>
            <FeaturedMix {...this.state} {...this.actions} {...firstMix} id={firstMix.key} />
            <div className="w-50-l relative z-1">
              <Header />

              {/* Routed page */}
              <Route exact path="/" render={() => <Home {...this.state} {...this.actions} />} />
              <Route path="/archive" render={() => <Archive {...this.state} {...this.actions} />} />
              <Route path="/about" render={() => <About {...this.state} />} />

              <Route path="/show/:slug" render={routeParams => <Show {...routeParams} {...this.state} />} />
            </div>
          </div>
          {/* AudioPlayer */}
          <iframe title="Marmelade Player" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&feed=%2Fspartacus%2Fparty-time%2F" width="100%" height="60" frameBorder="0" className="player db fixed bottom-0 z-5" ref={player => this.player = player} />
        </div>
      </Router >
    );
  }
}

export default App;
