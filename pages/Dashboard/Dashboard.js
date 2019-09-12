// Letssee ifthe issue is  purely with the transactionalproperty send over from plaid connect on login.

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import {
    Text,
    ScrollView,
    FlatList,
    View,
    Button,
    Modal
} from 'react-native';
import { connect } from "react-redux";
import { getTransactions, getBalanceGraphData } from '../../redux/actions/index';
import {
    LineChart,
} from 'react-native-chart-kit'
import { withNavigationFocus } from 'react-navigation';
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import  ModalWrapper from 'react-native-modal-wrapper';

import common from '../styles/common.style';
import styles from './DashboardStyles';


// ----------------------------------------------------------------------------------
// Dashboard Component
// ----------------------------------------------------------------------------------

const Dashboard = (props) => {

    const [user, setUser] = useState(props.user);
    const [balanceGraphData, setBalanceGraphData] = useState(false);
    const [bills, setBills] = useState(props.bills);
    const [modalOpen, setModalOpen] = useState(false);
    const [billName, setBillName] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [billDate, setBillDate] = useState('');
    
    useEffect(() => {        
        props.getTransactions(props.user._id)
        props.getBalanceGraphData(props.user._id)
    }, []);

    useEffect(() => {     
        setUser(props.user)
    }, [props.user]);

    useEffect(() => {
        console.log('bills changed');
        setBills(props.bills)
    }, [props.bills]);

    useEffect(() => {
        setBalanceGraphData(props.balanceGraphData)
    }, [props.balanceGraphData]);

    const getIcon = (category) => {
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

    const getBillIcon = (category) => {
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

    let values = [];
    balanceGraphData &&
    balanceGraphData.map((obj) => {
        values.push(Number(obj.value));
    });
    if (values.length > 7) {
        values = values.slice(-7)
    }

    console.log('before return');
    return (
        
        <ScrollView style={common.page}>
            {/* Balance and Balance Graph */}
            <View style={styles.top}>
                <Text style={common.h1_primary}>Balance</Text>
                <Text style={styles.balanceText}>${user.currentBalance}</Text>
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
            <Text style={[common.h1_primary, common.pushLeft, common.pushOffDown]} onPress={() => props.navigation.navigate('AddBill')}>Bills</Text>
             <FlatList
                style={common.pushLeft}
                horizontal={true}
                data={[{key: 'a'}]}
                renderItem={() => (
                    bills.length > 0 ?                    
                        <>
                            <LinearGradient   
                                onPress={() => props.navigation.navigate('AddBill')}      
                                colors={['#3c3c3c', '#424242']}
                                style={[common.bigIcon, common.addIcon]}>
                                <Text onPress={() => props.navigation.navigate('AddBill')} style={{color: '#fff', fontSize: 36}}>+</Text>
                            </LinearGradient> 
                            {bills.map((bill, index) => {
                                return (
                                    <LinearGradient 
                                        key={index}     
                                        colors={['#C35EBF', '#9861D9', '#7662EA']}
                                        style={common.bigIcon}>
                                        <Text
                                        //     onPress={() => this.setState({
                                        //         modalOpen: !this.state.modalOpen,
                                        //         billName: bill.name,
                                        //         billAmount: bill.amount,
                                        //         billDate: bill.date,
                                        // })}
                                        >
                                            {getBillIcon(bill.category)}

                                        </Text>
                                    </LinearGradient>
                                )
                            })}    
                        </>
                    :
                        <LinearGradient   
                            onPress={() => props.navigation.navigate('AddBill')}      
                            colors={['#3c3c3c', '#424242']}
                            style={[common.bigIcon, common.addIcon]}>
                            <Text onPress={() => props.navigation.navigate('AddBill')} style={{color: '#fff',fontSize: 36}}>+</Text>
                        </LinearGradient>         
                )}
            />
            <ModalWrapper
                containerStyle={{ flexDirection: 'row', alignItems: 'flex-end' }}
                style={styles.billModal}
                onRequestClose={() => setModalOpen(!modalOpen)}
                visible={modalOpen}>
                    <Text style={styles.modalText}>{billName}</Text>
                    <Text style={styles.modalText}>Amount: {billAmount}</Text>
                    <Text style={styles.modalText}>Date: {billDate}</Text>
            </ModalWrapper>
            
            {/* Past Transactions List */}
            <View style={styles.top}>
            <Text style={[common.h1_primary, common.pushOffUp]}>Past</Text>
                { user.transactions &&
                    user.transactions.map((transaction, index) => {
                        return (
                            <View key={index} style={styles.item}>
                                <View style={styles.leftPast}>
                                    <LinearGradient
                                        colors={['#C35EBF', '#9861D9', '#7662EA']}
                                        style={{ padding: 4, alignItems: 'center', borderRadius: 10, marginRight: 12, justifyContent: 'center', alignSelf: 'center' }}>
                                        {getIcon(transaction.category[0])}
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
}

Dashboard.navigationOptions = {
    header: null,
};


const mapStateToProps = state => {
    return {
        user: state.user,
        balanceGraphData: state.balanceGraphData,
        bills: state.bills
    };
};

function mapDispatchToProps() {
    return {
        getTransactions,
        getBalanceGraphData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(withNavigationFocus(Dashboard));