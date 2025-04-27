import { create } from 'zustand';
import { ShoppingList, ShoppingItem } from '@/types/shopping';
import { SAMPLE_SHOPPING_LISTS } from '@/types/shopping';

interface ShoppingStore {
  lists: ShoppingList[];
  selectedList: ShoppingList | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  addList: (list: Omit<ShoppingList, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateList: (id: string, list: Partial<ShoppingList>) => void;
  deleteList: (id: string) => void;
  selectList: (list: ShoppingList | null) => void;
  addItem: (listId: string, item: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (listId: string, itemId: string, item: Partial<ShoppingItem>) => void;
  deleteItem: (listId: string, itemId: string) => void;
  toggleItemPurchased: (listId: string, itemId: string) => void;
}

export const useShoppingStore = create<ShoppingStore>((set) => ({
  lists: SAMPLE_SHOPPING_LISTS,
  selectedList: null,
  isLoading: false,
  error: null,

  addList: (list) => {
    const newList: ShoppingList = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...list,
    };

    set((state) => ({
      lists: [...state.lists, newList],
    }));
  },

  updateList: (id, list) => {
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === id
          ? {
              ...l,
              ...list,
              updatedAt: new Date().toISOString(),
            }
          : l
      ),
    }));
  },

  deleteList: (id) => {
    set((state) => ({
      lists: state.lists.filter((l) => l.id !== id),
      selectedList: state.selectedList?.id === id ? null : state.selectedList,
    }));
  },

  selectList: (list) => {
    set({ selectedList: list });
  },

  addItem: (listId, item) => {
    const newItem: ShoppingItem = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item,
    };

    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId
          ? {
              ...l,
              items: [...l.items, newItem],
              totalEstimatedCost: l.totalEstimatedCost + newItem.estimatedCost,
              updatedAt: new Date().toISOString(),
            }
          : l
      ),
    }));
  },

  updateItem: (listId, itemId, item) => {
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === itemId
                  ? {
                      ...i,
                      ...item,
                      updatedAt: new Date().toISOString(),
                    }
                  : i
              ),
              totalEstimatedCost:
                l.totalEstimatedCost -
                (l.items.find((i) => i.id === itemId)?.estimatedCost || 0) +
                (item.estimatedCost || l.items.find((i) => i.id === itemId)?.estimatedCost || 0),
              updatedAt: new Date().toISOString(),
            }
          : l
      ),
    }));
  },

  deleteItem: (listId, itemId) => {
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId
          ? {
              ...l,
              items: l.items.filter((i) => i.id !== itemId),
              totalEstimatedCost:
                l.totalEstimatedCost -
                (l.items.find((i) => i.id === itemId)?.estimatedCost || 0),
              updatedAt: new Date().toISOString(),
            }
          : l
      ),
    }));
  },

  toggleItemPurchased: (listId, itemId) => {
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === itemId
                  ? {
                      ...i,
                      purchased: !i.purchased,
                      updatedAt: new Date().toISOString(),
                    }
                  : i
              ),
              updatedAt: new Date().toISOString(),
            }
          : l
      ),
    }));
  },
}));