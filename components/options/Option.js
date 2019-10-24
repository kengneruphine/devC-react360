import React from 'react';
import {View, VrButton, Text,StyleSheet,asset, NativeModules} from 'react-360';
const {AudioModule, TemporalStore} = NativeModules;

export default class Option extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            btnStyle: {}
        }
        this.clickHandler = this.clickHandler.bind(this);
        
    }
    componentDidMount(){
      this.setState({btnStyle: {
        width: 400,
        height: 50,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 5, 
        margin: 5,
        backgroundColor :'black'}})
    }
    async clickHandler(){
        // const event = e.nativeEvent; // Extract the value from the runtime
        // //vent contains the actual event payload, as well as information on
        // // which cursor the user was using, and which React tag was targeted
        // const inputEvent = event.inputEvent;
        // console.log(event)
    //    console.log('we are in child');
      // check if the option is the right optionAL
       try{
          if(TemporalStore.quiz.answerSelected)
              return
          if(this.props.ans){
            TemporalStore.quiz.answerFound = true
             let color = "green"
             this.setState({
              btnStyle: {
                  width: 350,
                  borderWidth: 2,
                  padding: 5,
                  margin: 5,
                  backgroundColor : color,
              }
            }) 
          }else {
            this.setState({
              btnStyle: {
                  width: 350,
                  borderWidth: 2,
                  padding: 5,
                  margin: 5,
                  backgroundColor : "red"
              }
            }) 
          }
          TemporalStore.quiz.answerSelected = true;
       } catch(err){
          console.log(err)
       }
       AudioModule.playOneShot({
        source: asset('click.wav'),
      })  
    }


    render(){
        return(
          <View style={this.state.btnStyle}>
          <VrButton onClick ={this.clickHandler}
            > 
          <Text> {this.props.text || ''}</Text>
          </VrButton>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  optionBtn: {
    
  },
})

