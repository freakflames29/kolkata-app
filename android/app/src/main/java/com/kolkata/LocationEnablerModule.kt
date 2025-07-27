package com.kolkata

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
    fun isLocationEnabled(promise: Promise) {
        val activity: Activity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "No foreground activity!")
            return
        }

        val locationRequest = LocationRequest
            .Builder(Priority.PRIORITY_HIGH_ACCURACY, 10000)
            .build()

        val builder = LocationSettingsRequest
            .Builder()
            .addLocationRequest(locationRequest)

        val settingsClient = LocationServices.getSettingsClient(activity)
        val task = settingsClient.checkLocationSettings(builder.build())

        task.addOnSuccessListener {
            promise.resolve(true)
        }
        task.addOnFailureListener { ex ->
            promise.resolve(false)
        }
    }

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
                    // Handle the result in MainActivity onActivityResult, see step 3 below
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
