import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from '../AuthScreens/styles/forms';
import billStyles from './billStyles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Dropdown } from 'react-native-material-dropdown';

// To add a bill, you fill out this form with a name amount, date  and recurring value.
// You can also add a date for when its due
// When you hit submit, we submit that to save in our database under the user, as a doc ref to their bills.
// When a user loads their dashboard, we will pull their bills, this will return a list of objects of all the bills you have.

class AddBill extends Component {

    state = {
        name:'',
        amount: '',
        nameFocused: false,
        amountFocused: false,
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

    onChangeText = (text, feildName) => {
        this.setState({
            [feildName]: text
        });
    };
    
    // ------------------------------------------
    // Input action functions
    // ------------------------------------------ 
    
    onFocus = (type) => {
        this.setState({
            [type]: true
        });
    };

    render() {

        let data = [
            { value: 'Banana'},
            { value: 'Mango' },
            { value: 'Pear'}
        ];

        return (
            <View style={common.page}>
                <Text style={[common.h1_primary, common.center]}>Add a Bill</Text>
                <View style={common.centerVerticalElements}>
                    <View style={styles.form}>
                        <TextInput
                            onChangeText={(text) => this.onChangeText(text, 'name')}
                            value={this.state.name}
                            style={this.state.nameFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                            onFocus={ () => this.onFocus('nameFocused') }
                            onBlur={ () => this.onBlur('name', 'nameFocused') }
                            placeholder='Bill Name'
                            placeholderTextColor={styles.placeholder}
                            autoCapitalize='none'
                        />
                        <TextInput
                            onChangeText={(text) => this.onChangeText(text, 'amount')}
                            value={this.state.username}
                            style={this.state.amountFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                            onFocus={ () => this.onFocus('amountFocused') }
                            onBlur={ () => this.onBlur('amount', 'amountFocused') }
                            placeholder='Amount'
                            autoCapitalize='none'
                            placeholderTextColor={styles.placeholder}
                        />
                        <Dropdown
                            style={billStyles.dropdown}
                            label='Favorite Fruit'
                            data={data}
                        />
                        {this.state.showError === true ? <Text style={common.errorMsg}>Something went wrong</Text> : null }
                        <TouchableOpacity style={common.iconBtn} onPress={() => this.handleSubmit()}>
                            <FontAwesomeIcon
                                style={common.icon}
                                size={24}
                                icon={ faPlus } 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, null)(AddBill);

