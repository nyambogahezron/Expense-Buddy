import { View, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '../Themed';
import { useTheme } from '@/context/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { CustomPasswordTextInputProps } from '@/types';

export default function CustomPasswordInput({
  title,
  onChangeText,
  value,
  placeholder,
  textInputStyle,
  containerStyle,
  inputContainerStyle,
  handleOnPress,
  passwordVisible,
  isForConfirmation = false,
  keyboardType = 'default',
}: CustomPasswordTextInputProps) {
  const { theme } = useTheme();

  return (
    <View className={`mb-3 relative ${containerStyle}`}>
      <ThemedText darkColor='#f2f2f2' className='font-pbold ml-2 mb-1'>
        {title}
      </ThemedText>
      <View
        style={{
          backgroundColor: theme === 'light' ? '#e5e7eb' : '#1c1c1e',
        }}
        className={`p-4 rounded-lg flex-row justify-between items-center mb-4 relative ${inputContainerStyle}`}
      >
        <TextInput
          placeholderTextColor={theme === 'light' ? '#6b7280' : '#ccc'}
          className={`font-bold flex-1 ${textInputStyle}  ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-200'
          }`}
          placeholder={placeholder}
          secureTextEntry={!passwordVisible}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
        {!isForConfirmation && (
          <TouchableOpacity
            onPress={handleOnPress}
            className='absolute right-3 '
          >
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={theme === 'light' ? '#000' : '#f3f4f6'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
