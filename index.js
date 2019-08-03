import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image, asset
} from 'react-360';

export default class Hello360 extends React.Component {
  state = {
    count: 0,
  };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrementCount = () => {
    this.setState({ count: this.state.count - 1 });
  }
  render() {
    return (
      <View style={styles.panel}>
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

          <View style={styles.options}>
            <VrButton style={styles.option}>
              <Text>Adobe</Text>
            </VrButton>
            <VrButton style={styles.option}>
              <Text>stocks</Text>
            </VrButton>
            <VrButton style={styles.option}>
              <Text>Adobe stock</Text>
            </VrButton>
            <VrButton style={styles.option}>
              <Text>stock Adobe</Text>
            </VrButton>
          </View>

          </View>
        </View>
      </View>
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
  options: {
    width: 300,
    height: 250,
    borderColor: '#639dda',
    borderWidth: 2,
    justifyContent: 'center',
  },
  option: {
    width: 250,
    borderColor: '#639dda',
    borderWidth: 2,
    padding: 5,
    margin: 5,
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
