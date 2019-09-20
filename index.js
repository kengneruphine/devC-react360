import React,{Component} from 'react';
import {
  View,
  AppRegistry
} from 'react-360';
import { MemoryRouter as Router, Route} from 'react-router';
import Welcome from './pages/welcome';
import Game from './pages/game';
import GameOptions from './pages/gameOptions';
import WatchOptions from './pages/watchOptions';
import Watch from './pages/watch';
import Dashboard from './pages/dashboard';
import Explore from './pages/explore';
import ExploreOne from './pages/exploreone';
import * as Store from './components/Store';
Store.initialize('API KEY HERE');

export default class Index extends Component{
  render(){
    return(
      <Router>
        <View>
          <Route exact path='/' component={Welcome}/>
          <Route exact path='/watch/options' component={WatchOptions} />
          <Route exact path='/watch/see' component={Watch} />
          <Route exact path='/welcome' component={Welcome}/>
          <Route exact path='/game/options' component={GameOptions}/>
          <Route exact path='/game/play' component={Game}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/explore' component={Explore}/>
          <Route exact path='/explore/one' component={ExploreOne}/>
        </View>
      </Router>
    )
  }
}
AppRegistry.registerComponent('Index', () => Index);
