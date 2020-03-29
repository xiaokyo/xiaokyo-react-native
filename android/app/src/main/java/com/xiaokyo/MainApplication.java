package com.xiaokyo;

import android.widget.Toast;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkRequest;
import android.net.Network;
import android.app.ActivityManager;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
// import com.centaurwarchief.smslistener.SmsListenerPackage;
// import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

// costomModules
import com.xiaokyo.CustomPackage;
import com.xiaokyo.NetworkChangeReceiver;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // new SmsListenerPackage();
      // new ReactNativePushNotificationPackage();
      // Packages that cannot be autolinked yet can be added manually here, for
      // example:
      packages.add(new CustomPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    // Context context = this;
    // // receiver
    // final ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
    // cm.requestNetwork(new NetworkRequest.Builder().build(), new ConnectivityManager.NetworkCallback() {
    //   @Override
    //   public void onLost(Network network) {
    //     super.onLost(network);
    //     /// 网络不可用的情况下的方法
    //     Toast.makeText(context, "没网了~", 1000);
    //   }

    //   @Override
    //   public void onAvailable(Network network) {
    //     super.onAvailable(network);
    //     /// 网络可用的情况下的方法
    //     Toast.makeText(context, "有网了~", 1000);
    //     // if (!isAppOnForeground(context)) {
    //     // final Intent service = new Intent(context, MyTaskService.class);
    //     // final Bundle bundle = new Bundle();
    //     // bundle.putString("foo", "bar");
    //     // service.putExtras(bundle);
    //     // context.startService(service);
    //     // }
    //   }
    // });
  }

  /**
   * 是否是前台页面
   * 
   * @param context
   * @return
   */
  private boolean isAppOnForeground(Context context) {
    /**
     * 我们需要先检查应用当前是否在前台运行，否则应用会崩溃。
     * http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
     **/
    ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
    List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
    if (appProcesses == null) {
      return false;
    }
    final String packageName = context.getPackageName();
    for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
      if (appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND
          && appProcess.processName.equals(packageName)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper, since
         * Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
