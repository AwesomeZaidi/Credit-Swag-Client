import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Button,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { addGoal } from "../../redux/actions/index";
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from './goalStyles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-native-material-dropdown';
// import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// To add a bill, you fill out this form with a name limit, date  and recurring value.
// You can also add a date for when its due
// When you hit submit, we submit that to save in our database under the user, as a doc ref to their bills.
// When a user loads their dashboard, we will pull their bills, this will return a list of objects of all the bills you have.

class AddGoal extends Component {

    state = {
        name:'',
        limit: '',
        category: '',
        nameFocused: false,
        limitFocused: false,
        date: moment(new Date()).format("DD/MM/YYYY"),
        isDateTimePickerVisible: false
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

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
     
    hideDateTimePicker = date => {
        this.setState({
            date: date,
            isDateTimePickerVisible: false
        });
    };

    handleDatePicked = date => {
        this.hideDateTimePicker(moment(date).format("MM/DD/YYYY"));
    };

    onChangeText = (text, feildName) => {
        this.setState({
            [feildName]: text
        });
    };
    
    // ------------------------------------------
    // Input action functions
    // ------------------------------------------ 
    
    onFocus = type => {
        this.setState({
            [type]: true
        });
    };

    onBlur = (feildName, type) => {
        // if the input field is empty, change its focus state to false.
        !this.state[feildName] ?
            this.setState({
                [type]: false
            })
        :
        null
    };

    handleSubmit = async () => {
        this.props.addGoal(this.state, this.props.user._id);
        return this.props.navigation.navigate('Goals')
    } 

    render() {
        const data = [
            { value: 'Housing'},
            { value: 'Travel' },
            { value: 'Food and Drink' },
            { value: 'School' },
            { value: 'Other' },
        ];

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={common.page}>
                    <Text style={[common.h1_primary, common.center]}>Saving Goal</Text>
                    <View style={common.centerVerticalElements}>
                        <View style={styles.form}>
                            <Dropdown
                                textColor='white'
                                // baseColor='white'
                                selectedItemColor='#000'
                                style={styles.dropdown}
                                label='Category'
                                data={data}
                                onChangeText={(value) => this.onChangeText(value, 'category')}
                            />
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
                                keyboardType='numeric'
                                onChangeText={(text) => this.onChangeText(text, 'limit')}
                                value={this.state.limit}
                                style={this.state.limitFocused ? [styles.input, styles.inputFieldFocus] : [styles.input, styles.inputFieldBlur]}
                                onFocus={ () => this.onFocus('limitFocused') }
                                onBlur={ () => this.onBlur('limit', 'limitFocused') }
                                placeholder='limit'
                                autoCapitalize='none'
                                placeholderTextColor={styles.placeholder}
                            />
                            <View style={styles.addContainerCenter}>
                                <Button style={common.btnPrimary} title="Change Date" onPress={this.showDateTimePicker} />
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />
                            </View>
                            <Text style={styles.dateText}>{String(this.state.date)}</Text>
                            <View style={styles.addContainerCenter}>
                                {this.state.showError === true ? <Text style={common.errorMsg}>Something went wrong</Text> : null }
                                <TouchableOpacity style={common.circle} onPress={() => this.handleSubmit()}>
                                    <FontAwesomeIcon
                                        style={common.icon}
                                        size={24}
                                        icon={ faPlus } 
                                    />
                                </TouchableOpacity>
                            </View>       
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
        addGoal
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(AddGoal);
