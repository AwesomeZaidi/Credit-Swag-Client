
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
import { getTransactions, getBalanceGraphData, logOut } from '../../redux/actions/index';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'
  import { Dimensions } from 'react-native'
  const screenWidth = Dimensions.get('window').width
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
    state = {
        loggedOut: false
    }

    componentDidMount() {
        if (!this.props.user) {
            this.props.navigation.navigate('Auth');
        }
        this.props.getTransactions(this.props.user._id);
        this.props.getBalanceGraphData(this.props.user._id);
    }

    _signOutAsync = async () => {
        await this.props.logOut();
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
        if (!this.props.user) {
            this.props.navigation.navigate('Auth');
        }
        // console.log('this.props.balanceGraphData:', this.props.balanceGraphData);
        // this data needs to be a list of balances we fetch from the backend.
        const balances = [ 100, 50, 100, 50, 100, 50, 100, ]
        // we can start our cron job to store a queue of the weeks balances
        // and a queue of the months balances 
        let values = [];
        this.props.balanceGraphData &&
        this.props.balanceGraphData.map((obj) => {
            values.push(Number(obj.value));
        });

        return (
            <ScrollView contentContainerStyle={common.page}>
                <View style={styles.top}>
                    <Text style={common.h1_primary}>Balance</Text>
                    <Text style={styles.balanceText}>${this.props.user.currentBalance}</Text>
                </View>
                <View>
  <LineChart
    data={{
      datasets: [{
        data: balances
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel={'$'}
    chartConfig={{
      backgroundColor: '#2B2C3B',
      backgroundGradientFrom: '#2B2B3A',
      backgroundGradientTo: '#2B2B3A',
    //   decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 0.2) => `rgba(123, 192, 56, ${opacity})`,
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
{/* 
                <AreaChart
                    style={{ height: 200 }}
                    data={ balances }
                    contentInset={{ top: 30, bottom: 30 }}
                    curve={ shape.curveNatural }
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                > */}
                    {/* <Grid/>
                </AreaChart> */}

                <View style={styles.top}>
                    <Text style={common.h1_primary}>Past</Text>
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
    };
};

function mapDispatchToProps() {
    return {
        logOut,
        getTransactions,
        getBalanceGraphData,
    };
};


export default connect(mapStateToProps, mapDispatchToProps())(Dashboard);
