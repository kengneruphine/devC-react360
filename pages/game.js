import React from 'react';
import {
    AppRegistry,
    Environment,
    StyleSheet,
    Text,
    View,
    Image,
    VrButton,
    asset
} from 'react-360';
import { Button } from 'react-native';
import {NativeModules} from 'react-360';
const {MyModule} = NativeModules;
//import OptionsModule from './components/OptionsModule';
import OptionsModule from '../components/options/OptionsModule';
import { TextImage, TextModel } from '../components/questions/Questions';
const {TemporalStore} = NativeModules;
const options = [{ text: 'Tabitha', id: 'tabitha' }, { text: 'Grace', id: 'grace', ans: true },
{ text: 'Admin', id: 'admin'}, { text: 'Test', id: 'test' }];
const quiz = {
   answer: 'grace',
   answerSelected: false
}
export default class Game extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        answer: ''
      }
      this.showAnswer = this.showAnswer.bind(this)
  } 
  showAnswer(){
     // search quiz for answer
    if(TemporalStore.quiz.answerSelected){
      for( let option of options)
        option.ans? this.setState({answer : option.text}) : ''
    }
  }
  render() {
    return (
      <View style={styles.panel}>
        <View style={{width: 55, marginRight: 20, position: 'relative', left: 20}}>
          <VrButton style={styles.button} >
             <Text>Back</Text>
          </VrButton>
        </View>
        <View style={styles.quizBox}>
          <View style={styles.container}>
            <View style={styles.question}>
               <TextModel Model={{obj: asset('obj/Residential Buildings 003.obj'), mtl: asset('obj/Residential Buildings 003.mtl')}} Text="Here is a serious question." />
            </View>
            <View style={styles.options}>
              <OptionsModule options={options} />
            </View>
          </View>
        </View>
        <View style={[styles.answerContainer, {textAlign: 'center'}]}>
            <Text>{this.state.answer}</Text>
        </View>
        <View style={styles.actionsContainer}>
            <VrButton style={styles.button}  onClick={() => {
              this.props.history.push('./welcome');
            }}>
              <Text
                style={[styles.actions, {backgroundColor: 'red'}]}>
                Back
              </Text>
            </VrButton>

            <VrButton style={styles.button} onClick={() => {
                this.showAnswer()
            }}>
              <Text
                style={[styles.actions, {backgroundColor: 'green'}]}>
                Show Answer
              </Text>
            </VrButton>
            <VrButton  style={styles.button} onClick={() => {
                this.props.history.push('./game');
              }}>
              <Text
                style={[styles.actions, {backgroundColor: 'green'}]}>
                Next
              </Text>
            </VrButton>
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
  quizBox: {
    marginTop: 20,
    position: 'relative',
    left: 50,
    padding: 5,
    backgroundColor: '#000000',
    borderWidth: 2,
    height: 400,
    width: 700,
  },
  answerContainer: {
    height: 50
  },
  options: {
    padding: 5,
    backgroundColor: '#000000',
    borderWidth: 2,
    width: 399,
  },
  button: {
    borderWidth: 1,
    padding: 5,
    margin: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'transparent'
  },
  question: {
    width: 399,
    borderWidth: 2,
    margin: 2,

  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionsContainer: {flex:1, height: 50, flexDirection:'row',width: 200, justifyContent: 'space-between'},
  actions: {
    fontSize: 28,
    fontWeight: '400',
    paddingLeft: 0.5,
    paddingRight: 0.5,
    paddingTop: 0.5,
    paddingBottom: 0.5,
    marginLeft: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  }

});
AppRegistry.registerComponent('Game', () => Game);
