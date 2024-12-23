import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import { Colors } from '@/constants/Colors';

const width = Dimensions.get('window').width;
type EmptyListCardProps = {
  title?: string;
  onPress?: () => void;
  buttonText?: string;
  boldTitle?: string;
};

export default function EmptyListCard({
  title = 'No Transactions Available',
  boldTitle,
}: EmptyListCardProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {boldTitle ?? 'Oops'}
          <Text style={styles.exclamationText}>!</Text>
        </Text>
      </View>
      <ThemedText
        lightColor='#6b7280'
        darkColor='#6b7280'
        style={styles.subtitleText}
      >
        {title}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 500,
  },
  titleContainer: {
    marginVertical: 8,
  },
  titleText: {
    fontSize: 32,
    fontFamily: 'pbold',
    color: Colors.orange,
    fontWeight: '900',
    textTransform: 'capitalize',
  },
  exclamationText: {
    fontSize: 32,
    color: Colors.darkOrange,
  },
  subtitleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
