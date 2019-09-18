import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    View,
    Text,
    TouchableHighlight,
} from 'react-native';
import { connect } from "react-redux";
import common from '../styles/common.style';
import styles from './goalsStyles';
// import { getSavingGoals } from '../../redux/actions/index';
import { withNavigationFocus } from 'react-navigation';

class Goals extends Component {

    state = {
        goals: []
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.setState({
            goals: this.props.goals
        })
    }

    componentDidUpdate(prevProps) {     
        if (prevProps.isFocused !== this.props.isFocused) {
            this.setState({
                goals: this.props.goals
            })
        }
    }

    _goToGoal = (goal, goalIndex) => {        
        const userId =  this.props.user._id;
        this.props.navigation.navigate('Goal', { goal: goal, userId: userId, goalIndex: goalIndex });
    }

    render() {
        return (
            <ScrollView style={common.page}>
                <View style={[styles.top, common.center]}>
                    <Text style={[common.h1_primary, styles.profileTitle]}>Saving Goals</Text>
                    <Text style={common.h1_primary} onPress={() => this.props.navigation.navigate('AddGoal')}>+</Text>
                </View>

                <View style={[common.topDownCenterPage, common.center]}>
                    { this.state.goals &&
                        this.state.goals.map((goal, index) =>  {
                            return (
                                <TouchableHighlight key={index} style={styles.goalContainer} onPress={() => this._goToGoal(goal, index)}>
                                    <View>
                                        <Text style={styles.goalName}>{goal.name}</Text>
                                        <Text style={common.h1_primary}>{goal.limit}</Text>
                                        {/* Need too make a fetch call to update this value. */}
                                        <Text style={styles.currentAmount}>Spent: {goal.health}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        goals: state.goals,
    }
};

export default connect(mapStateToProps, null)(withNavigationFocus(Goals));
