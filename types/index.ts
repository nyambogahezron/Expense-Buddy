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

export {
  TransactionProps,
  TransactionCategoryProps,
  GlobalContextType,
  CustomTextInputProps,
  CustomPasswordTextInputProps,
};
