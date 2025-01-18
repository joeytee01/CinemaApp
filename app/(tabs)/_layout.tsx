import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from '../../redux/store'; // Import your Redux store
import HomeScreen from './index';
import MovieDetailsScreen from './explore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for the "Home" tab
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MovieDetails" 
        component={MovieDetailsScreen} 
        options={{ headerShown: true }} 
      />
    </Stack.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <Provider store={store}>

        <Tab.Navigator>
          <Tab.Screen 
            name="HomeTab" 
            component={HomeStack} 
            options={{ tabBarStyle: { display: 'none' } }}
          />
          <Tab.Screen 
            name="Explore" 
            component={MovieDetailsScreen} 
            options={{ tabBarStyle: { display: 'none' } }} 
          />
        </Tab.Navigator>

    </Provider>
  );
};

export default App;
