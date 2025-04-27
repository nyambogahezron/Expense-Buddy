import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/theme';
import { useBudgetStore } from '@/store/budgets';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewBudgetScreen() {
  const { theme } = useThemeStore();
  const { addBudget } = useBudgetStore();
  const [name, setName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name || !totalAmount) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      addBudget({
        name,
        totalAmount: parseFloat(totalAmount),
        period,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        categories: [],
      });
      router.back();
    } catch (err) {
      setError('Failed to create budget. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          New Budget
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <Animated.View entering={FadeIn}>
          {error && (
            <Text style={[styles.error, { color: theme.colors.error }]}>
              {error}
            </Text>
          )}

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Budget Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter budget name"
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Total Amount
              </Text>
              <TextInput
                value={totalAmount}
                onChangeText={setTotalAmount}
                placeholder="Enter amount"
                keyboardType="decimal-pad"
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Period
              </Text>
              <View style={styles.periodButtons}>
                {(['weekly', 'monthly', 'yearly'] as const).map((p) => (
                  <Pressable
                    key={p}
                    onPress={() => setPeriod(p)}
                    style={[
                      styles.periodButton,
                      {
                        backgroundColor:
                          period === p
                            ? theme.colors.primary
                            : theme.colors.surface,
                        borderColor: theme.colors.border,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.periodButtonText,
                        {
                          color:
                            period === p
                              ? '#FFFFFF'
                              : theme.colors.text,
                        },
                      ]}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Date Range
              </Text>
              <View style={styles.dateButtons}>
                <Pressable
                  onPress={() => setShowStartDate(true)}
                  style={[
                    styles.dateButton,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.dateButtonText,
                      { color: theme.colors.text },
                    ]}>
                    {startDate.toLocaleDateString()}
                  </Text>
                </Pressable>
                <Text style={[styles.dateSeperator, { color: theme.colors.text }]}>
                  to
                </Text>
                <Pressable
                  onPress={() => setShowEndDate(true)}
                  style={[
                    styles.dateButton,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.dateButtonText,
                      { color: theme.colors.text },
                    ]}>
                    {endDate.toLocaleDateString()}
                  </Text>
                </Pressable>
              </View>
            </View>

            {showStartDate && (
              <DateTimePicker
                value={startDate}
                mode="date"
                onChange={(event, selectedDate) => {
                  setShowStartDate(false);
                  if (selectedDate) {
                    setStartDate(selectedDate);
                  }
                }}
              />
            )}

            {showEndDate && (
              <DateTimePicker
                value={endDate}
                mode="date"
                onChange={(event, selectedDate) => {
                  setShowEndDate(false);
                  if (selectedDate) {
                    setEndDate(selectedDate);
                  }
                }}
              />
            )}

            <View style={styles.buttons}>
              <Pressable
                onPress={() => router.back()}
                style={[
                  styles.button,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}>
                <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSubmit}
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.primary },
                ]}>
                <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                  Create Budget
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  error: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  form: {
    padding: 20,
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  periodButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  dateButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  dateSeperator: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});