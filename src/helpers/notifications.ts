import * as Notifications from "expo-notifications";
import { NotificationContentInput } from "expo-notifications";

export const askPermissions = async () => {
  
  const { status: existingStatus } = await Notifications.requestPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }
  return true;
};

export const getExpoToken = async () => {
  const permitted = await askPermissions();
  if (permitted) {
    return (await Notifications.getExpoPushTokenAsync()).data;
  }else{
    return null
  }
}

export const scheduleNotification = async ({title, body, data}: NotificationContentInput, interval?: number) => {
  let notificationId = await Notifications.scheduleNotificationAsync({
    content:{
      title,
      body,
      data
    },
    trigger: interval? {
      repeats: true,
      seconds: interval
    }: null,
  });
  console.log(`Notified with id: ${notificationId}`);
}