import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Session } from '@supabase/supabase-js';
import React from 'react';
import { ViewProps, TextProps, TextStyle, ViewStyle } from 'react-native';

export type TransactionProps = {
  id: string;
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

export type TransactionCategoryProps = {
  id: number;
  name: string;
  icon: string;
};

export type GlobalContextType = {
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
  UserCurrency: string;
  getUserCurrency: () => Promise<void>;
  isBiometricSupported: boolean;
  isBiometricEnabled: boolean;
};

export type CustomTextInputProps = {
  title: string;
  onChangeText: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  textInputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  keyboardType?: 'email-address' | 'default' | 'numeric';
  value?: string;
  multiline?: boolean;
  inputType?: 'normal' | 'password';
  passwordVisible?: boolean;
  handleOnPress?: () => void;
  isForConfirmation?: boolean;
};


export type CategoryPickerProps = {
  selectedCategory?: string;
  setSelectedCategory: (value: string) => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  setSelectedCategoryObj: React.Dispatch<React.SetStateAction<any>>;
};

export type createContextProps = {
  transactionsData: any;
  isLoading: boolean;
  fetchTransactions: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addTransaction: (transaction: any) => Promise<void>;
  updateTransaction: (transaction: any) => Promise<void>;
  categoriesData: any;
  fetchCategories: () => Promise<void>;
  addCategory: (category: any) => Promise<any>;
  updateCategory: (category: any) => Promise<any>;
  deleteCategory: (id: string) => Promise<void>;
  totalExpense: number;
  totalIncome: number;
  expenseList: any;
  incomeList: any;
};

export type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export type tabIcons = {
  [key: string]: (props: any) => JSX.Element;
};

export type ThemedUI = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export type TextUI = ThemedUI &
  TextProps & {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  };

export type ButtonProps = {
  handleOpenPress: () => void;
  title: string;
  textStyles?: TextStyle;
  customStyles?: ViewStyle | ViewStyle[];
  touchOpacity?: number;
  isLoading?: boolean;
  disabled?: boolean;
};
