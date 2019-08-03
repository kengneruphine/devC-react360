import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';

export default class Hello360 extends React.Component {
  state = {
    count: 0,
  }
  incrementCount = () => {
    this.state ({
      count: this.setState.count + 1
    });
  };
  dicrementCount = () => {
    this.count ({
      count: this.setState.count - 1
    });
  };

  render() {
    return (
   
      <View style={styles.panel}>
        <VrButton 
        onClick = {this.incrementCount} 
          style={styles.greetingBox} >
            <Text>+</Text>
        </VrButton>
        <VrButton onClick = {this.dicrementCount}
        style = {styles.greetingBox}>
          <Text>-</Text>
        </VrButton>
          <Text style={styles.greeting}>
            {`count: ${this.state.count}`}
          </Text>
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
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Hello360', () => Hello360);
