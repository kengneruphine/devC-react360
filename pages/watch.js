import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    VrButton,
    asset,
    Image
} from 'react-360';
import {NativeModules, Environment, staticAssetURL} from 'react-360';
import VideoModule from 'VideoModule';
import videos from '../components/videos/videos.json'
const {TemporalStore, SurfaceManagement} = NativeModules;
// Create a player
var player = null
player = VideoModule.createPlayer('WatchSurface') 
export default class Watch extends React.Component {
  constructor(props){
    super(props)
    SurfaceManagement.props = props
    SurfaceManagement.detachAll()
    SurfaceManagement.attachSurface('WatchOptionsSurface', [-0.8, 0], 400, 500)
    SurfaceManagement.attachSurface('WatchSurface', [0, 0], 700, 500)
    
  } 
  
  render() {
    return (
        <View style={styles.panel}>
        </View>       
    );
  }
};
export class WatchSurface extends React.Component{
    state = {
       currentlyPlaying: 0,
       currentlyPlayingText: "",
       videoLib: videos[TemporalStore.video.currentWatch]
    }
    constructor(props){
        super(props)
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
    }
    componentDidMount(){
        let url = `${TemporalStore.video.currentWatch}/${this.state.videoLib[this.state.currentlyPlaying].link}`
        this.setState({currentlyPlayingText: this.state.videoLib[this.state.currentlyPlaying].label })
        player.play({ source: { url: asset(url).uri}, stereo: '3DTB', autoPlay: false, volume: 1});
        Environment.setScreen(
              'defWatchSurface', /* screen name */
              'WatchSurface', /* player unique id */
              'WatchSurface', /* surface name */
              0, 0, 700, 500 /* relative position on the surface */
        );
    }
    next(){
      this.state.currentlyPlaying= this.state.currentlyPlaying + 1
      const videosCount = videos[TemporalStore.video.currentWatch].length
      // set count to last index.
      if(this.state.currentlyPlaying >= videosCount)
          this.state.currentlyPlaying = videosCount -1
      const url = `${TemporalStore.video.currentWatch}/${this.state.videoLib[this.state.currentlyPlaying].link}`
      player.play({ source: { url: asset(url).uri}, stereo: '3DTB', volume: 1, autoPlay: 'resume'})
      // update label
      Environment.setScreen(
          'defWatchSurface', /* screen name */
          'WatchSurface', /* player unique id */
          'WatchSurface', /* surface name */
          0, 0, 700, 500 /* relative position on the surface */
      );
      this.setState({currentlyPlayingText: this.state.videoLib[this.state.currentlyPlaying].label})
    }
    prev(){
      this.state.currentlyPlaying = this.state.currentlyPlaying == 0 ? this.state.currentlyPlaying : this.state.currentlyPlaying - 1
      const url = `${TemporalStore.video.currentWatch}/${this.state.videoLib[this.state.currentlyPlaying].link}`
      player.play({ source: { url: asset(url).uri}, stereo: '3DTB', autoPlay: 'resume', volume: 1})
      // update label
      Environment.setScreen(
        'defWatchSurface', /* screen name */
        'WatchSurface', /* player unique id */
        'WatchSurface', /* surface name */
         0, 0, 700, 500 /* relative position on the surface */
      );
      this.setState({currentlyPlayingText: this.state.videoLib[this.state.currentlyPlaying].label})
    }
    render () {        
        return <View style={styles.panelWatchSurface}>
                  <VrButton style={styles.playerControls} onClick={this.prev}>
                      <Image style={{
                          width: 50,
                          height: 50,
                      }} source={asset('img/back.png')} />
                  </VrButton>
                  <VrButton style={[styles.playerControls, {left: 620}]}
                     onClick={this.next}>
                      <Image style={{
                          width: 50,
                          height: 50,
                      }} source={asset('img/forward.png')} />
                  </VrButton>
                  <View style={styles.playerLabel}>
                    <Text style={{color: 'black'}}>
                        {this.state.currentlyPlayingText.length < 30 ?
                        this.state.currentlyPlayingText  :
                        this.state.currentlyPlayingText.substring(0, 27) + "..."} {'(' + (this.state.currentlyPlaying + 1) + '/' + this.state.videoLib.length + ')'}
                    </Text>   
                   
                  </View>
              </View>
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
            <Text>Currently watching videos on {TemporalStore.video.currentWatch}</Text>
          </View>
          <View style={[styles.option, {backgroundColor: 'green', borderColor: 'green'}]}>
                    <VrButton style={styles.button}onClick={() => {
                        let url = `${TemporalStore.video.currentWatch}/${videos[TemporalStore.video.currentWatch][0].link}`
                        player.play({ source: { url: asset(url).uri}, stereo: '3DTB', autoPlay: 'resume', volume: 1});
                        Environment.setScreen(
                              'defWatchSurface', /* screen name */
                              'WatchSurface', /* player unique id */
                              'WatchSurface', /* surface name */
                              0, 0, 700, 500 /* relative position on the surface */
                        );
                      
                    }}>
                        <Text style={{textAlign: 'center'}}>
                            Play
                        </Text>
                    </VrButton>
            </View>
          <View style={[styles.option, {backgroundColor: 'red', borderColor: 'red'}]}>
                    <VrButton style={styles.button}onClick={() => {
                        VideoModule.destroyPlayer('WatchSurface')
                        SurfaceManagement.props.history.push('/watch/options')
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
    backgroundColor: "transparent",
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 5,
    position: 'relative'
  },
  playerControls: {
     height: 50,
     width: 50,
     position: 'absolute',
     top: 200
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

