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
import { getSavingGoals } from '../../redux/actions/index';
import { withNavigationFocus } from 'react-navigation';

class Goals extends Component {

    state = {
        goals: []
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.props.goals.length > 0 && this.props.getSavingGoals(this.props.user._id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            this.props.goals.length > 0 && this.props.getSavingGoals(this.props.user._id);
            this.setState({
                goals: this.props.goals
            })
        }
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
                                <TouchableHighlight key={index} style={styles.goalContainer} onPress={() => this.props.navigation.navigate('Goal')}>
                                    <View>
                                        <Text style={styles.goalName}>{goal.name}</Text>
                                        <Text style={common.h1_primary}>{goal.limit}</Text>
                                        <Text style={styles.currentAmount}>Spent: $XYZ</Text>
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
        goals: state.goals
    }
};

function mapDispatchToProps() {
    return {
        getSavingGoals,
    };
};
export default connect(mapStateToProps, mapDispatchToProps())(withNavigationFocus(Goals));
