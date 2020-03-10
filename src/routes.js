import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/signin';
import SignUp from './pages/signup';

import Dashboard from './pages/dashboard';
import Profile from './pages/profile';

import SelectDateTime from './pages/new/select-date-time';
import SelectProvider from './pages/new/select-provider';
import ConfirmRequest from './pages/new/confirm';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

function NewRoutes() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
        headerTintColor: "#FFF",
        headerLeftContainerStyle: { marginLeft: 20 },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#FFF" />
          </TouchableOpacity>
        )
      })}
    >
      <Stack.Screen name="SelectProvider" options={{ title: "Selecione o Prestador" }} component={SelectProvider} />
      <Stack.Screen name="SelectDateTime" options={{ title: "Selecione o horário" }} component={SelectDateTime} />
      <Stack.Screen name="confirm" options={{ title: "Confirme" }} component={ConfirmRequest} />
    </Stack.Navigator>
  )
}

function AppRoutes() {
  const tabBarOptions = {
    keyboardHidesTabBar: true,
    activeTintColor: '#FFF',
    inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
    style: {
      backgroundColor: '#8d41a8'
    }
  }

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions} initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        options={{ tabBarLabel: 'Agendamentos', tabBarIcon: () => <Icon name="event" size={20} color="#FFF" /> }}
        component={Dashboard} />

      <Tab.Screen
        name="New"
        options={{ tabBarVisible: false, tabBarIcon: () => <Icon name="add-circle-outline" size={20} color="rgba(255, 255, 255,0.6)" /> }} component={NewRoutes} />

      <Tab.Screen
        name="Profile"
        options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ tintColor }) => (<Icon name="person" size={20} color="#FFF" />) }}
        component={Profile} />
    </Tab.Navigator>
  );
}


export default function Routes({ signedIn = true }) {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={signedIn ? "App" : "SignIn"}>
        {signedIn ? <Stack.Screen name="App" component={AppRoutes} />
          : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
