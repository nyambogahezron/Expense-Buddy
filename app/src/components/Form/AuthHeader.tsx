import { Text, StyleSheet } from 'react-native';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
export default function AuthHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <Text style={styles.title}>{title}</Text>
        <ThemedText style={styles.description}>{description}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
    color: '#1e3a8a',
  },
  description: {
    fontSize: 14,
    fontWeight: '600',
  },
});
