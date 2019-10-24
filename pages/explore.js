import React from 'react';
import {
    AppRegistry,
    Environment,
    StyleSheet,
    Text,
    View,
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
              <Text>Select an option to Explore</Text>
            </View>
          {
              Diseases.map( (disease, i) => (
              <View key={disease} >
                    <VrButton style={styles.button} onClick={ () => { 
                        TemporalStore.quiz.currentQuiz = disease
                        this.props.history.push('/explore/one')
                    }}>
                        <Text>{disease[0].toUpperCase() +  disease.slice(1).toLowerCase()}</Text>
                    </VrButton>
            </View>))
          }
            <View style={[styles.option, {backgroundColor: 'red', borderColor: 'red'}]}>
                      <VrButton onClick={ () => { 
                          this.props.history.goBack()
                      }}>
                          <Text style={{textAlign: 'center'}}>
                              Back
                          </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  listContainer:{
    position: 'relative',
    top: 50,
    left:350,
    width: 300
  },
  button: {
    borderColor: '#639dda',
    borderWidth: 5,
    padding: 15,
    margin: 3
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
  }

});
AppRegistry.registerComponent('Explore', () => Explore);
