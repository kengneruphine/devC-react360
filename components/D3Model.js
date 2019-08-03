import React, {PureComponent} from 'react';
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

export default class D3Model extends React.Component {
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
        source={{obj: asset('obj/Residential Buildings 003.obj'), mtl: asset('obj/Residential Buildings 003.mtl')}}
        style={{transform: [
          {translate: [-1, 0, -1]},
          {scaleX: 0.02},
          {scaleY: 0.02},
          {scaleZ: 0.02}
          ]
        }}
      />
    );
  }
};

