import React from 'react';
import {View, VrButton, Text,StyleSheet,} from 'react-360';

export default class Option extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
          <View style={styles.option}>
          <VrButton> 
          <Text> {this.props.Text || ''}</Text>
          </VrButton>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  option: {
    width: 250,
    borderColor: '#639dda',
    borderWidth: 2,
    padding: 5,
    margin: 5,
  },
})

