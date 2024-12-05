import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';

const width = Dimensions.get('window').width;
type EmptyListCardProps = {
  title?: string;
  onPress?: () => void;
  buttonText?: string;
};

export default function EmptyListCard({
  title = 'No Transactions',
  onPress = () => router.push('/(tabs)/create'),
  buttonText = 'Add Transaction',
}: EmptyListCardProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Oops<Text style={styles.exclamationText}>!</Text>
        </Text>
      </View>
      <ThemedText lightColor='#6b7280' style={styles.subtitleText}>
        {title}
      </ThemedText>

      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInnerContainer}>
            <ThemedText style={styles.buttonText}>{buttonText}</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  titleContainer: {
    marginVertical: 8,
  },
  titleText: {
    fontSize: 32,
    fontFamily: 'pbold',
    color: '#F59E0B',
  },
  exclamationText: {
    fontSize: 32,
    color: '#DC2626',
  },
  subtitleText: {
    color: '#6b7280',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    height: 48,
    marginRight: 3,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 5,
    width: width * 0.89,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
