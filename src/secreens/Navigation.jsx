import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FavoritesProvider } from '../components/FavoritesContext';
import LoginScreen from './LoginScreen';
import SearchRepositories from './SearchRepositories';
import RepositoryDetailsScreen from './RepositoryDetailsScreen';
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="SearchRepositories"
            component={SearchRepositories}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="FavoritesScreen"
            component={FavoritesScreen}
            options={{ title: 'My Favorites' }}
             
          />
          <Stack.Screen
            name="RepositoryDetailsScreen"
            component={RepositoryDetailsScreen}
            options={{ title: 'Repository Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
