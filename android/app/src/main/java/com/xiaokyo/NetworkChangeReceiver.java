package com.xiaokyo;

import android.content.Intent;
import android.os.Bundle;
import android.content.Context;
import android.app.ActivityManager;
import android.net.ConnectivityManager;
import android.content.BroadcastReceiver;
import android.net.NetworkInfo;

import java.util.List;

import com.facebook.react.HeadlessJsTaskService;

import com.xiaokyo.MyTaskService;

public class NetworkChangeReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(final Context context, final Intent intent) {
    System.out.println("OnReceive");
    /**
     * 这部分代码会在每次网络状态变化时调用，比如掉线的时候
     **/
    if (!isAppOnForeground((context))) {
      /**
       * 启动服务并发送当前的网络状态信息
       **/
      boolean hasInternet = isNetworkAvailable(context);
      Intent serviceIntent = new Intent(context, MyTaskService.class);
      serviceIntent.putExtra("hasInternet", hasInternet);
      context.startService(serviceIntent);
      HeadlessJsTaskService.acquireWakeLockNow(context);
    }
  }

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

  public static boolean isNetworkAvailable(Context context) {
    ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
    NetworkInfo netInfo = cm.getActiveNetworkInfo();
    return (netInfo != null && netInfo.isConnected());
  }

}