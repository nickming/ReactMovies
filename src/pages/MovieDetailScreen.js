/**
 * Created by nickming on 2017/4/30.
 */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import MovieDetailScrollView from '../components/moviedetailscrollview';

class MovieDetailScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.movie.title}`
    });

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        var {movie}=this.props.navigation.state.params;
        return (
            <MovieDetailScrollView movieId={movie.id}/>
        );
    }
}



module.exports=MovieDetailScreen;
