import { Platform, ToastAndroid } from 'react-native';
import { Alert } from 'react-native';

export const Toaster = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  } else {
    Alert.alert(message);
  }
};
