/**
 * Created by nickming on 2017/4/30.
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';

import {StackNavigator, TabNavigator} from 'react-navigation';

const SettingScreen = require('./pages/SearchScreen');
const MovieDetailScreen = require('./pages/MovieDetailScreen');
const HomeScreen=require('./pages/HomeScreen')

const MainScreenNavigator = TabNavigator({
    HomeIndex: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./assets/movie.png')}
                    style={[{tintColor: tintColor},styles.icon]}
                />
            ),
        }
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel: '搜索',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./assets/search.png')}
                    style={[{tintColor: tintColor},styles.icon]}
                />
            ),
        }
    },
}, {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: 'green', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
    }
});

MainScreenNavigator.navigationOptions = {
    title: '电影'
};

const SimpleApp = StackNavigator({
    Home: {screen: MainScreenNavigator},
    MovieDetail: {screen: MovieDetailScreen},
});

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
        resizeMode: 'contain'
    },
});

module.exports = SimpleApp;