import React,{Component} from 'react';
import {
  View,
} from 'react-360';
import { MemoryRouter as Router, Redirect, Route, Switch } from 'react-router';
import welcome from './welcome';
import trying from './trying';
import index from '../index';

export default class Routes extends Component{
  render(){
    return(
      <Router>
        <View>
          <Route exact path='/' component={welcome}/>
          <Route exact path='/welcome' component={welcome}/>
          <Route exact path='/trying' component={trying}/>
          <Route exact path='/index' component={index}/>
        </View>
      </Router>
    )
  }
}