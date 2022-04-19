import Countly from "countly-sdk-react-native-bridge";

export async function onInit() {
  if (!(await Countly.isInitialized())) {
    /** Recommended settings for Countly initialisation */
    Countly.setLoggingEnabled(true); // Enable countly internal debugging logs
    Countly.enableCrashReporting(); // Enable crash reporting to report unhandled crashes to Countly
    Countly.setRequiresConsent(true); // Set that consent should be required for features to work.
    Countly.giveConsentInit([
      "location",
      "sessions",
      "attribution",
      "push",
      "events",
      "views",
      "crashes",
      "users",
      "push",
      "star-rating",
      "apm",
      "feedback",
      "remote-config",
    ]); // give conset for specific features before init.
    Countly.setLocationInit("GR", "Athens", "41.0082,28.9784", "10.2.33.12"); // Set user initial location.

    /** Optional settings for Countly initialisation */
    Countly.enableParameterTamperingProtection("salt"); // Set the optional salt to be used for calculating the checksum of requested data which will be sent with each request
    // Countly.pinnedCertificates("count.ly.cer"); // It will ensure that connection is made with one of the public keys specified
    // Countly.setHttpPostForced(false); // Set to "true" if you want HTTP POST to be used for all requests
    Countly.enableApm(); // Enable APM features, which includes the recording of app start time.
    Countly.pushTokenType(
      Countly.messagingMode.DEVELOPMENT,
      "Channel Name",
      "Channel Description"
    ); // Set messaging mode for push notifications

    if (Platform.OS.match("ios")) {
      Countly.recordAttributionID("ADVERTISING_ID");
    } else {
      Countly.enableAttribution(); // Enable to measure your marketing campaign performance by attributing installs from specific campaigns.
    }
    Countly.setStarRatingDialogTexts("Title", "Message", "Dismiss");
    await Countly.init("http://localhost", "App_Key", "123456"); // Initialize the countly SDK.
    Countly.appLoadingFinished();
    /**
     * Push notifications settings
     * Should be call after init
     */
    Countly.registerForNotification(function (theNotification) {
      console.log(
        "Just received this notification data: " +
          JSON.stringify(theNotification)
      );
      alert("theNotification: " + JSON.stringify(theNotification));
    }); // Set callback to receive push notifications
    Countly.askForNotificationPermission(); // This method will ask for permission, enables push notification and send push token to countly server.
    Countly.start();
    var options = {};
    options.name = "Nicola Tesla";
    options.username = "nicola";
    options.email = "info@nicola.tesla";
    options.organization = "Trust Electric Ltd";
    options.phone = "+90 822 140 2546";
    options.picture = "http://www.trust.electric/images/people/nicola.png";
    options.picturePath = "";
    options.gender = "M";
    options.byear = 1919;
    Countly.setUserData(options);
  }
}

export function incrementEvent(name, step = 1) {
  try {
    var event = { eventName: name, eventCount: step };
    Countly.sendEvent(event);
  } catch (error) {
    console.log("Countly sendEvent error", JSON.stringify(error));
  }
}

export function recordView(name) {
  try {
    Countly.recordView(name);
  } catch (error) {
    console.log("Countly recordView error", JSON.stringify(error));
  }
}
