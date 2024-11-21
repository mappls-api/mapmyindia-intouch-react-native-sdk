# DEPRECATED
This repository is no longer in active development & use.

![MapmyIndia APIs](https://www.mapmyindia.com/api/img/mapmyindia-api.png)


# MapmyIndia Intouch React Native SDK
## Introduction
Get Real-Time Location Tracking for your apps with MapmyIndia InTouch SDK. Track a user's live location with our simplified InTouch React native SDK integration, highly customizable to your specific needs.

The InTouch SDK comes with a variety of events that enable better control and power over your tracking needs. Also get location benefits built for various applications including logistics, delivery tracking, employee tracking, and live location sharing.

To get started, explore the InTouch Demo App.

Already have an application which is build on React Native? Give it a boost with the powerful features of InTouch. Learn how to  [Integrate the InTouch SDK](https://github.com/MapmyIndia/mapmyindia-intouch-react-native-sdk#AddInTouchSDK)

-   [Setup](https://github.com/MapmyIndia/mapmyindia-intouch-react-native-sdk#Setup): Please contact  [apisupport@mapmyindia.com](mailto:apisupport@mapmyindia.com)  to get the Intouch SDK authorization for your Client ID and Client Secret.
-   [Quick Start](https://github.com/MapmyIndia/mapmyindia-intouch-react-native-sdk#intouchdemo-app): Start with a ready-to-go app
-   [Integrate the SDK](https://github.com/MapmyIndia/mapmyindia-intouch-react-native-sdk#IntegrateIntouchSDK): Integrate the SDK into your app
-   [Dashboard](https://intouch.mapmyindia.com/nextgen): See all your devices' locations on MapmyIndia InTouch Dashboard

## <a name="Setup">Setup 

We use your Client ID to identify your account details and assign all your user's devices under a single account. 

To get your Outh2 Rest API Client ID and Client Secret please login to MapmyIndia [API Dashboard](https://www.mapmyindia.com/api/dashboard)  

Please contact [apisupport@mapmyindia.com](mailto:apisupport@mapmyindia.com) to get InTouch SDK access to your Client ID

After getting the access, you can [start with the InTouchDemo app](#InTouchDemoApp), or [Integrate the InTouch SDK](#AddInTouchSDK) in your app.

## <a name= "InTouchDemoApp"> InTouchDemo app </a>
This guide allows you to add live location tracking to your react native app. [Visual Studio](https://code.visualstudio.com/?wt.mc_id=DX_841432) is the recommended development environment for building an app with the MapmyIndia InTouch React native SDK or you can use any other IDE.

#### Step 1. Download the InTouchDemo App.
[Click here](https://github.com/MapmyIndia/mapmyindia-intouch-react-native-sdk/archive/main.zip) to download the InTouchDemo App Project. Open this project in [Visual Studio](https://code.visualstudio.com/?wt.mc_id=DX_841432)

#### Step 2. Set your key

1.  Add the Client Id and Client Secret to InputScreen.js file.
    
2.  Run npm install

3.  Run project on your device using simulator instance using below mentioned command line.

     `npx react-native run-android`

#### Step 3. Check your location on the InTouch [dashboard](https://intouch.mapmyindia.com/nextgen)



## <a name="AddInTouchSDK"> Integrate the InTouch React Native  SDK </a>

## Getting started
Install the below mentioned library in your project.

`npm install mapmyindia-intouch-react-native-sdk --save`

* If using React-native<0.60
` react-native link mapmyindia-intouch-react-native-sdk`

##  Installation
For Android and Ios add the below mentioned lines

### Android
* Add following line in `android/build.gradle` file:-
```groovy
allprojects {
   repositories {
            mavenLocal()
            maven {
// All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
           url("$rootDir/../node_modules/react-native/android")
            }
           maven {
 // Android JSC is installed from npm
    url("$rootDir/../node_modules/jsc-android/dist")
          }

  
+       maven { url 'https://maven.mapmyindia.com/repository/mapmyindia/'}

           google()
           jcenter()
           maven { url 'https://www.jitpack.io' }

         }

}
```
  * Add following line in `android/app/build.gradle` file:-
  
  ```groovy
  defaultConfig {

applicationId "com.intouch_react_native_sample"

minSdkVersion rootProject.ext.minSdkVersion

targetSdkVersion rootProject.ext.targetSdkVersion

versionCode 1

versionName "1.0"

+ multiDexEnabled true

}
```

#### Note:
1. Java Version 11 Required
2. minimum compileSdkVersion 31 required

### IOS
*  Add follwoing permissions in your project's plist.info

~~~
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Your location is used to personalize content.</string>
 
<key>NSLocationAlwaysUsageDescription</key>
<string>Your location is used to personalize content.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Your location is used to personalize content.</string> 

<key>NSMotionUsageDescription</key> 
<string>In order to count steps I need an access to your pedometer</string>

<key>UIBackgroundModes</key>
<array>
<string>fetch</string>
<string>location</string>
</array>
~~~
* Add following function in your project's **AppDelegate.h**
~~~objectivec
#import <MapmyIndiaIntouchCore/MapmyIndiaIntouchCore.h>
~~~
* Add following function in your project's **AppDelegate.m**

~~~objectivec

- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler
{
[Intouch.shared backgroundfetchWithCompletionHandler:completionHandler];
}
~~~


* Enable **background fetch** and **location updates** from Signing and Capabilities

* run **pod install** from ios folder
## Steps to use SDK into your project

#### Step 1: Import Intouch SDK
```javascript
import  MapmyIndiaIntouch  from  'mapmyindia-intouch-react-native-sdk';

```

#### Step 2.  Check if Intouch SDK is already initialized
```javascript
const  status = await  MapmyIndiaIntouch.isInitialized();
```

#### Step 3: Initialize Intouch SDK

Initialize the SDK with your Client ID and Client Secret and device name.Device name helps to identify the user on Portal.

```javascript
MapmyIndiaIntouch.initialize(deviceName,clientId,clientSecret)
   .then(entityId  => {
   console.log(entityId);
   }).catch(err=>{
     console.log(err.message)
   });
```
  
### OR
Initialize the SDK with your Client ID , Client Secret , device name and deviceId. deviceId should be unique ID for every user.
*  deviceId will be used to store the data against the particular user.
* deviceName will be used to identify the user on Portal
  
~~~javascript
MapmyIndiaIntouch.initializeWithDeviceId(deviceName,clientId,clientSecret,deviceId,
(result) => {
if (result === 'success') {
//success
 } else {
//error 
});
~~~
  
**Note**:This method can be used in case if your users uses two mobile phone. In this case, Both the mobile phone data will be pushed against the same deviceID. So ensure that before user logging into the new phone, logout the user from previous phone and call the stop tracking method. So that always tracking data will come from the single phone.

#### Step 4:  Check if Intouch SDK is already running
```javascript
const  status = await  MapmyIndiaIntouch.isRunning()
```
#### Step 5. Start tracking
Track your app user's phone live location by using the below method.
```javascript
MapmyIndiaIntouch.startTracking();
```
**You can start tracking using below three options**

-   MapmyIndiaIntouch.BEACON_PRIORITY_FAST
-   MapmyIndiaIntouch.BEACON_PRIORITY_OPTIMAL(default)
-   MapmyIndiaIntouch.BEACON_PRIORITY_SLOW
~~~javascript
MapmyIndiaIntouch.startTracking(MapmyIndiaIntouch.BEACON_PRIORITY_OPTIMAL);
~~~
Note: If no priority provided default will be used.

#### OR

~~~javascript
MapmyIndiaIntouch.startTrackingWithCustomConfig({
  standByTimeInMins: 1,//mandatory
  timeWhileMovingInSec: 10,//mandatory
  enableRequestPermissionIfMissing:true
  autoTrackingConfig: {endTimeConfig: {hour:  7, minute:  58, amPm:  "pm"}}
  });
~~~

  

*  **timeWhileMovingInSec**:(number) tracking api hit time while moving in seconds.

*  **standByTimeInMins**:(number) tracking api hit time while standby in minutes.

  

#### Only for android Platform

*  **enableRequestPermissionIfMissing**(boolean) Location permissions will handle by SDK if set to true.Default value is true
*  **autoTrackingConfig**(object): To set auto tracking settings:
	*  **endTimeConfig**(object): To set option to stop the tracking at time
		* **hour**(number): To set hours (1-12)
		* **minute**(number): To set minutes (0 - 59). Default value 0
		* **second**(number): To set seconds (0 - 59). Default is 0
		* **amPm**(String): `am` or `pm`. Default value is `am`

#### Step 6. Stop tracking
To stop your app user's phone live location tracking use the below mentioned method.
```javascript
MapmyIndiaIntouch.stopTracking();
```
#### Step 7. Listen for tracking events
This method will be called when tracking starts, stops or some tracking error is caught.
```javascript
MapmyIndiaIntouch.addTrackingStateListener((event) => {
if(event === 'onTrackingStart'){

}else if(event === 'onTrackingStop'){

}
},(error)=>{
console.log(error.message);
});
```
#### Step 8. Remove Listener
This method will remove TrackingStateListener. Call this method before Unmounting component.
```javascript
MapmyIndiaIntouch.removeTrackingStateListener();
```
#### Step 9. getCurrentLocationUpdate 
Updates single location on server and return to the user
~~~javascript
try {
const  res= await  MapmyIndiaIntouch.getCurrentLocationUpdate();
//do something with response
} catch (e) {
//error log
}
~~~
*  optional parameter(Android)
**enableRequestPermissionIfMissing**(boolean) Location permissions will be handled by SDK if set to true.Default value is true.

![Email](https://www.google.com/a/cpanel/mapmyindia.co.in/images/logo.gif?service=google_gsuite)

Email us at [apisupport@mapmyindia.com](mailto:apisupport@mapmyindia.com)

  

![](https://www.mapmyindia.com/api/img/icons/stack-overflow.png)

[Stack Overflow](https://stackoverflow.com/questions/tagged/mapmyindia-api)

Ask a question under the mapmyindia-api

  

![](https://www.mapmyindia.com/api/img/icons/support.png)

[Support](https://www.mapmyindia.com/api/index.php#f_cont)

Need support? contact us!

  

![](https://www.mapmyindia.com/api/img/icons/blog.png)

[Blog](http://www.mapmyindia.com/blog/)

Read about the latest updates & customer stories

  
  

> © Copyright 2022. CE Info Systems Ltd. All Rights Reserved. | [Terms & Conditions](http://www.mapmyindia.com/api/terms-&-conditions)

