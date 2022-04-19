import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FAB } from "@rneui/themed";
import getStyles from "./landing.style";
import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import { incrementEvent, onInit, recordView } from "../../utils/countly";

const Section = ({ children, title }) => {
  const styles = getStyles();
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const LandingScreen = ({ navigation }) => {
  const styles = getStyles();
  const isDarkMode = useColorScheme() === "dark";
  const [count, setCount] = useState(0);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    onInit().then(() => {
      recordView("Landing Screen");
    });
  }, []);

  return (
    <SafeAreaView style={[styles.SafeAreaView, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View style={backgroundStyle}>
          <Section title="Click Me" />
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                color: "#397af8",
                textAlign: "center",
                alignSelf: "center",
                paddingRight: 10,
              }}
            >
              Go to the Next page
            </Text>
            <FAB
              visible={true}
              title="Navigate"
              upperCase
              icon={{ name: "place", color: "white" }}
              onPress={() => {
                incrementEvent("Pressed Navigate");
                navigation.navigate("Not_Landing_Screen");
              }}
            />
          </View>
          <Section
            title={
              count == 0 ? "Do not Click Me" : `Do not Click Me x ${count}`
            }
          />
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignContent: "center",
              width: "100%",
              flex: 1,
            }}
          >
            <FAB
              visible={true}
              title="Pointless Button"
              upperCase
              onPress={() => {
                incrementEvent("Pressed Pointless");
                setCount(count + 1);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;
