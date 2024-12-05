import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { fetchWeeklyData } from '@/queries/chatsQueries';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import ThemedText from '@/components/ui/Text';
import { useEffect, useState } from 'react';

enum Period {
  week = 'week',
  month = 'month',
  year = 'year',
}

export default function SummaryChart() {
  const [chartPeriod, setChartPeriod] = useState<Period>(Period.week);
  const [barData, setBarData] = useState<any>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentEndDate, setCurrentEndDate] = useState<Date>(new Date());
  const [chartKey, setChartKey] = useState(0);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>(
    'income'
  );

  useEffect(() => {
    const fetchData = async () => {
      if (chartPeriod === Period.week) {
        const { startDate, endDate } = getWeekRange(currentDate);
        setCurrentEndDate(new Date(startDate));

        // fetch data for the current week
        const data = await fetchWeeklyData(startDate, endDate, transactionType);
        setBarData(data);
        setChartKey((prev) => prev + 1);
      }
    };
    fetchData();
  }, [chartPeriod, currentDate, transactionType]);

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6));
    return {
      startDate: startOfWeek.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
      endDate: endOfWeek.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
    };
  };

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const handleReset = () => {
    setCurrentDate(new Date());
    setChartPeriod(Period.week);
  };

  return (
    <View>
      <View className='flex  flex-row justify-between'>
        <ThemedText
          style={{ fontWeight: '700', fontSize: 18, marginBottom: 8 }}
        >
          {currentEndDate.toLocaleDateString('en-US', { month: 'short' })}{' '}
          {currentEndDate.getDate()} -{' '}
          {currentDate.toLocaleDateString('en-US', { month: 'short' })}{' '}
          {currentDate.getDate()}
        </ThemedText>
        <View className='flex flex-row justify-between items-start gap-5'>
          <TouchableOpacity
            onPress={handleReset}
            style={{ alignItems: 'center' }}
          >
            <FontAwesome name='rotate-left' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ color: 'gray' }}>
        Total {transactionType === 'expense' ? 'Spending' : 'Income'}
      </Text>

      <Text style={{ fontWeight: '700', fontSize: 32, marginBottom: 16 }}>
        $
        {barData
          .reduce((total: number, item: any) => total + item.total, 0)
          .toFixed(2)}
      </Text>
      <BarChart
        key={chartKey}
        data={barData.map((item: any) => ({
          label: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
            item.dayOfWeek
          ],
          value: item.total,
          frontColor:
            item.total < 100
              ? '#d1d5db'
              : transactionType === 'income'
              ? '#d3ff00'
              : '#ffab00',
          gradientColor:
            item.total < 100
              ? '#d1d5db'
              : transactionType === 'income'
              ? '#12ff00'
              : '#ff0000',
        }))}
        barWidth={18}
        height={200}
        width={290}
        minHeight={3}
        barBorderRadius={3}
        showGradient
        spacing={20}
        noOfSections={4}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelsVerticalShift={2}
        xAxisLabelTextStyle={{ color: 'gray' }}
        yAxisTextStyle={{ color: 'gray' }}
        isAnimated
        animationDuration={300}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          marginTop: 25,
        }}
      >
        <TouchableOpacity
          onPress={handlePreviousWeek}
          style={{ alignItems: 'center' }}
        >
          <AntDesign name='left' size={24} color='black' />
        </TouchableOpacity>
        <SegmentedControl
          values={['Income', 'Expense']}
          style={{ width: 250 }}
          backgroundColor='#f97316'
          tintColor='#000'
          selectedIndex={transactionType === 'income' ? 0 : 1}
          onChange={(event) => {
            const index = event.nativeEvent.selectedSegmentIndex;
            setTransactionType(index === 0 ? 'income' : 'expense');
          }}
        />
        <TouchableOpacity
          onPress={handleNextWeek}
          style={{ alignItems: 'center' }}
        >
          <AntDesign name='right' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
