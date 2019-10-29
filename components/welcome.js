import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment,
  Image,
  asset,
  VrButton,
  staticResourceURL,
  NativeModules,
} from 'react-360';

<<<<<<< HEAD
=======
import trying from './trying';
>>>>>>> ea714d0cfda84917768595dc327047d9154b5349

// Play environmental audio:
const { AudioModule } = NativeModules;

AudioModule.playEnvironmental({
  source: ('John Legend -All of Me (lyrics).mp3'),
  volume: 0.5, // play at 3/10 original volume
});

// play environental Video
const { VideoModule } = NativeModules;

VideoModule.createPlayer('myplayer');

VideoModule.play('myplayer', {
  source: { url: '/things/long.mp4' },
  loop: false,
});

Environment.setBackgroundVideo('myplayer');

export default class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        
          <View>
            <Image source={asset('wlc.webp')} style={{
              width: 1000,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }} />
            <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>
              HealthPro educates on Africa's most deadly diseases through VR.
            </Text>
          </View>
          <VrButton onClick={() => {
            this.props.history.push('./index')
          }} 
           style={{backgroundColor: 'red',
          }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '700',
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              GET STARTED
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
    backgroundColor: 'rgba(45, 274, 255, 0.4)',
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
  question: {
    width: 300,
    height: 200,
    borderColor: '#639dda',
    borderWidth: 2,
    margin: 2,

  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


});
<<<<<<< HEAD
=======

//AppRegistry.registerComponent('Hello360', () => Routes);
>>>>>>> ea714d0cfda84917768595dc327047d9154b5349
