/**
 * Created by nickming on 2017/4/30.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    RefreshControl,
    ActivityIndicator,
}from 'react-native';
import Config from '../config';
import MovieItem from '../components/movieitem';

const moreText = '加载更多!';
const moviesType = ['250top', 'inTheaters', 'comingSoon', 'usBox', 'search'];

export default class MovieList extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                r1 !== r2
            }
        });
        this.state = {
            dataSource: ds,
            loaded: false,
            foot: 2,//1是没有更多，2是加载中
            error: false,
            totalList: [],
            totalSize: 0,
            currentIndex: 0
        };
    }


    /**
     * 即将加载时请求刷新数据
     */
    componentWillMount() {
        this._requestMovieData(0);
    }

    /**
     * 设置了timer都需要在移除之前清除，否则会影响性能
     */
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    /**
     * 通过fetch请求电影数据，并且通过react async storage存储到本地
     * @param index
     * @private
     */
    _requestMovieData = (index) => {
        var movieUrl = this._getMovieTypeUrl();
        if (index === 0) {
            this.setState({
                totalList: []
            });
        }
        fetch(movieUrl + '?count=20&start=' + index)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    this.setState({
                        loaded: true,
                        err: true
                    });
            })
            .then((json) => {
                var retTotalSize;
                if (this.props.movieType === 'usBox') {
                    this.setState({
                        foot: 1
                    });
                    retTotalSize = 100;
                } else {
                    retTotalSize = json.total;
                    let detal = retTotalSize - (index + 20);
                    if ((detal < 20 && detal > 0) || detal > 24) {
                        this.setState({
                            foot: 2
                        });
                    } else {
                        this.setState({
                            foot: 1
                        });
                    }
                }
                this._saveResponseData(json, index, this.props.movieType);
                var newDatas = json.subjects;
                this.setState({
                    loaded: true,
                    totalList: this.state.totalList.concat(newDatas),
                    dataSource: this.state.dataSource.cloneWithRows(this.state.totalList.concat(newDatas)),
                    totalSize: retTotalSize,
                    currentIndex: this.state.currentIndex + 20
                });
            })
            .done();
    }

    /**
     * 匹配适合的url
     * @returns {*}
     * @private
     */
    _getMovieTypeUrl() {
        let currentMovieType = this.props.movieType;
        if (currentMovieType === moviesType[0]) {
            return Config.top250MoviesUrl;
        } else if (currentMovieType === moviesType[1]) {
            return Config.inTheatersMoviesUrl;
        } else if (currentMovieType === moviesType[2]) {
            return Config.comingSoonMoviesUrl;
        } else if (currentMovieType === moviesType[3]) {
            return Config.usBoxMoviesUrl;
        } else if (currentMovieType === moviesType[4]) {
            return Config.searchMovieUrl;
        } else {
            return Config.top250MoviesUrl;
        }
    }

    /**
     * 读取本地缓存的数据
     * @param index
     * @private
     */
    _readResponseData = (index) => {
        if (index === 0) {
            this.setState({
                totalList: []
            });
        }
        Config.storage.load({
            key: 'movieRequest' + movieUrlType + index,
            autoSync: true,
            syncInBackground: true
        }).then((ret) => {
            if (ret === 'undefined' || ret === null) {
                this.reloadMovieDatas();
            } else {
                var newDatas = ret.data.subjects;
                this.setState({
                    isLoadingMore: false,
                    loaded: true,
                    totalList: this.state.totalList.concat(newDatas),
                    dataSource: this.state.dataSource.cloneWithRows(this.state.totalList.concat(newDatas)),
                });
            }
        }).catch((err) => {
            switch (err.name) {
                case 'NotFoundError':
                    this._requestMovieData(index);
                    break;
                case 'ExpiredError':
                    this._requestMovieData(index);
                    break;
            }
        });
    }

    /**
     * 根据电影类型存储response数据
     * @param responseData
     * @param currentIndex
     * @param type
     * @private
     */
    _saveResponseData = (responseData, currentIndex, type) => {
        Config.storage.save({
            key: 'movieRequest' + type + currentIndex,  // 注意:请不要在key中使用_下划线符号!
            rawData: {
                data: responseData
            },
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: 1000 * 3600 * 24
        });
    }

    /**
     * 通过navigation来实现页面的跳转
     * @param movie
     */
    goToMovieDetailPage = (movie) => {
        var navigate = this.props.navigation.navigate;
        navigate('MovieDetail', {movie: movie});
    }

    /**
     * 渲染电影列表item
     * @param movie
     * @returns {XML}
     * @private
     */
    _renderMovieItemView = (movie) => {
        if (this.props.movieType === 'usBox')
            movie = movie.subject;
        return (
            <MovieItem movie={movie} onPress={this.goToMovieDetailPage}/>
        );
    }

    /**
     * 当到达数据底部时根据状态触发
     * @private
     */
    _onEndReached = () => {
        if (this.state.foot === 2) {
            this.timer = setTimeout(() => {
                this._requestMovieData(this.state.currentIndex);
            }, 500);
        }
    }
    /**
     * 渲染footer，根据foot属性来显示不同的footer，实现上拉加载更多
     * @returns {XML}
     * @private
     */
    _renderFooter = () => {
        if (this.state.foot === 1) {//加载完毕
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                        没有更多了
                    </Text>
                </View>);
        } else if (this.state.foot === 2) {//加载中
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'center',}}>
                    <ActivityIndicator/>
                </View>);
        }
    }

    /**
     * 渲染listview
     * @returns {XML}
     * @private
     */
    _renderMovieListView = () => {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderMovieItemView}
                    onEndReached={this._onEndReached}
                    renderFooter={this._renderFooter}
                    onEndReachedThreshold={0}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={()=>{this._readResponseData(0)}}/>
                       }>
                </ListView>
            </View>

        );
    };

    /**
     * 渲染函数
     * @returns {XML}
     */
    render() {
        return this._renderMovieListView();
    }
}

const styles = {
    container: {flex: 1},
    title: {
        textAlign: 'center'
    },
}
