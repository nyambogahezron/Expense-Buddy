import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Session } from '@supabase/supabase-js';
import React from 'react';

type TransactionProps = {
  id: number;
  title: string;
  date: string;
  amount: string;
  iconColor?:
    | '#FFA500'
    | '#FF4500'
    | '#FF6347'
    | '#FF0000'
    | '#FF69B4'
    | '#FF1493'
    | '#3030cc'
    | '#FF4500';
  type: 'expense' | 'income';
  category: TransactionCategoryProps;
  transactionFee?: string;
  description?: string;
  receipt?: string;
};

type TransactionCategoryProps = {
  id: number;
  name: string;
  icon: string;
};

type GlobalContextType = {
  isUnlocked: boolean;
  appInactive: boolean;
  isAuthenticated: boolean;
  authenticate: () => Promise<void>;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
  User: any;
  loading?: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLockPinSet: boolean;
  lockPin?: number;
  setIsLockPinSet: React.Dispatch<React.SetStateAction<boolean>>;
  setLockPin: React.Dispatch<React.SetStateAction<number>>;
};

type CustomTextInputProps = {
  title: string;
  onChangeText: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  textInputStyle?: string;
  containerStyle?: string;
  inputContainerStyle?: string;
  keyboardType?: 'email-address' | 'default' | 'numeric';
  value?: string;
  multiline?: boolean;
};

type CustomPasswordTextInputProps = CustomTextInputProps & {
  handleOnPress?: () => void;
  passwordVisible?: boolean;
  isForConfirmation?: boolean;
};

type CategoryPickerProps = {
  selectedCategory?: string;
  setSelectedCategory: (value: string) => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  setSelectedCategoryObj: React.Dispatch<React.SetStateAction<any>>;
};

type createContextProps = {
  transactionsData: any;
  isLoading: boolean;
  fetchTransactions: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addTransaction: (transaction: any) => Promise<void>;
  updateTransaction: (transaction: any) => Promise<void>;
  categoriesData: any;
  fetchCategories: () => Promise<void>;
  addCategory: (category: any) => Promise<void>;
  updateCategory: (category: any) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  uploadImage: (image: any) => Promise<any>;
  deleteImage: (imagePath: string) => Promise<void>;
  uploadFile: (file: any) => Promise<any>;
  deleteFile: (filePath: string) => Promise<void>;
};

export {
  TransactionProps,
  TransactionCategoryProps,
  GlobalContextType,
  CustomTextInputProps,
  CustomPasswordTextInputProps,
  CategoryPickerProps,
  createContextProps,
};
