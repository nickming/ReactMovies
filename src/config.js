/**
 * Created by nickming on 2017/4/30.
 */
'use strict';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage=new Storage({
    size:2000,
    storageBackend:AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // sync: require('./sync')
});

module.exports={
    top250MoviesUrl:'https://api.douban.com/v2/movie/top250',
    inTheatersMoviesUrl:'https://api.douban.com/v2/movie/in_theaters',
    comingSoonMoviesUrl:'https://api.douban.com/v2/movie/coming_soon',
    usBoxMoviesUrl:'https://api.douban.com/v2/movie/us_box',
    searchMovieUrl:'https://api.douban.com/v2/movie/search',
    isDebugData:false,
    storage:storage
}
