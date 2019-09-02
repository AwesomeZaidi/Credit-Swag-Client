
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import React, { Component } from 'react';
import {
    Text,
    ScrollView,
    FlatList,
    View,
    Button,
    Modal
} from 'react-native';
import { getTransactions, getBalanceGraphData, logOut } from '../../redux/actions/index';
import {
    LineChart,
  } from 'react-native-chart-kit'
  import { withNavigationFocus } from 'react-navigation';
  import { Dimensions } from 'react-native'
  const screenWidth = Dimensions.get('window').width
import { connect } from "react-redux";

import common from '../styles/common.style';
import styles from './DashboardStyles';

import { LinearGradient } from 'expo-linear-gradient';
import { AreaChart, Grid } from 'react-native-svg-charts'
import  ModalWrapper from 'react-native-modal-wrapper';
import * as shape from 'd3-shape'

// ----------------------------------------------------------------------------------
// Dashboard Component Class
// ----------------------------------------------------------------------------------

class Dashboard extends Component {
    // ------------------------------------------
    // componentDidMount: fetches the user transaction and balance data from redux.
    // ------------------------------------------
    state = {
        loggedOut: false,
        bills: [],
        modalOpen: false,
        billName: '',
        billAmount: '',
        billDate: ''
    }

    componentDidMount() {
        if (!this.props.user) {
            this.props.navigation.navigate('Auth');
        }
        this.props.getTransactions(this.props.user._id);
        this.props.getBalanceGraphData(this.props.user._id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            this.setState({
                bills: this.props.bills
            })
        }
    }

    static navigationOptions = {
        header: null,
    };

    getBillIcon = (category) => {
        switch(category) {
            case('Travel'):
                return <Text style={{fontSize: 36}}>🗺</Text>
            case('Food and Drink'):
                return <Text style={{fontSize: 36}}>🍕</Text>
            case('School'):
                return <Text style={{fontSize: 36}}>🎓</Text>
            case('Housing'):
                return <Text style={{fontSize: 36}}>🏠</Text>
            default:
                return <Text style={{fontSize: 36}}>🤷‍</Text>
        }
    }

    getIcon = (category) => {
        switch(category) {
            case('Payment'):
                return <Text style={{fontSize: 26}}>💰</Text>
            case('Travel'):
                return <Text style={{fontSize: 26}}>🗺</Text>
            case('Food and Drink'):
                return <Text style={{fontSize: 26}}>🍕</Text>
            case('School'):
                return <Text style={{fontSize: 26}}>🎓</Text>
            case('Housing'):
                return <Text style={{fontSize: 26}}>🏠</Text>
            default:
                return <Text style={{fontSize: 26}}>🤷‍</Text>
        }
    }

    render() {
        
        if (!this.props.user) {
            this.props.navigation.navigate('Auth');
        }
        // const balances = [ 100, 50, 100, 50, 100, 50, 100]
        // we can start our cron job to store a queue of the weeks balances
        // and a queue of the months balances 
        let values = [];
        this.props.balanceGraphData &&
        this.props.balanceGraphData.map((obj) => {
            values.push(Number(obj.value));
        });
        if (values.length > 7) {
            values = values.slice(-7)
        }
        return (
            <ScrollView style={common.page}>

                {/* Balance and Balance Graph */}
                <View style={styles.top}>
                    <Text style={common.h1_primary}>Balance</Text>
                    <Text style={styles.balanceText}>${this.props.user.currentBalance}</Text>
                </View>
                <View>
                    <LineChart
                    data={{
                        datasets: [{
                        data: values
                        }]
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor: '#2B2C3B',
                        backgroundGradientFrom: '#2B2B3A',
                        backgroundGradientTo: '#2B2B3A',
                        color: (opacity = 0) => `rgba(123, 192, 56, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    // bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                />
                </View>
                
                {/* Bills Section */}
                <Text style={[common.h1_primary, common.pushLeft, common.pushOffDown]} onPress={() => this.props.navigation.navigate('AddBill')}>Bills</Text>
                <FlatList
                    style={common.pushLeft}
                    horizontal={true}
                    data={[{key: 'a'}]}
                    renderItem={() => (
                        this.state.bills.length > 0 ?                       
                            <>
                                <LinearGradient   
                                    onPress={() => this.props.navigation.navigate('AddBill')}      
                                    colors={['#3c3c3c', '#424242']}
                                    style={[common.bigIcon, common.addIcon]}>
                                    <Text onPress={() => this.props.navigation.navigate('AddBill')} style={{color: '#fff', fontSize: 36}}>+</Text>
                                </LinearGradient> 
                                {this.state.bills.map((bill, index) => {
                                    return (
                                        <LinearGradient 
                                            key={index}     
                                            colors={['#C35EBF', '#9861D9', '#7662EA']}
                                            style={common.bigIcon}>
                                            <Text
                                                onPress={() => this.setState({
                                                    modalOpen: !this.state.modalOpen,
                                                    billName: bill.name,
                                                    billAmount: bill.amount,
                                                    billDate: bill.date,
                                                })}
                                            >
                                            {this.getBillIcon(bill.category)}</Text>
                                        </LinearGradient>
                                    )
                                })}    
                            </>
                        :
                            <LinearGradient   
                                onPress={() => this.props.navigation.navigate('AddBill')}      
                                colors={['#3c3c3c', '#424242']}
                                style={[common.bigIcon, common.addIcon]}>
                                <Text onPress={() => this.props.navigation.navigate('AddBill')} style={{color: '#fff',fontSize: 36}}>+</Text>
                            </LinearGradient>         
                    )}
                />
                <ModalWrapper
                    containerStyle={{ flexDirection: 'row', alignItems: 'flex-end' }}
                    style={styles.billModal}
                    onRequestClose={() => this.setState({modalOpen: !this.state.modalOpen})}
                    visible={this.state.modalOpen}>
                        <Text style={styles.modalText}>{this.state.billName}</Text>
                        <Text style={styles.modalText}>Amount: {this.state.billAmount}</Text>
                        <Text style={styles.modalText}>Date: {this.state.billDate}</Text>
                </ModalWrapper>
                
                {/* Past Transactions List */}
                <View style={styles.top}>
                <Text style={[common.h1_primary, common.pushOffUp]}>Past</Text>
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
        user: state.user,
        balanceGraphData: state.balanceGraphData,
        bills: state.bills,
    };
};

function mapDispatchToProps() {
    return {
        logOut,
        getTransactions,
        getBalanceGraphData,
    };
};


export default connect(mapStateToProps, mapDispatchToProps())(withNavigationFocus(Dashboard));
