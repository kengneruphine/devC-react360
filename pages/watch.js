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
export default class Watch extends React.Component {
  constructor(props){
    super(props)
    SurfaceManagement.props = props
    SurfaceManagement.detachAll()
    SurfaceManagement.attachSurface('WatchSurface', [0, 0.03], 650, 600)  
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
       videoLib: videos[TemporalStore.video.currentWatch]['videos'],
       pause: false,
       started: false,
       videoId: Math.floor(Math.random() * 100),
       surfaceColor: 'black'
    }
    constructor(props){
        super(props)
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
        this.play = this.play.bind(this)

        
    }
    componentDidMount(){
        let url = `${TemporalStore.video.currentWatch}/${this.state.videoLib[this.state.currentlyPlaying].link}`
        player = VideoModule.createPlayer('WatchSurface' + this.state.videoId) 
        console.log('WatchSurface' + this.state.videoId)
        player.play({ source: { url: asset(url).uri}, stereo: '2D', autoPlay: false, volume: 1});
        Environment.setScreen(
              'defWatchSurface' + this.state.videoId, /* screen name */
              'WatchSurface' + this.state.videoId, /* player unique id */
              'WatchSurface', /* surface name */
              0, 0, 650, 600 /* relative position on the surface */
        );
        console.log('component did mount')
    }
    componentWillUnmount() {
      VideoModule.destroyPlayer('WatchSurface' + this.state.videoId)
    }
    play(){
      if(this.state.pause){
          this.state.pause = false
          return player.pause()
      }
      let url = `${TemporalStore.video.currentWatch}/${this.state.videoLib[0].link}`
      if(this.state.started && this.state.pause == false){
        this.state.pause = true
        player.resume()
      }else {
        player.play({ source: { url: asset(url).uri}, stereo: '2D', autoPlay: 'resume', volume: 1});
        Environment.setScreen(
              'defWatchSurface' + this.state.videoId, /* screen name */
              'WatchSurface' + this.state.videoId, /* player unique id */
              'WatchSurface', /* surface name */
              0, 0, 650, 600 /* relative position on the surface */
        );
        this.state.started = true
        this.setState({surfaceColor: 'transparent', currentlyPlayingText: this.state.videoLib[this.state.currentlyPlaying].label })
      }
      
    }
    next(){
      this.state.currentlyPlaying= this.state.currentlyPlaying + 1
      const videosCount = this.state.videoLib.length
      // set count to last index.
      if(this.state.currentlyPlaying >= videosCount)
          this.state.currentlyPlaying = videosCount -1
      const url = `${TemporalStore.video.currentWatch}/${this.state.videoLib[this.state.currentlyPlaying].link}`
      player.play({ source: { url: asset(url).uri}, stereo: '2D', volume: 1, autoPlay: 'resume'})
      // update label
      Environment.setScreen(
          'defWatchSurface' + this.state.videoId, /* screen name */
          'WatchSurface' + this.state.videoId, /* player unique id */
          'WatchSurface', /* surface name */
          0, 0, 650, 600 /* relative position on the surface */
      );
      this.setState({currentlyPlayingText: this.state.videoLib[this.state.currentlyPlaying].label})
    }
    prev(){
      this.state.currentlyPlaying = this.state.currentlyPlaying == 0 ? this.state.currentlyPlaying : this.state.currentlyPlaying - 1
      const url = `${TemporalStore.video.currentWatch}/${this.state.videoLib[this.state.currentlyPlaying].link}`
      player.play({ source: { url: asset(url).uri}, stereo: '2D', autoPlay: 'resume', volume: 1})
      // update label
      Environment.setScreen(
        'defWatchSurface' + this.state.videoId, /* screen name */
        'WatchSurface' + this.state.videoId, /* player unique id */
        'WatchSurface', /* surface name */
         0, 0, 650, 600 /* relative position on the surface */
      );
      this.setState({currentlyPlayingText: this.state.videoLib[this.state.currentlyPlaying].label})
    }
    render () {        
        return <View style={[styles.panelWatchSurface, {position: 'relative', backgroundColor: this.state.surfaceColor,
      }]}>
                <View style={{borderWidth: 0, position: 'absolute', top: 5, left: 5}}>
                    <VrButton style={styles.button}onClick={() => {
                        SurfaceManagement.props.history.goBack()
                    }}>
                        <Image style={{
                              width: 40,
                              height: 40,
                          }}
                              source={asset('img/nav_back.png')} />
                    </VrButton>
                </View>
                <View style={{backgroundColor: 'rgba(0, 0, 0, 0.4)', height: 100, borderWidth: 0, position: 'relative', top: 500}}>
                    <View>
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 14}}>
                            {this.state.currentlyPlayingText.length < 30 ?
                            this.state.currentlyPlayingText  :
                            this.state.currentlyPlayingText.substring(0, 27) + "..."} {'(' + (this.state.currentlyPlaying + 1) + '/' + this.state.videoLib.length + ')'}
                        </Text>   
                      </View>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'space-between'}}>
                          <View>
                            <VrButton onClick={this.prev} >
                                <Image style={{
                                    width: 50,
                                    height: 50,
                                }} source={asset('img/back.png')} />
                            </VrButton>
                          </View>
                          <View>
                            <VrButton onClick={this.play} >
                                <Image style={{
                                    width: 50,
                                    height: 50,
                                }} source={asset('img/play.png')} />
                            </VrButton>
                          </View>
                          <View>
                            <VrButton onClick={this.next}>
                                <Image style={{
                                    width: 50,
                                    height: 50,
                                }} source={asset('img/forward.png')} />
                            </VrButton>
                          </View>
                          
                      </View>
                </View>                  
              </View>
    }
}



const styles = StyleSheet.create({
  panel: {
    display: 'none'
  },
  panelWatchOptions:{
    height: 200,
    width: 300,
    backgroundColor: "black"
  },
  panelWatchSurface:{
    height: 600,
    width: 650,
    position: 'relative',
    borderWidth: 0
  },
  playerControls: {
     height: 50,
     width: 50,
     position: 'relative',
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


AppRegistry.registerComponent('WatchSurface', () => WatchSurface);
//AppRegistry.registerComponent('Watch', () => Watch);

