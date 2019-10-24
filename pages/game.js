import React from 'react';
import {
    AppRegistry,
    Environment,
    StyleSheet,
    Text,
    View,
    Image,
    VrButton,
    asset,
    Animated,
    AsyncStorage,
    NativeModules
} from 'react-360';
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
      SurfaceManagement.props = props
      SurfaceManagement.detachAll()
      SurfaceManagement.attachSurface('GameDetailSurface', [-0.9, 0], 300, 400)
      SurfaceManagement.attachSurface('GameBoardSurface', [0.9, 0], 300, 400)

      
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
          case 'image':
              jsxFormatedQuestion = <TextImage Text={question.text} Image={`${TemporalStore.quiz.currentQuiz}/images/${question.media}`}/>
          default:
      }
      return jsxFormatedQuestion
  }
  showQuiz(){
      const question = this.state.questions['questions'][this.state.currentQuestionIndex]
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
  async nextQuestion(){
      
      this.state.currentQuestionIndex = this.state.currentQuestionIndex + 1
      // show score if we at the end of the questions
      if(this.state.currentQuestionIndex > this.state.questions['questions'].length){
          this.state.currentQuestionIndex = this.state.questions['questions'].length -1
          // save score if larger than the current score
          try{
              const disease = TemporalStore.quiz.currentQuiz
              let highestScore = await AsyncStorage.getItem(`${disease}_score`)
              if(highestScore == null){
                highestScore = this.state.correctAnswers
              }else {
                  this.state.correctAnswers > parseInt(highestScore) ? highestScore = this.state.correctAnswers : null
              }
              // save score
              await AsyncStorage.setItem(`${disease}_score`, parseInt(highestScore))
              let avg = this.state.correctAnswers/this.state.questions['questions'].length
              this.updateLevel(avg, disease) 
          } catch(err){
              console.log(err)
          }
          return this.setState({showScore: true})
      }
      // update score for every correct answer
      if(TemporalStore.quiz.answerFound)
          this.state.correctAnswers = this.state.correctAnswers + 1
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
  async updateLevel(newAvg, disease){
      try{
          // number of times quiz played
          let trials = await AsyncStorage.getItem(`${disease}_quiz_trials`) 
          // average score of trials
          let avg = await AsyncStorage.getItem(`${disease}_quiz_avg`)
          // strength
          let strength = await AsyncStorage.getItem(`${disease}_quiz_strength`)
          // set defaults
          trials = trials || 0
          avg = avg || 0.0
          strength = strength || 'Not good'
          // compute new average
          avg = (parseFloat(avg) + newAvg)/(parseInt(trials) + 1)
          // compute level
          console.log(avg)
          switch (true) {
              case (avg < 0.2):
                  strength = "Not good"
                  break;
              case (avg < 0.5):
                  strength = 'Weak'
                  break;
              case (avg < 0.6):
                  strength = 'Average'
                  break;
              case (avg < 0.8):
                  strength = 'Good'
                  break;
              case (avg <= 1):
                  strength = 'Excellent'
                  break;
              default:
          }
          setTimeout(async function(){
              // update storage
              try{
                  await AsyncStorage.setItem(`${disease}_quiz_avg`, avg)
                  await AsyncStorage.setItem(`${disease}_quiz_trials`, parseInt(trials) + 1) 
                  await AsyncStorage.setItem(`${disease}_quiz_strength`, strength)
              }catch(err){ console.log(err) }
          }, 2000)
          
      }catch(err){
          console.log(err)
      }
  }
  render() {
    return (
      <View style={styles.panel}>
        <View style={{marginRight: 20, position: 'relative', left: 20}}>
            <VrButton  onClick={() => this.props.history.goBack()} >
                <Image style={{
                        width: 40,
                        height: 40,
                    }}
                        source={asset('img/nav_back.png')} />  
            </VrButton>
        </View>
        <View style={styles.quizBox}>
          <View style={styles.container}>
            <View style={styles.question}>
                <View>
                    <Text style={{textAlign: 'center'}}>{this.state.currentQuestionIndex + 1}/{this.state.questions['questions'].length}</Text>
                </View>
                {
                    this.state.currentQuestion
                }
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
            <VrButton  style={[styles.button, {backgroundColor: 'red', borderWidth: 0, margin: 5, height: 50} ]} onClick={()=>{
                TemporalStore.quiz.answerSelected = false;
                TemporalStore.quiz.answerFound = false;
                //let options = this.state.questions['questions'][0].options
                this.state.currentQuestionIndex = 0
                this.state.correctAnswers = 0
                this.state.showScore = false/*, currentQuestionOptions: options*/// })
                this.showQuiz() 
            }}>
              <Text
                style={[styles.actions]}>
                RESTART
              </Text>       
            </VrButton>
            <VrButton  style={[styles.button, {backgroundColor: 'blue', borderWidth: 0, margin: 5, height: 50} ]} onClick={this.nextQuestion}>
              <Text
                style={[styles.actions]}>
                NEXT
              </Text>       
            </VrButton>
          
            { this.state.showScore ? 
              (
                <VrButton style={[styles.button, {backgroundColor: 'black', borderColor: '#3267FC', margin: 5, height: 50} ]} >
                  <Text
                    style={[styles.actions]}>
                    SCORE: {this.state.correctAnswers}/{this.state.questions['questions'].length}
                  </Text>
                </VrButton>
              ) : null
            }   
        </View>
      </View>
    );
  }
};

export class GameDetailSurface extends React.Component{
    render(){
        let title = questions[TemporalStore.quiz.currentQuiz]['title']
        let description = questions[TemporalStore.quiz.currentQuiz]['description']
        return (
            <View style={styles.panelDetailSurface}>
                <View style={styles.detailTitle}>
                    <Text style={styles.detailTitleText}> { title }</Text>
                </View>
                <View style={styles.detailDescription}>
                    <Text style={styles.detailDescriptionText}> { description }</Text>
                </View>
            </View>
        )
    }
}
export class GameBoardSurface extends React.Component{
    state = { highestScore: 0, strength: '', avg: 0.0, levelBarWidth: new Animated.Value(0)}
    componentDidMount(){
        setTimeout(async () => {
            try{
                const disease = TemporalStore.quiz.currentQuiz
                let highestScore = await AsyncStorage.getItem(`${disease}_score`)
                let strength = await AsyncStorage.getItem(`${disease}_quiz_strength`)
                let avg = await AsyncStorage.getItem(`${disease}_quiz_avg`)
                highestScore = highestScore || 0
                strength = strength || 'Not good'
                avg = avg || 0.0
                console.log('avg is: ', avg)
                let animate = avg < 0.05 ? 10 : avg*200
                let animation = Animated.timing(
                  // Animate value over time
                  this.state.levelBarWidth, // The value to drive
                  {
                    toValue: animate, // Animate to final value of 1,
                    delay: 100,
                    duration: 2000
                  }
                )
                this.setState({highestScore, strength, avg})
                animation.start()

            }catch(err){
                console.log(err)
            }
        }, 1000)
    }
    render(){
      return (
          <View style={[styles.panelDetailSurface]}>
              <View style={styles.detailTitle}>
                  <Text style={styles.detailTitleText}> { 'Score board' }</Text>
              </View>
              <View style={styles.detailDescription}>
                  <Text style={[styles.detailDescriptionText, {fontSize: 18}]}> Your highest score: { this.state.highestScore } pts</Text>
              </View>
              <View style={styles.detailDescription}>
                  <Text style={[styles.detailDescriptionText, {fontSize: 18}]}> Level: </Text>
              </View>
              <View style={styles.levelBarContainer}>
                  <Animated.View
                    style={{
                      height: 20,
                      borderRadius:10,
                      padding: 0,
                      backgroundColor: '#3267FC',
                      width: this.state.levelBarWidth
                    }}>
                  </Animated.View>
              </View>
              <View style={styles.detailDescription}>
                  <Text style={[styles.detailDescriptionText, {fontSize: 18}]}> { this.state.strength } </Text>
              </View>
          </View>)
    }
}


const styles = StyleSheet.create({
    panel: {
      // Fill the entire surface
      paddingTop: 10,
      position: 'relative',
      width: 1000,
      height: 600,
      backgroundColor: 'black',
    },
    panelDetailSurface:{
      height: 400,
      width: 300,
      backgroundColor: "black",
      borderWidth: 0,
      borderColor: 'black',
      padding: 0,
      position: 'relative'
    },
    detailTitleText:{
      fontSize: 20,
      color: 'white',
      textAlign: 'center'
    },
    detailDescriptionText:{
      fontSize: 14,
      color: 'white',
    },
    detailTitle:{
      backgroundColor: '#3267FC',
      padding: 5,
      margin: 0
    },
    detailDescription:{
      padding: 10,
      margin: 5
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
      borderWidth: 0.8,
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
    },
    levelBarContainer:{
      width: 200,
      backgroundColor: 'transparent',
      height: 20,
      marginLeft: 18,
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#3267FC',
      padding: 0
    }

});
AppRegistry.registerComponent('GameDetailSurface', () => GameDetailSurface); 
AppRegistry.registerComponent('GameBoardSurface', () => GameBoardSurface); 