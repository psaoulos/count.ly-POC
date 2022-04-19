# count.ly-POC

POC of Count.ly (https://count.ly/) web/mobile app analytic self hosted solution.

# Start the Count.ly server

1. Make sure you have docker installed (https://docs.docker.com/desktop/#download-and-install)
2. Run the following command while on root project folder to fire up the countly/demo_web_app Servers, (Startup routine takes some time)
```
./run_me.sh
```
3. When the startup routine has finished navigate to http://localhost , register your user
4. Create two applications (Web/Mobile) and copy the App_Key found under each app (Settings/Applications/{Application_Given_Name}) to their corresponding files:
    Mobile: demo_mobile_app/src/utils/countly.js on Line 43 update App_Key (In order to run on android change localhost to docker server's IP)
    Web: demp_web_app/src/index.js on Line 13 update App_Key
    In order to simulate different Unique Users change on the same line the 123456 number simulating a UserID
5. Restart demo_web_app docker container and rebuild the mobile apps in order for the changes to take effect.
6. React demo_web_app can be accessed from http://localhost:8080

# Buidling iOS app
1. Update Countly.init("countly_server_ip", "App_Key"); on DemoMobileApp/src/screens/Landing/landing.screen.js
2. run the following while inside demo_mobile_app folder
```
npm i
cd ios
pod install
npm run ios
```

# Buidling android app
1. Update Countly.init("local_countly_server_ip", "App_Key"); on DemoMobileApp/src/screens/Landing/landing.screen.js
2. run the following while inside demo_mobile_app folder
```
npm i
npm run android
```
