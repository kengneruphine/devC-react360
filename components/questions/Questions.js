import React from 'react';
import { 
    View,
    Image,
    Text,
    asset
 } from "react-360";
import D3Model from './D3Model';

export class SimpleText extends React.Component{

    constructor(props){
        super(props)
    }
    render(){
        return (
            <View>
                <Text>{this.props.Text || ""}</Text>
            </View>
        )
    }
}
export class TextImage extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View>
                <Text> {this.props.Text}</Text>
                <Image style={{
                    width: 250,
                    height: 150,
                }}
                    source={asset(this.props.Image)} />
            </View>
        )
    }
}
export class TextModel  extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View>
                <Text> {this.props.Text}</Text>
                <D3Model Model={this.props.Model} Text="Yet another question." />
            </View>
        )
    }
}