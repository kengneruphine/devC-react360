import React from 'react';
import {View, VrButton, Text,StyleSheet,} from 'react-360';


export default class Option extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            btnStyle: {
                width: 250,
                borderColor: '#639dda',
                borderWidth: 2,
                padding: 5,
                margin: 5,
                backgroundColor :'blue',
            }


        }
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(){
        // const event = e.nativeEvent; // Extract the value from the runtime
        // // event contains the actual event payload, as well as information on
        // // which cursor the user was using, and which React tag was targeted
        // const inputEvent = event.inputEvent;
        // console.log(event)
      
       let newColor= this.state.btnStyle.backgroundColor === "red" ? "blue" : "red"
       this.setState({
            btnStyle: {
                width: 250,
                borderColor: '#639dda',
                borderWidth: 2,
                padding: 5,
                margin: 5,
                backgroundColor : newColor,
            }
       })

    }
    render(){
        return(
          <View style={this.state.btnStyle}>
          <VrButton onClick = {this.clickHandler} > 
          <Text> {this.props.Text || ''}</Text>
          </VrButton>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  option: {
    
  },
})

