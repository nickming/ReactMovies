/**
 * Created by nickming on 2017/5/2.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    ListView
} from 'react-native';
import Config from '../config';
import  Rating from 'react-native-easy-rating';
import PeopleListView from './peoplelist';

export default class MovieDetailScrollView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            movie: null
        }
    }

    componentWillMount() {
        this._loadLocalData(this.props.movieId);
    }

    _requestMovieDetail = () => {
        fetch('https://api.douban.com/v2/movie/subject/' + this.props.movieId)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.setState({
                    movie: json
                });
            })
            .done();
    }

    /**
     * 本地缓存
     * @param json
     * @param id
     * @private
     */
    _saveLocalData = (json, id) => {
        Config.storage.save({
            key: 'movieDetailRequest' + id,  // 注意:请不要在key中使用_下划线符号!
            rawData: {
                data: json
            },
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: 1000 * 3600 * 24 * 30
        });
    }

    /**
     * 本地缓存读取
     * @param id
     * @private
     */
    _loadLocalData = (id) => {
        Config.storage.load({
            key: 'movieDetailRequest' + id,
            autoSync: true,
            syncInBackground: true
        }).then((ret) => {
            if (ret === 'undefined' || ret === null) {
                this._requestMovieDetail();
            } else {
                this.setState({
                    movie: ret.data
                });
            }
        }).catch((err) => {
            switch (err.name) {
                case 'NotFoundError':
                    this._requestMovieDetail();
                    break;
                case 'ExpiredError':
                    this._requestMovieDetail();
                    break;
            }
        });
    }

    render() {
        var movie = this.state.movie;
        if (movie == null) {
            return (
                <View style={[styles.container,{justifyContent:'center',alignItems:'center'}]}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            );
        } else {
            var rating = Math.ceil(movie.rating.average) / 2;
            return (
                <ScrollView style={styles.container}>

                    <View style={styles.headerContainer}>
                        <Image source={{url:movie.images.large}} style={styles.headerBackground}
                               resizeMethod={'scale'} blurRadius={30}>
                            <Image source={{url:movie.images.large}} style={styles.headerImage}></Image>
                        </Image>
                    </View>
                    <View>
                        <View style={[styles.container,{flexDirection:"row"}]}>
                            <View style={styles.movieInfoLeftContainer}>
                                <Text style={{fontSize:18}}>{movie.title}</Text>
                                <Text style={[styles.subText,{marginTop:10}]}>{movie.year}
                                    {movie.genres}
                                </Text>
                                <Text style={styles.subText}>{
                                    movie.countries.map((country) => {
                                        return <Text>{country} </Text>;
                                    })
                                }</Text>
                                <Text style={styles.subText}>
                                    {
                                        movie.aka.map((name) => {
                                            return <Text>{name} </Text>;
                                        })
                                    }
                                </Text>
                            </View>
                            <View style={styles.movieInfoRatingContainer}>
                                <View style={styles.ratingBox}>
                                    <Text style={styles.subText}>豆瓣评分</Text>
                                    <Text style={{fontSize:18}}>{movie.rating.average}</Text>
                                    <Rating
                                        rating={rating}
                                        max={5}
                                        iconWidth={10}
                                        iconHeight={10}
                                        iconSelected={require('../assets/icon_star_selected.png')}
                                        iconUnselected={require('../assets/icon_star_unselected.png')}
                                        editable={false}
                                    />
                                    <Text style={styles.subText}>{movie.ratings_count}人</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.blockContainer}>
                            <Text style={styles.subText}>剧情简介</Text>
                            <Text style={{fontSize:12,marginTop:10}}>{movie.summary}</Text>
                        </View>

                        <View style={styles.blockContainer}>
                            <Text style={styles.subText}>影人</Text>
                            <PeopleListView style={{marginTop:10}} dataArray={movie.directors.concat(movie.casts)}/>
                        </View>
                    </View>


                </ScrollView>
            );
        }

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFF2'
    },

    headerContainer: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerImage: {
        width: 150,
        height: 200
    },

    headerBackground: {
        flex: 1,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width
    },

    movieInfoLeftContainer: {
        flex: 3,
        padding: 10,
        justifyContent: 'center'
    },

    movieInfoRatingContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    subText: {
        fontSize: 10,
        color: 'gray',
    },

    ratingBox: {
        height: 70,
        width: 70,
        elevation: 20,
        backgroundColor: '#ffffff',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {width: 0, height: 0},
        shadowColor: '#F1EDEA',
        shadowOpacity: 1,
        shadowRadius: 5
    },

    blockContainer: {
        padding: 10,
        marginTop: 20
    }
});