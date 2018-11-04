import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import CameraScreen from './src/components/camera'
import FormApp from "./src/components/form.js"
import { AppRegistry } from 'react-native';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from "apollo-boost";

//const url = "http://0.0.0.0:4000/api"
const url = "https://frightful-spell-70294.herokuapp.com/api"

const client = new ApolloClient({
  uri: url
});


class HomeScreen extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <FormApp/>
      </ApolloProvider>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Camera"
          onPress={() => this.props.navigation.navigate('Camera')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <CameraScreen navigation={this.props.navigation} />
    );
  }
}

class HomeScreen2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Camera"
          onPress={() => this.props.navigation.navigate('Camera')}
        />
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Camera: { screen: DetailsScreen },
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Camera: { screen: DetailsScreen },
});

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
    Home2: { screen: HomeScreen2 },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `md-shirt`;
        } else if (routeName === 'Settings') {
          iconName = `md-grid`;
        } else if (routeName === 'Home2') {
          iconName = `md-appstore`
        }
        return <Ionicons name={iconName} size={34} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      showLabel: false
    },
  }
);

/*
componentDidMount () {
    
    client
    .query({
      query: gql`
        {
          post(id:1) {
            title
            body
            id
          }
        }
      `
    })
    .then(result => this.setState({userG:result.data.post}));
  }
*/
