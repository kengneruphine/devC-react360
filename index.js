import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image, asset
} from 'react-360';

//import OptionsModule from './components/OptionsModule';
import welcome from './components/welcome';

const options = [{text :'Tabitha', id: 'tabitha'}, {text:'Grace', id:'grace'},
{text:'Admin',id:'admin'},{text: 'Test',id:'test' }];

export default class Hello360 extends React.Component {
  state = {
    count: 0,
  };

  render() {
    return (
{/*      <View style={styles.panel}>
        <View style={styles.greetingBox}>

        <View style={styles.container}>

        <View style={styles.question}>
        <Text> What does the image say?</Text>
        <Image style={{
          width: 250,
          height: 150,
        }}
        source={asset('image.jpg')}/>
        </View>
we
          <View style={styles.options}>
           <OptionsModule options ={options} />

          </View>
          </View>
        </View>
      </View>*/}
      <welcome />
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    height: 400,
    width: 750,
  },
  greeting: {
    fontSize: 30,
  },
  button: {
    width: 50,
    borderColor: '#639dda',
    borderWidth: 2,
    padding: 15,
    margin: 1,
  },
  question: {
    width: 300,
    height: 200,
    borderColor: '#639dda',
    borderWidth: 2,
    margin: 2,

  },

  container:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


});

AppRegistry.registerComponent('Hello360', () => Hello360);
