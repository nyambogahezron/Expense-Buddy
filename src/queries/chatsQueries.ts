import { supabase } from "@/utils/supabase";

export const fetchWeeklyData = async (
  startDate: string,
  endDate: string,
  type: 'income' | 'expense'
) => {
  try {
    const { data, error } = await supabase
      .from('transactions') 
      .select('date, amount, type')
      .gte('date', startDate)
      .lte('date', endDate)
      .eq('type', type);

    if (error) {
      throw error;
    }

    // Aggregate data by day of the week
    const weeklyData = Array(7)
      .fill(0)
      .map((_, index) => ({ dayOfWeek: index, total: 0 }));

    data.forEach((transaction: any) => {
      const date = new Date(transaction.date);
      const dayOfWeek = date.getUTCDay();
      weeklyData[dayOfWeek].total += transaction.amount;
    });

    // console.log(weeklyData);
    return weeklyData;
  } catch (e) {
    console.error('Error fetching weekly data:', e);
    return [];
  }
};
