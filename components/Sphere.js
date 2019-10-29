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

export default class Sphere extends React.Component {
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
      <Entity
        source={{gltf2: asset('sphere/scene.gltf')}}
        style={{transform: [
          {translate: [5, 0, -10]},
          {scaleX: 0.02},
          {scaleY: 0.02},
          {scaleZ: 0.02}
          ]
        }}
      />
    );
  }
};

