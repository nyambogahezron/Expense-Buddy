import { IconColors } from '@/constants/Colors';

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * IconColors.length);
  return IconColors[randomIndex];
};

export default getRandomColor;
