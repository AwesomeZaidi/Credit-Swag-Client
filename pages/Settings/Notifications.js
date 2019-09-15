import React, { useState, useEffect } from 'react';
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

const Notifications = (props) => {
    const [overdraftNotification, setOverdraftNotification] = useState(props.user.overdraftNotification) //  bool
    const [minimumBalanceNotification, setMinimumBalanceNotification] = useState(props.user.minimumBalanceNotification)
    const [bigTransactionNotification, setBigTransactionNotification] = useState(props.user.minimumBalanceNotification)

    toggleSwitch = (notificationSetting, notificationOnOrOff) => {
        switch(notificationSetting) {
            case 'overdraftNotification':
                props.overdraftNotification(notificationOnOrOff, props.user._id);
                setOverdraftNotification(notificationOnOrOff)
                break;
            case 'minimumBalanceNotification':
                props.minimumBalanceNotification(notificationOnOrOff, props.user._id);
                setMinimumBalanceNotification(notificationOnOrOff)
                break;
            case 'bigTransactionNotification':
                props.bigTransactionNotification(notificationOnOrOff, props.user._id);
                setBigTransactionNotification(notificationOnOrOff)
                break;
            default:
                break;
        };
    };

    return (
        <View style={styles.page}>
            <Text style={[common.h1_primary, styles.centerText, styles.pushOffDown]}>Notifications</Text>

            <View style={common.spaced_row_line}>
                <Text style={[common.text_label_white, common.textLeft]}>
                    Overdraft
                </Text>
                <Switch
                    onValueChange = {() => this.toggleSwitch('overdraftNotification', !props.user.overdraftNotification)}
                    value={overdraftNotification}
                />
            </View>

            <View style={common.spaced_row_line}>
                <Text style={[common.text_label_white, common.textLeft]}>
                $50 Mininum Balance
                </Text>
                <Switch
                    style={{marginTop:30}}
                    onValueChange = {() => this.toggleSwitch('minimumBalanceNotification', !props.user.minimumBalanceNotification)}
                    value={minimumBalanceNotification}
                />
            </View>

            <View style={common.spaced_row_line}>
                <Text style={[common.text_label_white, common.textLeft]}>
                $50 Big Transaction
                </Text>
                <Switch
                    style={{marginTop:30}}
                    onValueChange = {() => toggleSwitch('bigTransactionNotification', !props.user.bigTransactionNotification)}
                    value={bigTransactionNotification}
                />
            </View>
        </View>
    );
}

Notifications.navigationOptions = ({ navigation }) => {
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
