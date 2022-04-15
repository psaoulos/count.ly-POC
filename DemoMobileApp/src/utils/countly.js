import Countly from "countly-sdk-react-native-bridge";

export function incrementEvent(name, step = 1) {
  try {
    var event = { eventName: name, eventCount: step };
    Countly.sendEvent(event);
  } catch (error) {
    console.log('Countly sendEvent error', JSON.stringify(error))
  }
}

export function recordView(name) {
  try {
    console.log('recording')
    Countly.recordView(name);
  } catch (error) {
    console.log('Countly recordView error', JSON.stringify(error))
  }
}
