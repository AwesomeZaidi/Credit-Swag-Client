import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    View,
    Text,
} from 'react-native';
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from './goalsStyles';
import { Button } from 'react-native-elements';
import { PieChart } from 'react-native-svg-charts'

class SavingGoal extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
           headerTintColor: '#fff',
           headerStyle: {
            backgroundColor: '#24232E',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
           }
        }
    }

    render() {
        return (
            <ScrollView style={common.page}>
                    <Text style={[common.h1_primary]}>Saving Goal</Text>
                    <Text>{this.props.savingGoal}</Text>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        savingGoal: state.savingGoal
    }
};

export default connect(mapStateToProps, null)(SavingGoal);
