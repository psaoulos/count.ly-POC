import React, { useEffect } from "react";
import {
  Text,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FAB } from "@rneui/themed";
import getStyles from "./notLanding.style";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { incrementEvent, recordView } from "../../utils/countly";

const NotLandingScreen = ({navigation}) => {
  const styles = getStyles();
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    recordView("Not the Landing Screen");
  }, []);

  return (
    <SafeAreaView style={[styles.SafeAreaView, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={ backgroundStyle}
      >
        <Text style={styles.text}> That's it</Text>
        <FAB
          visible={true}
          title="Go Back"
          upperCase
          icon={{ name: "place", color: "white" }}
          onPress={() => {
            incrementEvent("Pressed Go Back");
            navigation.navigate('Landing_Screen')
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotLandingScreen;
