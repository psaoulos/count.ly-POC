/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import Countly from "countly-sdk-react-native-bridge";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/Landing/landing.screen";
import NotLandingScreen from "./src/screens/NotLanding/notLanding.screen";

const App= () => {
  const Stack = createNativeStackNavigator();

  const connectToCountly = async () => {
    console.log("Initing Count.ly");
    try {
      if (!(await Countly.isInitialized())) {
        Countly.setLoggingEnabled(true);
        Countly.enableCrashReporting();
        await Countly.init(
          "http://localhost",
          "ab417feadb01a17e3561d85f2700287c6c2852d8",
          "DemoMobileApp_User1"
        ); // Initialize the countly SDK.
        Countly.start(); // start session tracking
        var countryCode = "gr";
        var city = "Athens";
        var latitude = "29.634933";
        var longitude = "-95.220255";
        var ipAddress = "103.238.105.167";
        Countly.setLocationInit(countryCode, city, latitude + "," + longitude, ipAddress);
      }
    } catch (error) {
      console.log("Countly init error", error);
    }
  };

  useEffect(() => {
    connectToCountly();
  }, []);

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
