import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    Switch,
} from 'react-native';
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from './ProfileStyles';
import { overdraftNotification, minimumBalanceNotification, bigTransactionNotification } from '../../redux/actions/index';

class Notifications extends Component {
    state = {
        overdraftNotification: this.props.user.overdraftNotification,
        minimumBalanceNotification: this.props.user.minimumBalanceNotification,
        bigTransactionNotification: this.props.user.bigTransactionNotification,
        bigTransactionAmount: this.props.user.bigTransactionAmount,
        minimumBalanceAmount: this.props.user.minimumBalanceAmount,          
    }

    toggleSwitch = (notificationSetting, notificationOnOrOff) => {
        switch(notificationSetting) {
            case 'overdraftNotification':
                this.props.overdraftNotification(notificationOnOrOff, this.props.user._id);
                // this.setState({
                //     overdraftNotification: !overdraftNotification
                // })
                break;
            case 'minimumBalanceNotification':
                this.props.minimumBalanceNotification(notificationOnOrOff, this.props.user._id);
                break;
            case 'bigTransactionNotification':
                this.props.bigTransactionNotification(notificationOnOrOff, this.props.user._id);
                break;
            default:
                break;
        }
        this.setState({
            notificationSetting: notificationOnOrOff
        })
    }

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

    //  A whole bag of shit dicks.
    // x1(oldProps) {
    //     console.log('hery');

    //     setTimeout(() => {
    //         const newProps = this.props;
    //         console.log('oldProps.overdraftNotification:', oldProps.user.overdraftNotification);
    //         console.log('newProps.overdraftNotification:', newProps.user.overdraftNotification);
            
    //         if(oldProps.user.overdraftNotification !== newProps.user.overdraftNotification) {
    //             console.log('here');            
    //             this.setState({
    //                 overdraftNotification: this.props.user.overdraftNotification,
    //                 minimumBalanceNotification: this.props.user.minimumBalanceNotification,
    //                 bigTransactionNotification: this.props.user.bigTransactionNotification,
    //                 bigTransactionAmount: this.props.user.bigTransactionAmount,
    //                 minimumBalanceAmount: this.props.user.minimumBalanceAmount
    //             });
    //         }
    //     }, 1000);
    // }

    render() {   
        console.log('this.state.overdraftNotification:', this.state.overdraftNotification);
             
        return (
            <View style={styles.topDownCenterPage}>
                <Text style={[common.h1_primary, styles.profileTitle]}>Notifications</Text>

                <Text>Overdraft</Text>
                <Switch
                    style={{marginTop:30}}
                    onValueChange = {() => this.toggleSwitch('overdraftNotification', !this.state.overdraftNotification)}
                    value={this.state.overdraftNotification}
                />

                <Text>Mininum balance</Text>
                <Switch
                    style={{marginTop:30}}
                    onValueChange = {() => this.toggleSwitch('bigTransactionNotification', !this.state.bigTransactionNotification)}
                    onValueChange = {this.toggleSwitch}
                    value={this.state.bigTransactionNotification}
                />
                <Text>Amount: {this.state.minimumBalanceAmount}</Text>

                <Text>Big Transaction</Text>
                <Switch
                    style={{marginTop:30}}
                    onValueChange = {() => this.toggleSwitch('minimumBalanceNotification', !this.state.minimumBalanceNotification)}
                    value={this.state.minimumBalanceNotification}
                />
                <Text>Amount: {this.state.bigTransactionAmount}</Text>
                {/* editicon - open popup modal/alert thing idk whatever is easiest, not v important rn. */}

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

function mapDispatchToProps() {
    return {
        overdraftNotification,
        minimumBalanceNotification,
        bigTransactionNotification
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Notifications);

