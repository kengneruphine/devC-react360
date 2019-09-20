import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    VrButton
} from 'react-360';
import {NativeModules, Environment, VideoModule, staticResourceURL} from 'react-360';

import videos from '../components/videos/videos.json'
const {TemporalStore, SurfaceManagement} = NativeModules;
// Create a player
var player = null 
//player = VideoModule.createPlayer('WatchSurface')
//player.setSource(staticResourceURL('malaria/1. What is Malaria.mp4'));
Environment.setScreen(
    'WatchSurface', /* screen name */
    'WatchSurface', /* player unique id */
    'WatchSurface', /* surface name */
    0, 0, 600, 500 /* relative position on the surface */
);
export default class Watch extends React.Component {
  constructor(props){
    super(props)
    SurfaceManagement.props = props
    SurfaceManagement.detachAll()
    SurfaceManagement.attachSurface('WatchOptionsSurface', [-0.8, 0], 400, 500)
    SurfaceManagement.attachSurface('WatchSurface', [0, 0], 600, 500)
    
    
        // Or, play in-line on a surface
    
  } 
  
  render() {
    return (
        <View style={styles.panel}>
        </View>       
    );
  }
};
export class WatchSurface extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        player.play()
    }
    render () {        
        return (<View style={styles.panelWatchSurface}></View>)
    }
}
export class WatchOptionsSurface extends React.Component{
    state = {
        VideoList: [],
        display: []
    }
    constructor(props){
        super(props)
        this.state.VideoList = videos[TemporalStore.video.currentWatch]
        
    }
    render(){
      return (
        <View style={styles.panelWatchOptions}>
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <Text>Selection</Text>
          </View>
        {
        this.state.VideoList.slice(0,5).map( (video, i) => (
            <View key={i} style={styles.option}>
                  <VrButton style={styles.button} onClick={ () => { 
                      TemporalStore.video.watchSelected = i
                  }}>
                      <Text>{video.label.length < 30 ? video.label : video.label.substring(0, 27) + "..."}</Text>
                  </VrButton>
          </View>))
        }
          <View style={[styles.option, {backgroundColor: 'red', borderColor: 'red'}]}>
                    <VrButton style={styles.button}onClick={() => {
                        SurfaceManagement.props.history.push('./watch/options')
                    }}>
                        <Text style={{textAlign: 'center'}}>
                            Back
                        </Text>
                    </VrButton>
            </View>
        </View>
        
    </View>)
    }
}


const styles = StyleSheet.create({
  panel: {
   display: 'none'
  },
  panelWatchOptions:{
    height: 500,
    width: 400,
    backgroundColor: "black"
  },
  panelWatchSurface:{
    height: 500,
    width: 700,
    backgroundColor: "black"
  },
  listContainer:{
    position: 'relative',
    top: 50,
    left: 20,
    width: 400
  },
  option: {
    borderColor: 'white',
    marginBottom: 20,
    height: 50,
    padding: 10,
    borderWidth: 2,
    width: 300
  }
});


AppRegistry.registerComponent('WatchOptionsSurface', () => WatchOptionsSurface);
AppRegistry.registerComponent('WatchSurface', () => WatchSurface);

