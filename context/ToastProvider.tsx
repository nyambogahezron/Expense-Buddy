import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

const Icon = () => <MaterialIcons name='info' size={24} color='white' />;
const SuccessIcon = () => (
  <MaterialIcons name='check-circle' size={24} color='green' />
);
const DangerIcon = () => <MaterialIcons name='error' size={24} color='red' />;
const WarningIcon = () => (
  <MaterialIcons name='warning' size={24} color='orange' />
);

type CustomToastProps = {
  message: any;
  type: any;
  icon: React.ReactNode;
};

const CustomToast = ({ message, type, icon }: CustomToastProps) => {
  let backgroundColor;
  switch (type) {
    case 'success':
      backgroundColor = 'green';
      break;
    case 'danger':
      backgroundColor = 'red';
      break;
    case 'warning':
      backgroundColor = 'orange';
      break;
    default:
      backgroundColor = 'gray';
  }

  return (
    <View
      style={{
        padding: 10,
        backgroundColor,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {icon}
      <Text style={{ color: 'white', marginLeft: 10 }}>{message}</Text>
    </View>
  );
};

export default function ToastProviderContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider
      placement='top'
      duration={5000}
      animationType='slide-in'
      animationDuration={250}
      successColor='green'
      dangerColor='red'
      warningColor='orange'
      normalColor='gray'
      icon={<Icon />}
      successIcon={<SuccessIcon />}
      dangerIcon={<DangerIcon />}
      warningIcon={<WarningIcon />}
      textStyle={{ fontSize: 20 }}
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
      renderToast={(toastOptions) => (
        <CustomToast
          message={toastOptions.message}
          type={toastOptions.type}
          icon={toastOptions.icon}
        />
      )}
    >
      {children}
    </ToastProvider>
  );
}
