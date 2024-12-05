import { Colors } from '@/constants/Colors';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={70} color={Colors.tintColorLight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    position: 'absolute',
  },
});
