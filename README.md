# count.ly-POC

POC of Count.ly (https://count.ly/) web/mobile app analytic self hosted solution.

# Start the Count.ly server

1. Make sure you have docker installed (https://docs.docker.com/desktop/#download-and-install)
2. Run the following command while on root project folder to fire up the Server, (Startup routine takes some time)
```
./run_me.sh
```

# Buidling iOS app
1. Update Countly.init("countly_server_ip", "App_Key"); on DemoMobileApp/src/screens/Landing/landing.screen.js
2. run the following while inside DemoMobileApp folder
```
npm i
cd ios
run arch -x86_64 pod install
npm run ios
```

# Buidling android app
1. Update Countly.init("local_countly_server_ip", "App_Key"); on DemoMobileApp/src/screens/Landing/landing.screen.js
2. run the following while inside DemoMobileApp folder
```
npm i
npm run android
```
