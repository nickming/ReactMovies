/**
 * Created by nickming on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
}from 'react-native';
import MovieList from '../components/movielist';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';

class HomeScreen extends Component {
    render() {
        var navigation = this.props.navigation;
        return (
            <ScrollableTabView
                tabBarActiveTextColor={'green'}
                tabBarUnderlineStyle={{backgroundColor:'green'}}
                tabBarBackgroundColor={'white'}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}>
                <MovieList navigation={navigation} tabLabel='正在热映' movieType="inTheaters"/>
                <MovieList navigation={navigation} tabLabel='即将上映' movieType="comingSoon"/>
                <MovieList navigation={navigation} tabLabel='Top250' movieType="250top"/>
                <MovieList navigation={navigation} tabLabel='北美票房榜' movieType="usBox"/>
            </ScrollableTabView>
        )
    }
}

module.exports = HomeScreen;