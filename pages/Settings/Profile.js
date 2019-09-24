import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
} from 'react-native';
import { connect } from "react-redux";
import { logOut } from '../../redux/actions/index';
import common from '../styles/common.style';
import styles from './ProfileStyles';
import { Avatar, Button } from 'react-native-elements';


class Profile extends Component {
    
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

    _signOutAsync = async () => {
        this.props.logOut();
        this.props.navigation.navigate('Auth');
    };
    //  When user taps on text, it should trigger a function to change the state for what's being shown,
    // the field should dissaper, and the input box should appear along with a update button... TBD
    // flow of this.
    render() {
        return (
            <View style={styles.topDownCenterPage}>
                <View style={styles.top}>
                    <Text style={[common.h1_primary, styles.profileTitle]}>Profile</Text>
                    <Avatar
                        style={styles.profilePic}
                        size="large"
                        rounded
                        title="AZ"
                    />
                </View>
                <View style={styles.bottom}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.text}>{this.props.user.name}</Text> 
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.text}>{this.props.user.email}</Text> 
                    </View> 

                    <Button style={common.h1_primary} onPress={() => this._signOutAsync()} title='Logout'/>

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

function mapDispatchToProps() {
    return {
        logOut,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Profile);

