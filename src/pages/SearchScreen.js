/**
 * Created by nickming on 2017/4/30.
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
}from 'react-native';
import Search from 'react-native-search-box';
import MovieListView from '../components/movielist';
import MovieSearchListView from '../components/movieseachlist';
class SettingScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '设置',
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    _onSearch = (text) => {
        return new Promise((resolve, reject) => {
            this.refs.searchlist.setKeyWord(text);
        });
    }

    render() {
        var navigation = this.props.navigation;
        return (
            <View style={settingStyles.container}>
                <Search onSearch={this._onSearch}/>
                <MovieSearchListView ref='searchlist' navigation={navigation} movieType="search"/>
            </View>
        );
    }
}

const settingStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        width: 26,
        height: 26
    }
});

module.exports = SettingScreen;