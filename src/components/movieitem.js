/**
 * Created by nickming on 2017/4/30.
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

import  Rating from 'react-native-easy-rating';

export default class MovieItem extends Component {

    static defaultProps = {
        movie: {}
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    handleMovieItemPress = (movie) => {
        const {onPress}=this.props;
        onPress(movie);
    }

    render() {
        var movie = this.props.movie;
        var rating=Math.ceil(movie.rating.average)/2;
        return (
            <TouchableOpacity onPress={()=>{this.handleMovieItemPress(movie)}}>
                <View>
                    <View style={styles.container}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{movie.title}</Text>
                            <View style={styles.ratingContainer}>
                                <Rating
                                    rating={rating}
                                    max={5}
                                    iconWidth={12}
                                    iconHeight={12}
                                    iconSelected={require('../assets/icon_star_selected.png')}
                                    iconUnselected={require('../assets/icon_star_unselected.png')}
                                    editable={false}
                                />
                                <Text style={{fontSize:10}}>{movie.rating.average}</Text>
                            </View>
                            <Text style={styles.subTitle}>{movie.year}/ {movie.genres}</Text>
                            <Text style={styles.subTitle}>导演:
                                {
                                    movie.directors.map((p) => {
                                        return <Text>{p.name} </Text>
                                    })
                                }</Text>
                            <Text style={styles.subTitle}>主演:
                                {
                                    movie.casts.map((cast) => {
                                        return <Text>{cast.name} </Text>
                                    })
                                }
                            </Text>

                        </View>
                        <View style={styles.rightContainer}>
                            <Image source={{url:movie.images.medium}} style={styles.thumbnail}>
                            </Image>
                        </View>

                    </View>
                    <View style={styles.divider}></View>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems:'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#ffffff'
    },

    leftContainer: {
        flex: 2,
        flexDirection: 'column',
    },

    rightContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 15,
    },
    subTitle: {
        fontSize: 10,
        color: 'gray',
        marginTop: 5
    },

    thumbnail: {
        width: 70,
        height: 100
    },
    divider: {
        height: 0.5,
        backgroundColor: '#CCCCCC',
        alignSelf: 'flex-end'
    }
});