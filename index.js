import React from 'react';
import Entity from 'Entity';
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image
} from 'react-360';
import D3Model from './components/D3Model';

export default class Hello360 extends React.Component {
  state = {
    count: 0,
  };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrementCount = () => {
    this.setState({ count: this.state.count - 1 });
  }
  render() {
    return (
      <D3Model />
    );
  }
};

// todo
// insert a 3D image into the tutorial
// go through the tutorials on the react360 website
// learn more about the components

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    // width: 1000,
    // height: 1000,
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    maxHeight : 500,
    maxWidth: 500,
  },
  greeting: {
    fontSize: 30,
  },
  button: {
    width:50,
    borderColor: '#639dda',
    borderWidth: 2,
    padding: 15,
    margin: 1,
  },
});

AppRegistry.registerComponent('Hello360', () => Hello360);
