import { supabase } from '@/utils/supabase';

const User = '';

export async function getAllCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', User);

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data;
}

export async function createCategory(category: any) {
    const { data, error } = await supabase
        .from('categories')
        .insert([{ ...category, user_id: User }]);

    if (error) {
        console.error('Error creating category:', error);
        return null;
    }

    return data;
}

export async function updateCategory(category: any) {
    const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', category.id)
        .eq('user_id', User);

    if (error) {
        console.error('Error updating category:', error);
        return null;
    }

    return data;
}

export async function deleteCategory(id: string) {
    const { data, error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
        .eq('user_id', User);

    if (error) {
        console.error('Error deleting category:', error);
        return null;
    }

    return data;
}
