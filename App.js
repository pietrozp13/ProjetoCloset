import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import CameraScreen from './src/components/camera'
import FormApp from "./src/components/form.js"
import AddClothe from "./src/components/screens/addClothe/addClothe"
import { AppRegistry } from 'react-native';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from "apollo-boost";
import MainScreen from "./src/components/screens/mainScreen/mainScreen"
import { Constants, Camera, FileSystem, Permissions, BarCodeScanner } from 'expo';
import * as firebase from 'firebase'
import { ALL_ROUPAS_QUERY } from "./src/components/screens/mainScreen/mainScreenGraph"

// const url = "http://0.0.0.0:4000/api"
// const url = "https://frightful-spell-70294.herokuapp.com/api"
const url = "https://api-useast.graphcms.com/v1/cjpn3ynkz0dh601dd8zz5fxmn/master"

const client = new ApolloClient({
  uri: url
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Clothe',
  }
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyDEE12n24SCKYo9HbBTpH36BmZZc4_DHQU",
      authDomain: "closetass.firebaseapp.com",
      databaseURL: "https://closetass.firebaseio.com",
      projectId: "closetass",
      storageBucket: "closetass.appspot.com",
      messagingSenderId: "448122332859"
    }
    firebase.initializeApp(config)
  }

  render() {

    return (
      <ApolloProvider client={client}>
        <Query query={ALL_ROUPAS_QUERY}>
            {({ loading, error, data, refetch }) => {
              if (loading) return (<Text>Loading...</Text>);
              if (error) return (<Text>`Error! ${error.message}`</Text>);
              return (
                <View>
                   {console.log(this.props.data)}
                  <Button
                      title="Add Clothe"
                      onPress={() => this.props.navigation.navigate('Settings', { data: data })}
                    />
                    <Button
                      title="reload"
                      onPress={()=> refetch()}
                    />
                  <MainScreen navigation={this.props.navigation} data={data}/>
                </View>
              )
            }}
        </Query>
      </ApolloProvider>
    );
  }
}

class SettingsScreen extends React.Component {
  
  render() {
    const navigation = this.props.navigation;
    let teste = navigation.getParam('data');
    //console.log(teste)
    return (
      <ApolloProvider client={client}>
        <AddClothe navigation={this.props.navigation}/>
      </ApolloProvider>
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

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: { screen: SettingsScreen },
    Camera: { 
      screen: DetailsScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22
      },
    },
  },
);

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Camera: { 
    screen: DetailsScreen,
    navigationOptions: {
      header: null,
    },
  },
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

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