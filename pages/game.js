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
import {NativeModules} from 'react-360';
//import OptionsModule from './components/OptionsModule';
import OptionsModule from '../components/options/OptionsModule';
import { TextImage, TextModel, SimpleText } from '../components/questions/Questions';
const {TemporalStore, SurfaceManagement} = NativeModules;
// load the questions
import questions from '../components/questions/questions.json'

export default class Game extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        answer: '',
        correctAnswers: 0,
        showScore: false,
        questions: questions[TemporalStore.quiz.currentQuiz],
        options: null,
        currentQuestionIndex: 0
      }
      this.showAnswer = this.showAnswer.bind(this)
      this.nextQuestion = this.nextQuestion.bind(this)
      this.formQuestion = this.formQuestion.bind(this)
      this.prevQuestion = this.prevQuestion.bind(this)
      this.showQuiz = this.showQuiz.bind(this)
    
  } 
  componentDidMount(){
      this.showQuiz()
  }
  formQuestion(question){
      let jsxFormatedQuestion = null
      switch(question.type){
        case 'simple':
          jsxFormatedQuestion = <SimpleText Text={question.text} />
          break
        default:
      }
      return jsxFormatedQuestion
  }
  showQuiz(){
    const question = this.state.questions[this.state.currentQuestionIndex]
    const options = question.options
    this.setState({currentQuestion: this.formQuestion(question), currentQuestionOptions: options})
  }
  showAnswer(){
     // search quiz for answer
    if(TemporalStore.quiz.answerSelected){
      for( let option of options)
        option.ans? this.setState({answer : option.text}) : ''
    }
  }
  nextQuestion(){
    this.state.currentQuestionIndex = this.state.currentQuestionIndex + 1
    // show score if we at the end of the questions
    if(this.state.currentQuestionIndex >= this.state.questions.length){
        this.state.currentQuestionIndex = this.state.questions.length -1
        return this.setState({showScore: true})
    }
    // update score for every correct answer
    if(TemporalStore.quiz.answerFound)
        this.setState({correctAnswers: this.state.correctAnswers + 1})
    
        // reset selected answer and if answer was found
    TemporalStore.quiz.answerSelected = false;
    TemporalStore.quiz.answerFound = false;
    // show next question
    this.showQuiz()
  }
  prevQuestion(){
    this.state.currentQuestionIndex = this.state.currentQuestionIndex - 1
    this.showQuiz()
  }
  render() {
    return (
      <View style={styles.panel}>
        <View style={{width:55, marginRight: 20, position: 'relative', left: 20}}>
          <VrButton style={styles.button} onClick={() => this.props.history.goBack()} >
             <Text style={{fontSize: 12}}>BACK</Text>
          </VrButton>
        </View>
        <View style={styles.quizBox}>
          <View style={styles.container}>
            <View style={styles.question}>
                {
                  this.state.currentQuestion
                }
               <TextModel Model={{obj: asset('obj/Residential Buildings 003.obj'), mtl: asset('obj/Residential Buildings 003.mtl')}} Text="Here is a serious question." />
            </View>
            <View style={styles.options}>
              <OptionsModule options={this.state.currentQuestionOptions} />
            </View>
          </View>
        </View>
        <View style={[styles.answerContainer]}>
            <Text>{this.state.answer}</Text>
        </View>
        <View style={[styles.actionsContainer]}>
            {/* <VrButton style={[styles.button, {backgroundColor: 'red', borderColor: 'transparent', margin: 5, height: 50} ]} onClick={this.prevQuestion} >
              <Text
                style={[styles.actions]}>
                PREV
              </Text>
            </VrButton> */}
            <VrButton  style={[styles.button, {backgroundColor: 'green', borderColor: 'transparent', margin: 5, height: 50} ]} onClick={this.nextQuestion}>
              <Text
                style={[styles.actions]}>
                NEXT
              </Text>
            </VrButton>
            { this.state.showScore ? 
              (
                <VrButton style={[styles.button, {backgroundColor: 'black', borderColor: 'green', margin: 5, height: 50} ]} >
                  <Text
                    style={[styles.actions]}>
                    SCORE: {this.state.correctAnswers}/{this.state.questions.length}
                  </Text>
                </VrButton>
              ) : null
          }
              
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
    padding: 10,
    margin: 1,
    borderColor: 'white',
    borderRadius: 5
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
  actionsContainer: {flex:1, height: 30, flexDirection:'row',width: 200},
  actions: {
    fontWeight: '400',
    marginLeft: 10,
    textAlignVertical: 'center',
  }

});
