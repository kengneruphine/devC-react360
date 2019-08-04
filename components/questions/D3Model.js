import React from 'react';
import Entity from 'Entity';
import {
  View,
  asset,
} from 'react-360';

export default class D3Model extends React.Component {
  render() {
    return (
      <View>
        <Entity
          source={{obj: asset('obj/Residential Buildings 003.obj'), mtl: asset('obj/Residential Buildings 003.mtl')}}
          style={{
            transform: [
              {translate: [-1, 0, -1]},
              {scaleX: 0.02},
              {scaleY: 0.02},
              {scaleZ: 0.02}
            ]
          }}
        />
      </View>
    );
  }
};

