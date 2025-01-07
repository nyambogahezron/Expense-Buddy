const tintColorLight = '#FFA500';
const tintColorDark = tintColorLight
const white = '#ffffff';
const whiteLight = '#f2f2f2';
const whiteDim = '#f3f4f6';
const whiteDim2 = '#ECEDEE';
const blue = '#007AFF';
const orange = '#FFA500';
const orangeRed = '#FF4500';
const tomato = '#FF6347';
const red = '#F44336';
const hotPink = '#FF69B4';
const deepPink = '#FF1493';
const blueViolet = '#3030cc';
const darkOrange = '#FF4500';
const black = '#000000';
const blackLight = '#070B11';
const textGray = '#4B5563';
const gray = '#333333';
const grayLight = '#9BA1A6';

export const Colors = {
  white,
  blue,
  orange,
  orangeRed,
  tomato,
  red,
  hotPink,
  deepPink,
  blueViolet,
  darkOrange,
  black,
  textGray,
  grayLight,
  blackLight,

  light: {
    text: '#11181C',
    textPrimary: whiteDim2,
    background: whiteDim,
    tint: tintColorLight,
    icon: gray,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    headerBackground: whiteLight,
    header: whiteLight,
    customIcon: gray,
    border: '#ccc',
    bgLight: whiteDim,
    customIcon2: '#141518',
    bg2 : '#D8DCE2'
  },
  dark: {
    text: whiteDim2,
    textPrimary: black,
    background: blackLight,
    tint: tintColorDark,
    icon: grayLight,
    tabIconDefault: grayLight,
    tabIconSelected: tintColorDark,
    headerBackground: blackLight,
    header: blackLight,
    customIcon: white,
    border: gray,
    bgLight: '#1c1c1e',
    customIcon2 : '#f2f2f2',
    bg2 : '#1c1c1e'

  },
};

export const IconColors = [
  Colors.orange,
  Colors.orangeRed,
  Colors.tomato,
  Colors.red,
  Colors.hotPink,
  Colors.deepPink,
  Colors.blueViolet,
  Colors.darkOrange,
];
