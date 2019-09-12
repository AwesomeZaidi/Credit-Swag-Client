import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from './SettingsStyles';
import { overdraftNotification, minimumBalanceNotification, bigTransactionNotification } from '../../redux/actions/index';

class Notifications extends Component {
    state = {
        overdraftNotification: this.props.user.overdraftNotification, //  bool
        minimumBalanceNotification: this.props.user.minimumBalanceNotification, //  bool
        bigTransactionNotification: this.props.user.bigTransactionNotification, //  bool
        bigTransactionAmount: this.props.user.bigTransactionAmount, //  number
        minimumBalanceAmount: this.props.user.minimumBalanceAmount, //  number  
    }

    componentDidUpdate(prevProps) {
        // Get the values from redux and em to state.
        if (prevProps.isFocused !== this.props.isFocused) {
            this.setState({
                overdraftNotification: this.props.user.overdraftNotification,
                minimumBalanceNotification: this.props.user.minimumBalanceNotification,
                bigTransactionNotification: this.props.user.bigTransactionNotification,
                bigTransactionAmount: this.props.user.bigTransactionAmount,
                minimumBalanceAmount: this.props.user.minimumBalanceAmount,   
            })
        }
    }

    toggleSwitch = (notificationSetting, notificationOnOrOff) => {
        switch(notificationSetting) {
            case 'overdraftNotification':
                this.props.overdraftNotification(notificationOnOrOff, this.props.user._id);
                this.setState({
                    overdraftNotification: notificationOnOrOff
                });
                break;
            case 'minimumBalanceNotification':
                this.props.minimumBalanceNotification(notificationOnOrOff, this.props.user._id);
                this.setState({
                    minimumBalanceNotification: notificationOnOrOff
                })
                break;
            case 'bigTransactionNotification':
                this.props.bigTransactionNotification(notificationOnOrOff, this.props.user._id);
                this.setState({
                    bigTransactionNotification: notificationOnOrOff
                })
                break;
            default:
                break;
        };
        this.setState({
            notificationSetting: notificationOnOrOff
        });
    };

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
            <View style={styles.page}>

                <Text style={[common.h1_primary, styles.centerText, styles.pushOffDown]}>Notifications</Text>

                <View style={common.spaced_row_line}>
                    <Text style={[common.text_label_white, common.textLeft]}>
                        Overdraft
                    </Text>
                    <Switch
                        onValueChange = {() => this.toggleSwitch('overdraftNotification', !this.state.overdraftNotification)}
                        value={this.state.overdraftNotification}
                    />
                </View>

                <View style={common.spaced_row_line}>
                    <Text style={[common.text_label_white, common.textLeft]}>
                    $50 Mininum Balance
                    </Text>
                    {/* <Text>Amount: {this.state.minimumBalanceAmount}</Text> */}
                    <Switch
                        style={{marginTop:30}}
                        onValueChange = {() => this.toggleSwitch('minimumBalanceNotification', !this.state.minimumBalanceNotification)}
                        value={this.state.minimumBalanceNotification}
                    />
                </View>


                <View style={common.spaced_row_line}>
                    <Text style={[common.text_label_white, common.textLeft]}>
                    $50 Big Transaction
                    </Text>
                    {/* <Text>Amount: {this.state.bigTransactionAmount}</Text> */}
                    <Switch
                        style={{marginTop:30}}
                        onValueChange = {() => this.toggleSwitch('bigTransactionNotification', !this.state.bigTransactionNotification)}
                        value={this.state.bigTransactionNotification}
                    />
                </View>

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

export default connect(mapStateToProps, mapDispatchToProps())(withNavigationFocus(Notifications));


// Old code D:

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
