/**
 * Created by nickming on 2017/5/2.
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
}from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

export default class MovieTypeMenu extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        var data = [["C", "Java", "JavaScript"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
        return (
            <DropdownMenu
                arrowImg={require('../assets/dropdown_arrow.png')}      //set the arrow icon, default is a triangle
                checkImage={require('../assets/menu_check.png')}    //set the icon of the selected item, default is a check mark
                bgColor={"white"}                            //the background color of the head, default is grey
                tintColor={"green"}                        //the text color of the head, default is white
                selectItemColor={"green"}                    //the text color of the selected item, default is red
                data={data}
                handler={(selection, row) => alert(data[selection][row])}>
            </DropdownMenu>
        );
    }
}