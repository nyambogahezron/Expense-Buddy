import { View, Text } from 'react-native';
import React, { useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import CustomButton from './CustomButton';

type CategoryActionCardProps = {
  PressedItem: number;
  isPress: boolean;
};

export default function CategoryActionCard({
  PressedItem,
  isPress,
}: CategoryActionCardProps) {
  const snapPoints = useMemo(() => ['30%', '35%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  if (isPress) {
    bottomSheetRef.current?.expand();
  }
  return (
    <View>
      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: '#fff' }}
        backgroundStyle={{ backgroundColor: '#1B1F24', alignItems: 'center' }}
      >
        <View className='relative z-[99991] px-4 items-center w-full h-full justify-center'>
          <View className='-mt-4'>
            <CustomButton
              title='Edit'
              handleOpenPress={() => console.log('edit')}
              customStyles='bg-white mt-1'
              textStyles='text-black font-bold'
            />
            <CustomButton
              title='Delete'
              handleOpenPress={() => console.log('delete')}
              customStyles='bg-[#0079FB] mt-4'
              textStyles='text-white font-bold'
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
