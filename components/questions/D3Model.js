import React from 'react';
import Entity from 'Entity';
import {
  View,
  asset,
} from 'react-360';

export default class D3Model extends React.Component {
  constructor(props){
      super(props)
  }
  render() {
    return (
      <View>
        <Entity
          source={this.props.Model}
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

