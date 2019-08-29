import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    View,
    Text,
} from 'react-native';
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from './GoalsStyles';
import { Button } from 'react-native-elements';
import { PieChart } from 'react-native-svg-charts'

class Goals extends Component {

    render() {

        const data = [ 50, 10, 40, 95, -4 ]
 
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
    
        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))
            
        return (
            <ScrollView contentContainerStyle={styles.topDownCenterPage}>
                <Text style={[common.h1_primary, styles.profileTitle]}>How you spend your money</Text>
                <PieChart
                    style={ styles.pie }
                    data={ pieData }
                />

                <Text style={[common.h1_primary, styles.profileTitle]}>Saving Goals</Text>
                
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, null)(Goals);

