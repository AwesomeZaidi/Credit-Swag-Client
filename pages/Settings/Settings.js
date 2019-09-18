import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import common from '../styles/common.style';
import styles from './SettingsStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Settings extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
           headerTintColor: '#fff',
           headerStyle: {
            backgroundColor: '#373745',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
           }
        }
    }

    render() {
        return (
            <View style={styles.page}>

                <Text style={[common.h1_primary, styles.centerText, styles.settingTitle]}>Settings</Text>

                <View>

                    <Text style={[common.text_label_gray, styles.pushOffDown, common.textLeft]}>Account</Text>
                    

                    <TouchableHighlight style={styles.pushOffDownXl} onPress={() => this.props.navigation.navigate('Profile')}>
                        <View style={common.spaced_row_line}>
                            <Text style={[common.text_label_white, common.textLeft]}>
                                Update Profile
                            </Text>
                            <Text style={[common.text_label_white, common.textLeft]}>
                            <FontAwesomeIcon
                                style={common.settingIcon}
                                size={16}
                                icon={ faArrowRight } 
                            />
                            </Text>

                        </View>
                    </TouchableHighlight>


                    <Text style={[common.text_label_gray, styles.pushOffDown, common.textLeft]}>Alerts</Text>
                    <TouchableHighlight style={styles.pushOffDownXl} onPress={() => this.props.navigation.navigate('Notifications')}>
                        <View style={common.spaced_row_line}>
                            <Text style={[common.text_label_white, common.textLeft]}>
                                Update Notifications
                            </Text>
                            <Text style={[common.text_label_white, common.textLeft]}>
                            <FontAwesomeIcon
                                style={common.settingIcon}
                                size={16}
                                icon={ faArrowRight } 
                            />
                            </Text>
                        </View>                    
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default Settings;
