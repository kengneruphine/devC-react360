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
// play environental Video
const { VideoModule, AudioModule, SurfaceManagement} = NativeModules;
console.log(SurfaceManagement.surfaces);
/* AudioModule.playEnvironmental({
  source: ('John Legend -All of Me (lyrics).mp3'),
  volume: 0.7, // play at 3/10 original volume
}); */

/* VideoModule.createPlayer('myplayer');

VideoModule.play('myplayer', {
  source: { url: '/things/long.mp4' },
  loop: false,
});
Environment.setBackgroundVideo('myplayer'); */
 // detach other surfaces
export default class Welcome extends React.Component {
  constructor(props){
    super(props)
    SurfaceManagement.detachAll()
  }
  render() {
    return (
      <View style={styles.panel}>

          <View style={styles.panel} >
            <Image source={asset('wecomeimg.jpg')} style={{
              width: 1000,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }} />
            <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>
               HealthPro educating you on Africa's most deadly diseases through VR.
            </Text>
            <VrButton onClick={() => {
            this.props.history.push('./dashboard')
          }} 
           style={{
            borderColor: '#639dda',
            borderWidth: 5,
            padding: 15,
            margin: 3,
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  }
});

