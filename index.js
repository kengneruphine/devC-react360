import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton, asset,Image
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
          <VrButton onClick={this.incrementCount}
          style={styles.button }
          >
          <Text>+</Text>
          </VrButton>
          <VrButton onClick={this.decrementCount}
             style={styles.button } >
            <Text>-</Text>
          </VrButton>
          <Text style={styles.greeting}>
            {`count: ${this.state.count}`}
          </Text>
          <Text style={styles.greeting}>
            Welcome to React 360
          </Text>
          <Image style={{
            width: 3,
            height: 3,
          }}
           source={asset('image.jpg')} />
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
    height : 500,
    width: 500,
  },
  greeting: {
    fontSize: 30,
  },
  button: {
    width:50,
    borderColor: '#639dda',
    borderWidth: 2,
    padding: 15,
    margin: 1,
  },
});

AppRegistry.registerComponent('Hello360', () => Hello360);
