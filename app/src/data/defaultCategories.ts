import { useGlobalContext } from '@/context/GlobalProvider';

export default function defaultCategories() {
  const { session } = useGlobalContext();
  const Categories = [
    { name: 'Food', icon: '🍜', userId: session?.user?.id },
    { name: 'Bills', icon: '💡', userId: session?.user?.id },
    {
      name: 'Transport',
      icon: '🚗',
      userId: session?.user?.id,
    },
    { name: 'Home', icon: '🏠', userId: session?.user?.id },
    { name: 'Health', icon: '🚑', userId: session?.user?.id },
    {
      name: 'Entertainment',
      icon: '🎬',
      userId: session?.user?.id,
    },
    {
      name: 'Shopping',
      icon: '🛍️',
      userId: session?.user?.id,
    },
    {
      name: 'Online Services Subscription',
      icon: '💻',
      userId: session?.user?.id,
    },
    { name: 'Salary', icon: '💰', userId: session?.user?.id },
    {
      name: 'Business',
      icon: '🏢',
      userId: session?.user?.id,
    },
    {
      name: 'Investment',
      icon: '📈',
      userId: session?.user?.id,
    },
    {
      name: 'Clothing',
      icon: '👔',
      userId: session?.user?.id,
    },
    { name: 'Other', icon: '❓', userId: session?.user?.id },
  ];

  return Categories;
}
