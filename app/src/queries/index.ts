import { supabase } from '@/utils/supabase';
const User = '';

export async function getAllTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', User)
    .order('id', { ascending: false });

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function getTransactionById(id: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function createTransaction(transaction: any) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction]);

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function updateTransaction(transaction: any) {
  const { data, error } = await supabase
    .from('transactions')
    .update(transaction)
    .eq('id', transaction.id);

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase.from('transactions').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return true;
}

export async function getTransactionsByCategory(category: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('category', category)
    .eq('user_id', User);

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', User);

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function createCategory(category: any) {
  const { data, error } = await supabase.from('categories').insert([category]);

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function updateCategory(category: any) {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', category.id);

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from('categories').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return true;
}
