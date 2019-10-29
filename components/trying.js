import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  asset,
  VrButton,
  Environment,
Image
} from 'react-360';

import Entity from 'Entity';

Environment.setBackgroundImage(asset('chess-world.jpg'))

export default class trying extends React.Component {

  constructor(Props) {
    super(Props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    });
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Image source={asset('wlc.webp')} style={{
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }} />
      case -1: return <Image source={asset('wlc.webp')} style={{
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }} />
      default: return <View />
    }
  }


  getWinner() {
    const NUM_TILE = 3;
    var arr = this.state.gameState;
    var sum;
    // check rows
    for (var i = 0; i < NUM_TILE; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1 }
      //check columns
    }
    for (var i = 0; i < NUM_TILE; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1 }
    }
    //check leading Diagonal

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1 }

    //check other Diagonal

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1 }

    return 0;
  }



  onTilePress(row, col) {
    //Dint change tiles

    var value = this.state.gameState[row][col];
    if (value !== 0)
      return;

    // set The current tile
    var currentPlayer = this.state.currentPlayer;
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });
    // Switch to other player
    var nextPlayer = (currentPlayer == 1 ? -1 : 1);
    this.setState({ currentPlayer: nextPlayer });

    //Display winner
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 is the winner");
      this.initializeGame();
    }
    else if (winner == -1) {
      Alert.alert("Player 2 is the winner");
      this.initializeGame();
    }

  }

  render() {
    return (
      <View style={styles.panel}>

        <View style={{ flexDirection: 'row' }}>
          <VrButton style={styles.tile}></VrButton>
          <VrButton style={styles.tile}></VrButton>
          <VrButton style={styles.tile}></VrButton>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <VrButton style={styles.tile}></VrButton>
          <VrButton style={styles.tile}></VrButton>
          <VrButton style={styles.tile}></VrButton>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <VrButton style={styles.tile}></VrButton>
          <VrButton style={styles.tile}></VrButton>
          <VrButton style={styles.tile}></VrButton>
        </View>

        <VrButton onClick={() => {
            this.props.history.goBack();
          }}>
            <Text
              style={{
                backgroundColor: 'red',
                fontSize: 30,
                fontWeight: '500',
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{ translate: [-6, 0, -3] }],
              }}>
              Back to Game Page.....
          </Text>
          </VrButton>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(25, 274, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: 'red',
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
  tile: {
    width: 100,
    height: 100,
    borderWidth: 9,
    borderColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tile: {
    width: 100,
    height: 100,
    borderWidth: 8,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tilex: {
    color: "red",
    fontSize: 60,

  },
  tileO: {
    color: "green",
    fontSize: 60,

  }

});

