import React, { useEffect } from 'react';
import { fetchGoal } from "../../redux/actions/index";
import { connect } from "react-redux";
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import common from '../styles/common.style';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './goalStyles';

const SavingGoal = (props) => {
    // const goal = props.navigation.getParam('goal', 'default value');  
    const userId = props.navigation.getParam('userId', 'default value');
    const goalIndex = props.navigation.getParam('goalIndex', '');
    const goal = props.user.savingGoals[goalIndex]
    
    useEffect(() => {
        props.fetchGoal(goal, userId, goalIndex)
      }, []);

    // Obviosuly can optimize this later, just not a priority right now.
    _getIcon = (category) => {
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

    return (          
        <ScrollView style={[common.page, styles.savingPage]}>
            <View style={styles.top}>
                <Text style={[common.h1_primary]}>Saving Goal</Text>
                <Text style={common.text_sm}>Edit</Text>
            </View>
            <View>
                <Text style={[common.text_label_gray, common.pushOffUp, styles.header]}>{goal.name}</Text>
                <Text style={[common.h1_primary, common.pushOffUp, styles.header]}>${goal.limit}</Text>
                <Text style={ goal.health >= 0 ? [common.text_label_green, styles.header] : [common.text_label_red, styles.header]}>Saved ${goal.health}</Text>
            </View>

            <Text style={[common.h1_primary, common.pushOffUp, styles.header, common.pushOffDown]}>Summary</Text>
            <View style={common.spaced_row_line}>
                <Text style={common.text_label_gray}>spent: </Text>
                <Text style={common.text_label_white}>{goal.health}</Text>
            </View>
            <View style={common.spaced_row_line}>
                <Text style={common.text_label_gray}>limit: </Text>
                <Text style={common.text_label_white}>{goal.limit}</Text>
            </View>
            <View style={common.spaced_row}>
                <Text style={common.text_label_gray}>net: </Text>
                <Text style={goal.limit - goal.health >= 0 ? common.text_label_green : styles.common.text_label_red}>
                    { goal.limit - goal.health >= 0 ?
                        `+ ${goal.limit - goal.health}`
                        :
                        `- ${ goal.limit - goal.health}` }
                </Text>
            </View>

            <Text style={[common.h1_primary, common.pushOffUp, styles.header]}>Spendings</Text>
            {
                goal.spendings.map((spent, index) => {
                    return (
                        <View key={index} style={styles.item}>
                            <View style={styles.leftPast}>
                                <LinearGradient
                                    colors={['#C35EBF', '#9861D9', '#7662EA']}
                                    style={{ padding: 4, alignItems: 'center', borderRadius: 10, marginRight: 12, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{fontSize: 26}}>🗺</Text>
                                </LinearGradient> 
                                <View>
                                    <Text style={styles.itemCat}>{spent.category}</Text>
                                    <Text style={styles.itemDate}>{spent.date}</Text>
                                </View>
                            </View>
                            <Text style={ Math.sign(spent.amount)  == '-1' ? styles.red : styles.green }>
                                ${spent.amount}
                            </Text>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

SavingGoal.navigationOptions = {
    headerTintColor: '#fff', //#fff
    headerStyle: {
    backgroundColor: '#24232E',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

function mapDispatchToProps() {
    return {
        fetchGoal,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(SavingGoal);
