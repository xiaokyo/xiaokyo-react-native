package com.xiaokyo;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

// import android.app.Application;
// import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import java.util.Map;
import java.util.HashMap;

import com.xiaokyo.MyTaskService;
import com.xiaokyo.NetworkChangeReceiver;

public class CustomModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  public CustomModule(final ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "CustomExample";
  }

  @ReactMethod
  public void startHeadlessTask() {
    final Intent service = new Intent(reactContext, MyTaskService.class);
    final Bundle bundle = new Bundle();
    bundle.putString("foo", "bar");
    service.putExtras(bundle);
    reactContext.startService(service);
  }

  @ReactMethod
  public void endHeadLessTask() {
    final Intent service = new Intent(reactContext, MyTaskService.class);
    reactContext.stopService(service);
  }

  // @ReactMethod
  // public void startNetworkReceiver() {
  // final Intent service = new Intent(getReactApplicationContext(),
  // NetworkChangeReceiver.class);
  // final Bundle bundle = new Bundle();
  // bundle.putString("foo", "bar");
  // service.putExtras(bundle);
  // getReactApplicationContext().startService(service);
  // }

}