# How to Add a Native Location Enabler Module to a React Native App

This guide provides a step-by-step process for adding a native Android module that can prompt the user to enable their device's location services.

## Step 1: Create the Location Enabler Module

First, create a new Kotlin file named `LocationEnablerModule.kt` in your project's Android source directory (`android/app/src/main/java/com/<your-app-name>/`).

```kotlin
package com.kolkata // Replace with your app's package name

import android.app.Activity
import android.content.IntentSender
import com.facebook.react.bridge.*
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.*
import android.app.Activity.RESULT_OK

class LocationEnablerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var promise: Promise? = null

    override fun getName() = "LocationEnabler"

    @ReactMethod
    fun promptForEnableLocation(promise: Promise) {
        val activity: Activity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "No foreground activity!")
            return
        }
        this.promise = promise

        val locationRequest = LocationRequest
            .Builder(Priority.PRIORITY_HIGH_ACCURACY, 10000)
            .build()

        val builder = LocationSettingsRequest
            .Builder()
            .addLocationRequest(locationRequest)
            .setAlwaysShow(true)

        val settingsClient = LocationServices.getSettingsClient(activity)
        val task = settingsClient.checkLocationSettings(builder.build())

        task.addOnSuccessListener {
            // Location services are already on
            promise.resolve("already-enabled")
        }
        task.addOnFailureListener { ex ->
            if (ex is ResolvableApiException) {
                try {
                    ex.startResolutionForResult(activity, REQUEST_CHECK_SETTINGS)
                    // Handle the result in MainActivity onActivityResult
                } catch (sendEx: IntentSender.SendIntentException) {
                    promise.reject("SEND_INTENT_EXCEPTION", sendEx)
                }
            } else {
                promise.reject("UNRESOLVABLE", ex)
            }
        }
    }

    fun onActivityResult(requestCode: Int, resultCode: Int) {
        if (requestCode == REQUEST_CHECK_SETTINGS) {
            if (resultCode == RESULT_OK) {
                promise?.resolve("enabled")
            } else {
                promise?.reject("CANCELLED", "User cancelled the request")
            }
        }
    }

    companion object {
        const val REQUEST_CHECK_SETTINGS = 999
    }
}
```

## Step 2: Create the Location Enabler Package

Next, create another Kotlin file named `LocationEnablerPackage.kt` in the same directory. This file will register the new module with your React Native application.

```kotlin
package com.kolkata // Replace with your app's package name

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class LocationEnablerPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(LocationEnablerModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
```

## Step 3: Update Your MainApplication.kt File

Now, open your `MainApplication.kt` file (located in the same directory) and add the `LocationEnablerPackage` to the list of packages.

```kotlin
// ... (imports)

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
              add(LocationEnablerPackage()) // Add this line
            }

        // ... (rest of the file)
      }
}
```

## Step 4: Update Your MainActivity.kt File

Next, you need to modify your `MainActivity.kt` file to handle the result of the location prompt.

```kotlin
package com.kolkata // Replace with your app's package name

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.bridge.ReactContext
import android.content.Intent

class MainActivity : ReactActivity() {

  // ... (existing code)

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    val reactContext: ReactContext? = reactNativeHost.reactInstanceManager.currentReactContext
    if (reactContext != null) {
        val module = reactContext.getNativeModule(LocationEnablerModule::class.java)
        module?.onActivityResult(requestCode, resultCode)
    }
  }
}
```

## Step 5: Update Your Gradle Files

You'll need to add a few dependencies to your `build.gradle` files.

### `android/build.gradle`

Add the `kotlin-gradle-plugin` to the `dependencies` block of your `buildscript`.

```groovy
buildscript {
    ext {
        // ...
        kotlinVersion = "2.1.20" // Or the latest version
    }
    // ...
    dependencies {
        // ...
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
    }
}
```

### `android/app/build.gradle`

Add the `play-services-location` dependency to the `dependencies` block.

```groovy
dependencies {
    // ...
    implementation 'com.google.android.gms:play-services-location:21.0.1' // Or the latest version
}
```

### `android/settings.gradle`

Ensure that `mavenCentral()` is included in the `repositories` block of your `dependencyResolutionManagement`.

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS) // Or FAIL_ON_PROJECT_REPOS
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
    }
}
```

## Step 6: Create the TypeScript Bridge

To make the native module available in your JavaScript code, create a new file named `LocationEnabler.ts` in your `src` directory.

```typescript
import { NativeModules } from 'react-native';

const { LocationEnabler } = NativeModules;

interface LocationEnablerInterface {
  promptForEnableLocation(): Promise<string>;
}

export default LocationEnabler as LocationEnablerInterface;
```

## Step 7: Use the Location Enabler Module in Your App

Finally, you can use the `LocationEnabler` module in your React Native components.

```typescript
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import LocationEnabler from './src/LocationEnabler';

const App = () => {
  const enableLocation = async () => {
    try {
      const result = await LocationEnabler.promptForEnableLocation();
      console.log(result); // "already-enabled", "enabled", or "cancelled"
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    enableLocation();
  }, []);

  return (
    <View>
      <Text>Location Enabler Example</Text>
      <Button title="Enable Location" onPress={enableLocation} />
    </View>
  );
};

export default App;
```
