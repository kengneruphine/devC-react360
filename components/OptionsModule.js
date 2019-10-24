import React from 'react';
import { View, VrButton, Text,StyleSheet,} from 'react-360';
import Option from './Option';


export default class OptionsModule extends React.Component {
    constructor(props){
        super(props)
        
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(evt){
      console.log('we are in parent',evt.currentTarget);
    }

    render (){
        return(
          <View style = {styles.options} onInput={this.clickHandler} pointerEvents= 'box-none'>
          {this.props.options.map( (option, index) => {
              
            return <Option key={index} Text={option.text} optionId={option.id}/>
          }) }
          </View>
        );
    }
}

const styles = StyleSheet.create({
  options: {
    width: 300,
    height: 250,
    borderColor: '#639dda',
    borderWidth: 2,
    justifyContent: 'center',
  },
})