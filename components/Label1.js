import React from 'react';
import Entity from 'Entity';
import {
  asset,
  StyleSheet,
  View,
  Text,
} from 'react-360';

export default class Label1 extends React.Component {
  render() {
    return (
      <View>
        <Entity
          source={{obj: asset('stick_v2_L2.123c304ec6b2-99b9-4e85-8d80-e707001de4df/11747_stick_v2_L2.obj'), mtl: asset('stick_v2_L2.123c304ec6b2-99b9-4e85-8d80-e707001de4df/11747_stick_v2_L2.mtl')}}
          style={{transform: [
            {translate: [-1.5, 0.8, -4]},
            {scaleX: 0.04},
            {scaleY: 0.03},
            {scaleZ: 0.09},
            // {rotateX: 0},
            {rotateY: 95},
            // {rotateZ: 0},
            ]
          }}
        />
        <Text style={
          styles.label,
          {transform: [
            {translate: [0.7, 0.8, -4]},
            {scaleY: 2},
          ]}
        }>
          Hello
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    // fontSize: 60,
  }
});