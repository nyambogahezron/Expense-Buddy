import { create } from 'zustand';
import { supabase } from '@/utils/supabase';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Alert } from 'react-native';

type CategoriesStoreProps = {
  categoriesData: any[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  addCategory: (category: any) => Promise<void>;
  updateCategory: (category: any) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
};

export const useCategoriesStore = create<CategoriesStoreProps>((set, get) => ({
  categoriesData: [],
  isLoading: false,
  fetchCategories: async () => {
    const { User } = useGlobalContext();
    try {
      set({ isLoading: true });
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .eq('userId', User?.sub);

      if (error) {
        console.log('error getting categories', error);
        throw new Error(error.message);
      }

      if (categories) {
        set({ categoriesData: categories });
      } else {
        set({ categoriesData: [] });
      }
    } catch (error) {
      console.log('error fetching categories', error);
    } finally {
      set({ isLoading: false });
    }
  },
  addCategory: async (category: any) => {
    const { User } = useGlobalContext();
    try {
      set({ isLoading: true });
      const { error } = await supabase.from('categories').insert([
        {
          ...category,
          userId: User?.sub,
        },
      ]);

      if (error) {
        console.log('error adding category', error);
        throw new Error(error.message);
      }
      get().fetchCategories();
    } catch (error) {
      console.log('error adding category', error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateCategory: async (category: any) => {
    const { User } = useGlobalContext();
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', category.id)
        .eq('userId', User?.sub);

      if (error) {
        console.log('error updating category', error);
        throw new Error(error.message);
      }
      get().fetchCategories();
    } catch (error) {
      console.log('error updating category', error);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCategory: async (id: string) => {
    const { User } = useGlobalContext();
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
        .eq('userId', User?.sub);

      if (error) {
        console.log('error deleting category', error);
        throw new Error(error.message);
      }
      Alert.alert('Category deleted successfully');
      get().fetchCategories();
    } catch (error) {
      console.log('error deleting category', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
