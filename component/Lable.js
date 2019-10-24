import React, { Component } from 'react'
import {
    Text,
    View,
    Image, asset,
    StyleSheet
 } from "react-360";

const options = [{text :'Tabitha', id: 'tabitha'}, {text:'Grace', id:'grace'},
{text:'Admin',id:'admin'},{text: 'Test',id:'test' }];

export class lable extends Component {
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
                                source={asset('jonatan.jpg')} />
                        </View>

                        <View style={styles.options}>
                            <OptionsModule options={options} />

                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
      // Fill the entire surface
      width: 100,
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
  
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  });

export default lable
