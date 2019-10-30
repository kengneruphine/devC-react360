import React from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    asset,
    VrButton
} from 'react-360';
import {NativeModules} from 'react-360';
import questions from '../components/questions/questions.json'
const {TemporalStore, SurfaceManagement} = NativeModules;
const Diseases = Object.keys(questions)

export default class Explore extends React.Component {
  constructor(props){
      super(props)
      SurfaceManagement.detachAll()
  } 
  render() {
    return (
      <View style={styles.panel}>
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <Text style={{textAlign: 'center', padding: 2}}>Select an option to Explore</Text>
            </View>
          {
              Diseases.map( (disease, i) => (
              <View key={disease} style={styles.option}>
                    <VrButton style={styles.button} onClick={ () => { 
                        TemporalStore.quiz.currentQuiz = disease
                        this.props.history.push('/explore/one')
                    }}>
                        <Text style={{color: 'white'}}>{questions[disease].title}</Text>
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
    backgroundColor: 'rgba(88, 21, 26, 0.8)',
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
    borderWidth: 3,
  },
  header:{
    margin: 20,
    backgroundColor: '#3267FC'
  }

});
AppRegistry.registerComponent('Explore', () => Explore);
