/**
 * Created by nickming on 2017/5/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ListView
} from 'react-native';
import PeopleItem from './peopleitem';

export default class PeopleListView extends Component {

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
            dataSource: ds.cloneWithRows(this.props.dataArray)
        };
    }

    _renderItem = (data, sectionId, rowId) => {
        return <PeopleItem data={data}/>;
    }

    render() {
        return (
            <ListView
                horizontal={true}
                dataSource={this.state.dataSource}
                renderRow={(data,sectionId,rowId)=>this._renderItem(data,sectionId,rowId)}>
            </ListView>
        );
    }
}