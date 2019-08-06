import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  asset,
  VrButton,
  Environment,
Image
} from 'react-360';

import Entity from 'Entity';

Environment.setBackgroundImage(asset('chess-world.jpg'))

export default class trying extends React.Component {

  render() {
    return (
      <View style={styles.panel}>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.tile}><Image source={asset('wlc.webp')} style={{
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }} /></View>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>

        <VrButton onClick={() => {
            this.props.history.goBack();
          }}>
            <Text
              style={{
                backgroundColor: 'red',
                fontSize: 30,
                fontWeight: '500',
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{ translate: [-6, 0, -3] }],
              }}>
              Back to Game Page.....
          </Text>
          </VrButton>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(25, 274, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: 'red',
    borderWidth: 2,
    height: 400,
    width: 750,
  },
  greeting: {
    fontSize: 30,
  },
  button: {
    width: 50,
    borderColor: '#639dda',
    borderWidth: 2,
    padding: 15,
    margin: 1,
  },
  tile: {
    width: 100,
    height: 100,
    borderWidth: 9,
    borderColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


});

