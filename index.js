import React,{Component} from 'react';
import {
  View,
  AppRegistry
} from 'react-360';
import { MemoryRouter as Router, Route} from 'react-router';
import Welcome from './pages/welcome';
import Game from './pages/game';

export default class Index extends Component{
  render(){
    return(
      <Router>
        <View>
          <Route exact path='/' component={Welcome}/>
          <Route exact path='/welcome' component={Welcome}/>
          <Route exact path='/game' component={Game}/>
        </View>
      </Router>
    )
  }
}
AppRegistry.registerComponent('Index', () => Index);
