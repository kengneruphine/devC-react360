import React from 'react';
import {
    AppRegistry,
    Environment,
    StyleSheet,
    Text,
    View,
    VrButton,
    Image,
    asset
} from 'react-360';
import {NativeModules} from 'react-360';
import videos from '../components/videos/videos.json'
const {TemporalStore, SurfaceManagement} = NativeModules;
const Diseases = Object.keys(videos)

export default class WatchOptions extends React.Component {
  constructor(props){
      super(props)
      SurfaceManagement.detachAll()
  } 
  
  render() {
    return (
      <View style={styles.panel}>
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <Text style={{textAlign: 'center', padding: 2}}>Watch educational videos on</Text>
            </View>
          {
              Diseases.map( (disease, i) => (
              <View key={disease} style={styles.option}>
                    <VrButton style={styles.button} onClick={ () => { 
                        TemporalStore.video.currentWatch = disease
                        this.props.history.push('/watch/see')
                    }}>
                        <Text>{videos[disease].title}</Text>
                    </VrButton>
            </View>))
          }
            <View style={[styles.option, {backgroundColor: 'transparent', borderWidth: 0, position: 'relative'}]}>
                      
                      <VrButton  onClick={() => this.props.history.goBack()} style={{position: 'relative', left: 110}}>
                      <Image style={{
                              width: 40,
                              height: 40,
                          }}
                              source={asset('img/nav_back.png')} />  
                  </VrButton>
            </View>
          </View>
          
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    paddingTop: 10,
    position: 'relative',
    width: 1000,
    height: 600,
    backgroundColor: 'black',
  },
  listContainer:{
    position: 'relative',
    top: 50,
    left:350,
    width: 300
  },
  option: {
    borderColor: 'white',
    marginBottom: 20,
    height: 50,
    padding: 10,
    borderWidth: 2,
  },
  header:{
    margin: 20,
    backgroundColor: '#3267FC'
  }

});
AppRegistry.registerComponent('WatchOptions', () => WatchOptions);
