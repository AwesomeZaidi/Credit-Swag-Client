import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
} from 'react-native';
import { connect } from "react-redux";
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
                        title="MT"
                    />
                    {/* <Text style={[common.h1_primary, styles.topName]}>Timofey Makhlay</Text>  */}
                </View>
                <View style={styles.bottom}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.text}>Timofey Mikhael</Text> 
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.text}>{this.props.user.email}</Text> 
                    </View> 
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Number</Text>
                        <Text style={styles.text}>+1 630-407-7258</Text> 
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

export default connect(mapStateToProps, null)(Profile);
