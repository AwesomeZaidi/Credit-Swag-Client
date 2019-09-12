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

// function mapDispatchToProps() {
//     return {
//         getSavingGoals,
//     };
// };

export default connect(mapStateToProps, null)(withNavigationFocus(Goals));

// Old code  sad

// Functional component - when i first hit this page, i should have the users savings goals already in their obj
// so just load from redux.
// when i go to add something, make the post request, and update the user obj with the response data
// this comp should update its  user  prop cuz its a hook!

// class Goals extends React.Component {
//     render() {
//       return (
//         <GoalsView navigation={this.props.navigation}/>
//       );
//     }
//   }

// const GoalsView = (user, {navigation}) => {
//     // might need to useEffect and getupdateduser here shall see...
withNavigationFocus
// // when you're using a functional comp, does it automaticlally update when any redux prop tied to it changes?
//     return (
//         <ScrollView style={common.page}>
//             <View style={[styles.top, common.center]}>
//                 <Text style={[common.h1_primary, styles.profileTitle]}>Saving Goals</Text>
//                 <Text style={common.h1_primary} onPress={() => navigation.navigate('AddGoal')}>+</Text>
//             </View>

//             <View style={[common.topDownCenterPage, common.center]}>
//                 { user.savingGoals &&
//                     user.savingGoals.map((goal, index) =>  {
//                         return (
//                             <TouchableHighlight key={index} style={styles.goalContainer} onPress={() => navigation.navigate('Goal')}>
//                                 <View>
//                                     <Text style={styles.goalName}>{goal.name}</Text>
//                                     <Text style={common.h1_primary}>{goal.limit}</Text>
//                                     <Text style={styles.currentAmount}>Spent: $XYZ</Text>
//                                 </View>
//                             </TouchableHighlight>
//                         )
//                     })
//                 }
//             </View>
//         </ScrollView>
//     )
// }

// Goals.navigationOptions = {
//     header: null,
// };
