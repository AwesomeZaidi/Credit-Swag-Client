
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import React, { Component } from 'react';
import {
    Text,
    ScrollView,
    FlatList,
    View
} from 'react-native';
import { logOut, connectBank } from '../../redux/actions/index';
import { getTransactions } from '../../redux/actions/index';

import { connect } from "react-redux";

import common from '../styles/common.style';
import styles from './DashboardStyles';

import { LinearGradient } from 'expo-linear-gradient';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

// ----------------------------------------------------------------------------------
// Dashboard Component Class
// ----------------------------------------------------------------------------------

class Dashboard extends Component {

    // ------------------------------------------
    // componentDidMount: fetches the user transaction and balance data from redux.
    // ------------------------------------------
    componentDidMount() {
        this.props.getTransactions(this.props.user._id);
    }

    logOut = async () => {
        this.props.logOut();
        this.props.navigation.navigate('Auth');
    };
    
    static navigationOptions = {
        header: null,
    };

    getIcon = (category) => {
        switch(category) {
            case('Payment'):
                return <Text style={{fontSize: 26}}>💰</Text>
            case('Travel'):
                return <Text style={{fontSize: 26}}>🗺</Text>
            case('Food and Drink'):
                return <Text style={{fontSize: 26}}>🍕</Text>
            default:
                return <Text style={{fontSize: 26}}>🤷‍</Text>
        }
    }

    render() {
        
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <ScrollView style={common.page}>
                <View style={styles.top}>
                <Text onPress={this.logOut}>LOGOUT</Text>

                    <Text style={common.h1_primary}>Balance</Text>
                    <Text style={styles.balanceText}>${this.props.user.currentBalance}</Text>
                </View>


                <AreaChart
                    style={{ height: 200 }}
                    data={ data }
                    contentInset={{ top: 30, bottom: 30 }}
                    curve={ shape.curveNatural }
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                >
                    <Grid/>
                </AreaChart>
               {/* <View style={styles.top}>
                    <Text style={common.h1_primary}>Upcoming</Text>
                </View> */}

                <View style={styles.top}>
                    <Text style={common.h1_primary}>Past</Text>
                    {/* <View style={styles.past}> */}
                    {
                        this.props.user.transactions.map((transaction, index) => {
                            return (
                                <View key={index} style={styles.item}>
                                    <View style={styles.leftPast}>
                                        <LinearGradient
                                            
                                            colors={['#C35EBF', '#9861D9', '#7662EA']}
                                            style={{ padding: 4, alignItems: 'center', borderRadius: 10, marginRight: 12, justifyContent: 'center', alignSelf: 'center' }}>
                                            {this.getIcon(transaction.category[0])}
                                        </LinearGradient> 
                                        <View>
                                            <Text style={styles.itemCat}>{transaction.category[0]}</Text>
                                            <Text style={styles.itemDate}>{transaction.date}</Text>
                                        </View>
                                    </View>
                                    <Text style={ Math.sign(transaction.amount)  == '-1' ? styles.red : styles.green }>
                                        ${transaction.amount}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>          
        )
    };
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

function mapDispatchToProps() {
    return {
        logOut,
        getTransactions
    };
};


export default connect(mapStateToProps, mapDispatchToProps())(Dashboard);
