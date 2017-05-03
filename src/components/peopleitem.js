/**
 * Created by nickming on 2017/5/3.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

export default class PeopleItem extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        var item = this.props.data;
        return (
            <View style={PeopleStyles.container}>
                <Image source={{uri:item.avatars.medium}} style={PeopleStyles.thumb}></Image>
                <Text style={PeopleStyles.name}>{item.name}</Text>
            </View>
        );
    }
}

const PeopleStyles = StyleSheet.create({
    container: {
        width: 70,
        height: 120,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    thumb: {
        width: 60,
        height: 80,
    },

    name: {
        fontSize: 10,
        color: 'gray',
        marginTop:3,
        textAlign:'center'
    }
});