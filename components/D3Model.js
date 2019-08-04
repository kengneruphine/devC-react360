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

export default class D3Model extends React.Component {
  render() {
    return (
      <Entity
        source={{obj: asset('obj/Residential Buildings 003.obj'), mtl: asset('obj/Residential Buildings 003.mtl')}}
        style={{transform: [
          {translate: [-1.5, -1, -4]},
          {scaleX: 0.09},
          {scaleY: 0.09},
          {scaleZ: 0.09},
          {rotateX: 0},
          {rotateY: 150},
          {rotateZ: 0},
          ]
        }}
      />
    );
  }
};

