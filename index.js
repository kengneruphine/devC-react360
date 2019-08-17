import React,{Component} from 'react';
import {
  View,
  AppRegistry,
  VrButton,
  Image,
  asset
} from 'react-360';
import D3Model from './components/D3Model';
import Sphere from './components/Sphere';
import Label1 from './components/Label1';
import Label2 from './components/Label2';
import Label3 from './components/Label3';
import Routes from './components/Router';
import trying from './components/trying';

import { MemoryRouter as Router, Route} from 'react-router';
import Welcome from './pages/welcome';
import Game from './pages/game';

//import OptionsModule from './components/OptionsModule';
import OptionsModule from './components/options/OptionsModule';
import welcome from './components/welcome';

export default class Index extends Component{
  render(){
    return(
      <Router>
        <View>
          <Route exact path='/' component={Welcome}/>
          <Route exact path='/welcome' component={Welcome}/>
          <Route exact path='/game' component={Game}/>
        </View>
      </Router>
    )
  }
}

AppRegistry.registerComponent('Index', () => Index);

const options = [{ text: 'Tabitha', id: 'tabitha' }, { text: 'Grace', id: 'grace' },
{ text: 'Admin', id: 'admin' }, { text: 'Test', id: 'test' }];

export default class Hello360 extends React.Component {
  state = {
    count: 0,
  };

  render() {
    return (
      /*<View>
        <D3Model />
        <Sphere />
        <Label1 />
        <Label2 />
        <Label3 />*/

      <View style={styles.panel}>
        <View style={styles.greetingBox}>

          <View style={styles.container}>

            <View style={styles.question}>
              <Text> What does the image say?</Text>
              <Image style={{
                width: 250,
                height: 150,
              }}
                source={asset('image.jpg')} />
            </View>

            <View style={styles.options}>
              <OptionsModule options={options} />

            </View>
          </View>


          <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
            <VrButton onClick={() => {
              this.props.history.push('./welcome');
            }}>
              <Text
                style={{
                  backgroundColor: 'red',
                  fontSize: 30,
                  fontWeight: '500',
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                 
                }}>
                Back To Welcome Page.....
          </Text>
            </VrButton>

            <VrButton onClick={() => {
            this.props.history.push('./trying');
          }}>
            <Text
              style={{
                backgroundColor: 'red',
                fontSize: 30,
                fontWeight: '500',
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                
              }}>
              Go To Next Game Page.....
          </Text>
          </VrButton>

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
    // maxHeight : 500,
    // maxWidth: 500,
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

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


});

AppRegistry.registerComponent('Hello360', () => Routes);
