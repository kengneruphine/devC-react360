import React, { Component } from 'react'
import {
    StyleSheet,
    asset,
    View,
} from 'react-360'
import Entity from 'Entity'

class Devc extends Component {
    render() {
        return (
            <View style={{transform: [
                {translate: [0, 0, -5]}
            ]}}>
                <Entity style={{
                    transform: [
                        { translate: [10, -10, -10] },
                        { scaleX: 0.05 },
                        { scaleY: 0.05 },
                        { scaleZ: 0.05 }
                    ]
                }} source={{ obj: asset('IronMan.obj'), mtl: asset('IronMan.mtl') }} />

                <Entity style={{
                    transform: [
                        { translate: [-10, -10, -10] },
                        { scaleX: 0.05 },
                        { scaleY: 0.05 },
                        { scaleZ: 0.05 }
                    ]
                }} source={{ obj: asset('IronMan.obj'), mtl: asset('IronMan.mtl') }} />
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
        height: 500,
        width: 500,
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
});


export default Devc

