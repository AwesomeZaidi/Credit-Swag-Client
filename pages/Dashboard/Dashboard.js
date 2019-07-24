
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
        
        return (
            <ScrollView style={common.page}>
                <View style={styles.top}>
                <Text onPress={this.logOut}>LOGOUT</Text>

                    <Text style={common.h1_primary}>Balance</Text>
                    <Text style={styles.balanceText}>${this.props.user.currentBalance}</Text>
                </View>

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
