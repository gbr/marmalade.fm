import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux'

import About from './About';
import Archive from './Archive';
import FeaturedMix from './FeaturedMix';
import Header from './Header';
import Home from './Home';
import Show from './Show';
import Player from './Player';

import mixesData from '../data/mixes';
import actions from '../store/actions'

class App extends Component {

  fetchMixes = async () => {
    const { addMix } = this.props;

    mixesData.map(async id => {
      try {
        const response = await fetch(
          `https://api.mixcloud.com/${id}`
        );
        const data = await response.json();

        addMix(data);
        // console.log(this.state.mixes)
      } catch (error) {
        console.error(error);
      }
    })

  }

  componentDidMount() {
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
    const [firstMix = {}] = this.props.mixes;

    return (
      // router wraps our whole page and lets us use react-router
      <Router>
        {/* outermost container */}
        <div>
          {/* page container */}
          <div className='flex-l justify-end'>`
            <FeaturedMix {...this.state} {...this.actions} {...firstMix} />
            <div className="w-50-l relative z-1">
              <Header />

              {/* Routed page */}
              <Route exact path="/" component={Home} />
              <Route path="/archive" component={Archive} />
              <Route path="/about" component={About} />

              <Route path="/show/:slug" component={Show} />
            </div>
          </div>
          {/* AudioPlayer */}
          <Player />
        </div>
      </Router >
    );
  }
}

export default connect(state => state, actions)(App);
