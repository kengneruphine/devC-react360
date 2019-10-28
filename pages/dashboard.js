import React from 'react';
import { history } from '../utils'
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

// Play environmental audio:
const { AudioModule, VideoModule, SurfaceManagement } = NativeModules;

/* AudioModule.playEnvironmental({
  source: ('John Legend -All of Me (lyrics).mp3'),
  volume: 0.7, // play at 3/10 original volume
});

VideoModule.createPlayer('myplayer');

VideoModule.play('myplayer', {
  source: { url: '/things/long.mp4' },
  loop: false,
});
Environment.setBackgroundVideo('myplayer'); */

export default class Dashboard extends React.Component {
  constructor(props){
    super(props)
    SurfaceManagement.props = props
    SurfaceManagement.attachSurface('VideoCard',[-0.7, 0] )
    SurfaceManagement.attachSurface('QuizCard', [0, 0] )
    SurfaceManagement.attachSurface('ExploreCard',[0.7, 0] )
  }
  render() {
    return (
      <View style={[styles.panel, {display: 'none'}]}>
      </View>
    );
  }
};

export class QuizCard extends React.Component{
    render(){
      return (
        <View style={styles.card}>
            <Image source={asset('img/quiz.png')} style={{
              width: 500,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }} />
            <ButtonLink link={'/game/options'} text={'Quiz'}/>
        </View>)
    }
}
export class ExploreCard extends React.Component{
 
    render(){
      return (
        <View style={styles.card}>
            <Image source={asset('img/explore.png')} style={{
              width: 500,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }} />
            <ButtonLink link={'/explore'} text={'Explore'}/>
        </View>)
    }
}

export class ButtonLink extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
  }
  render(){
    return (<View  style={[styles.cardLabel]} >
        <VrButton onClick={() => {
          SurfaceManagement.props.history.push(this.props.link)
        }} >
          <Text>{this.props.text}</Text>
        </VrButton>
      </View>)
  }
}
export class VideoCard extends React.Component{
    render(){
      return (
        <View style={styles.card}>
             <Image source={asset('img/watch.png')} style={{
              width: 500,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }} />
            <ButtonLink link={'./watch/options'} text={'Watch'}/>
        </View>)
    }
}



const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
      height: 300,
      width: 500,
      borderColor: "#3267FC",
      borderWidth: 1,
      position: 'relative',
      borderRadius: 10,
  },
  cardLabel:{
    position: 'absolute',
    top: 100,
    left: 220,
    width: 80,
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center'
  },
  button: {
    width: 50,
    borderColor: '#639dda',
    borderWidth: 2,
    padding: 15,
    margin: 1,
  }
});
 
AppRegistry.registerComponent('QuizCard', () => QuizCard);
AppRegistry.registerComponent('VideoCard', () => VideoCard);
AppRegistry.registerComponent('ExploreCard', () => ExploreCard); 
