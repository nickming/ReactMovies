/**
 * Created by nickming on 2017/4/30.
 */
'use strict';
import {AppRegistry} from 'react-native';
import App from './App';

if (!__DEV__)
{
    global.console={
        info:()=>{},
        log:()=>{},
        warn:()=>{},
        error:()=>{}
    };
}

AppRegistry.registerComponent('ReactMovies',()=>App);