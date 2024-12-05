import { supabase } from '@/utils/supabase';
const User = '';

export async function getAllTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTransactionById(id: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createTransaction(transaction: any) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTransaction(transaction: any) {
  const { data, error } = await supabase
    .from('transactions')
    .update(transaction)
    .eq('id', transaction.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteTransaction(id: string) {
  const { data, error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTransactionsByCategory(category: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('category', category);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTransactionsByDateRange(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
