import { StyleSheet } from "react-native";

export default () =>
  StyleSheet.create({
    SafeAreaView: {
      height: "100%",
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center', 
      padding: 20
    }
  });
