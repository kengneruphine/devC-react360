import React,{Component} from 'react';
import {
  View,
  AppRegistry
} from 'react-360';
import { MemoryRouter as Router, Route} from 'react-router';
import Welcome from './pages/welcome';
import Game from './pages/game';
import Dashboard from './pages/dashboard';

export default class Index extends Component{
  render(){
    return(
      <Router>
        <View>
          <Route exact path='/' component={Welcome}/>
          <Route exact path='/welcome' component={Welcome}/>
          <Route exact path='/game' component={Game}/>
          <Route exact path='/dashboard' component={Dashboard}/>
        </View>
      </Router>
    )
  }
}
AppRegistry.registerComponent('Index', () => Index);
