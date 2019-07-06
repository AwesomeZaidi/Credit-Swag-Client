
// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    Button,
    AsyncStorage,
    ActivityIndicator,
    FlatList,
} from 'react-native';

import { logout } from '../../redux/actions/index';
import Card from '../Shared/Card';
import common from '../styles/common.style';

import { connect } from "react-redux";

class Home extends Component {

    // ------------------------------------------
    // State
    // ------------------------------------------
    
    state = {
        pokemonList: [],
        loading: true
    };

    // ------------------------------------------
    // Navigation Options: title
    // ------------------------------------------
    
    static navigationOptions = {
		title: 'Home Page'
    };

    async componentDidMount() {
        try {
            //Assign the promise unresolved first then get the data using the json method. 
            const pokemonApiCall = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const pokemon = await pokemonApiCall.json();
            this.setState({pokemonList: pokemon.results, loading: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    logOut = async () => {
        await this.props.logout();
        this.props.navigation.navigate('Auth');
    };
    
    render() {      
        const { pokemonList, loading } = this.state;
        const { navigation } = this.props;
        return (
            <ScrollView>
                <Text style={common.text_sm}>Welcome your Dashboard</Text>
                <Button onPress={this.logOut} title='Log Out'></Button>
                {!loading ?
                    <FlatList 
                    data={pokemonList}
                    renderItem={(data) => <Card {...data.item} navigation={navigation} />}
                    keyExtractor={(item) => item.name}
                    />
                : <ActivityIndicator />}
                
                <Button title="Show me more of the app" onPress={this._showMoreApp} />
            </ScrollView>
        )
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Detail');
    };
}


const mapStateToProps = state => {
    return {
        user: state.user
    };
};

function mapDispatchToProps() {
    return {
        logout
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Home);