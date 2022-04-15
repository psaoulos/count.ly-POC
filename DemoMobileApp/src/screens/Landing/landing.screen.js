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
import { incrementEvent, recordView } from "../../utils/countly";
import Countly from "countly-sdk-react-native-bridge";

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

const LandingScreen = ({navigation}) => {
  const styles = getStyles();
  const isDarkMode = useColorScheme() === "dark";
  const [count, setCount] = useState(0)
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  onInit = async() => {
    if(!await Countly.isInitialized()) {
      /** Recommended settings for Countly initialisation */
      Countly.setLoggingEnabled(true); // Enable countly internal debugging logs
      Countly.enableCrashReporting(); // Enable crash reporting to report unhandled crashes to Countly
      Countly.setRequiresConsent(true); // Set that consent should be required for features to work.
      Countly.giveConsentInit(["location", "sessions", "attribution", "push", "events", "views", "crashes", "users", "push", "star-rating", "apm", "feedback", "remote-config"]); // give conset for specific features before init.
      Countly.setLocationInit("GR", "Athens", "41.0082,28.9784", "10.2.33.12"); // Set user initial location.

      /** Optional settings for Countly initialisation */
      Countly.enableParameterTamperingProtection("salt"); // Set the optional salt to be used for calculating the checksum of requested data which will be sent with each request
      // Countly.pinnedCertificates("count.ly.cer"); // It will ensure that connection is made with one of the public keys specified
      // Countly.setHttpPostForced(false); // Set to "true" if you want HTTP POST to be used for all requests
      Countly.enableApm(); // Enable APM features, which includes the recording of app start time.
      Countly.pushTokenType(Countly.messagingMode.DEVELOPMENT, "Channel Name", "Channel Description"); // Set messaging mode for push notifications
      
      if (Platform.OS.match("ios")) {
        Countly.recordAttributionID("ADVERTISING_ID");
      }
      else {
        Countly.enableAttribution(); // Enable to measure your marketing campaign performance by attributing installs from specific campaigns.
      }
      Countly.setStarRatingDialogTexts("Title", "Message", "Dismiss");
      await Countly.init("countly_server_ip", "App_Key"); // Initialize the countly SDK.
      Countly.appLoadingFinished();
      /** 
       * Push notifications settings 
       * Should be call after init
      */
      Countly.registerForNotification(function(theNotification){
        console.log("Just received this notification data: " + JSON.stringify(theNotification));
        alert('theNotification: ' + JSON.stringify(theNotification));
      }); // Set callback to receive push notifications
      Countly.askForNotificationPermission(); // This method will ask for permission, enables push notification and send push token to countly server.
      Countly.start();
    }
  }

  useEffect(() => {
    onInit().then(()=>{
      recordView("Landing Screen")
    })
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
                incrementEvent("Pressed Navigate")
                navigation.navigate('Not_Landing_Screen')
              }}
            />
          </View>
          <Section title={count == 0 ? "Do not Click Me" : `Do not Click Me x ${count}`} />
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
                incrementEvent("Pressed Pointless")
                setCount(count + 1)
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;
