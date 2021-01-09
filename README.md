  

![MapmyIndia APIs](https://www.mapmyindia.com/api/img/mapmyindia-api.png)

  

# MapmyIndia Intouch Sdk React Native

## Getting started

  

`npm install mapmyindia-intouch-react-native-sdk --save`

  

###  Installation
### Android
* Add followling line in `android/build.gradle` file:-
```diff
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
  * Add followling line in `android/app/build.gradle` file:-
  ```diff
  defaultConfig {

applicationId "com.intouch_react_native_sample"

minSdkVersion rootProject.ext.minSdkVersion

targetSdkVersion rootProject.ext.targetSdkVersion

versionCode 1

versionName "1.0"

+ multiDexEnabled true

}
```
* If using React-native<0.60
` react-native link mapmyindia-intouch-react-native-sdk`

  

## Usage
1. Import Intouch sdk
```javascript
import  MapmyIndiaIntouch  from  'mapmyindia-intouch-react-native-sdk';

```

2. Initialize Intouch sdk
```javascript
MapmyIndiaIntouch.initialize(
deviceName,
PublishableId,
(result) => {
if (result === 'success') {
console.log("success")
} else {
//error log
console.log(result)
});
```
3.  Check if Intouch sdk is already initialized
```javascript
const  status = await  MapmyIndiaIntouch.isInitialized();
```
4.   Check if Intouch sdk is already running
```javascript
const  status = await  MapmyIndiaIntouch.isRunning()
```
5. Start tracking
```javascript
MapmyIndiaIntouch.startTracking();
```
6. Stop tracking
```javascript
MapmyIndiaIntouch.stopTracking();
```
7. Listen for tracking events
```javascript
MapmyIndiaIntouch.addTrackingStateListener((event) => {

console.log(event);

});
```
8. Remove Listener
```javascript
MapmyIndiaIntouch.removeTrackingStateListener();
```

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

  
  

> © Copyright 2020. CE Info Systems Pvt. Ltd. All Rights Reserved. | [Terms & Conditions](http://www.mapmyindia.com/api/terms-&-conditions)
