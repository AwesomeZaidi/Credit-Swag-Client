
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import React, { Component } from 'react';
import {
    Text,
    ScrollView,
    View
} from 'react-native';
import { logOut, connectBank } from '../../redux/actions/index';
import { getTransactions } from '../../redux/actions/index';

import { connect } from "react-redux";

import common from '../styles/common.style';
import styles from './DashboardStyles';

import { LinearGradient } from 'expo-linear-gradient';

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

    render() {
        
        return (
            <ScrollView style={common.page}>
                <View style={styles.top}>
                <Text onPress={this.logOut}>LOGOUT</Text>

                    <Text style={common.h1_primary}>Balance</Text>
                    <Text style={styles.balanceText}>${this.props.user.currentBalance}</Text>
                </View>

                <View style={styles.top}>
                    <Text style={common.h1_primary}>Past</Text>
                    {/* <View style={styles.past}> */}
                    {
                        this.props.user.transactions.map((transaction, index) => {
                            return (
                                <View key={index} style={styles.item}>
                                    <LinearGradient
                                        colors={['#C35EBF', '#9861D9', '#7662EA']}
                                        style={{ padding: 15, alignItems: 'center', borderRadius: 10,marginRight: 10 }}>
                                    </LinearGradient>
                                    <View style={styles.leftPast}>
                                        
                                        <Text style={styles.itemCat}>{transaction.category[0]}</Text>
                                        <Text style={styles.itemDate}>{transaction.date}</Text>
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
