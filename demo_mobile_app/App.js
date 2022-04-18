/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/Landing/landing.screen";
import NotLandingScreen from "./src/screens/NotLanding/notLanding.screen";

const App= () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing_Screen">
        <Stack.Screen name="Landing_Screen" component={LandingScreen} options={{ title: 'Landing Screen' }}/>
        <Stack.Screen name="Not_Landing_Screen" component={NotLandingScreen} options={{ title: 'Not the Landing Screen' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
