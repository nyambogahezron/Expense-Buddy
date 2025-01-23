import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();

  return (
    <SafeAreaView
      className='bg-dark h-screen w-screen'
      style={styles.container}
    >
      <View style={styles.gradientContainer}>
        <LinearGradient
          style={styles.gradient}
          colors={['#EE401B', '#F1621B', '#F38D1B']}
          start={[0.9, 0.8]}
          end={[0.1, 0.2]}
        />
      </View>
      <View style={styles.wrapper}>
        <View
          className={`items-center h-screen ${
            width <= 899 ? 'w-full' : 'w-1/2'
          }`}
        >
          {/* card  */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardCircleRed}></View>
              <View style={styles.cardCircleOrange}></View>
            </View>
            <Text style={styles.cardText}>My Wallet</Text>
            <View style={styles.cardNumber}>
              <Text style={styles.cardNumberText}>***</Text>
              <Text style={styles.cardNumberText}>***</Text>
              <Text style={styles.cardNumberText}>***</Text>
              <Text style={styles.cardNumberText}>1234</Text>
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Your</Text>
            </View>
            <View>
              <Text style={styles.titleSubText}>EXPENSE</Text>
              <Text style={styles.titleSubText}>BUDDY</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Animated.Text entering={FadeInLeft} style={styles.descriptionText}>
              The right app to make it easy to manage your expenses on the go.
            </Animated.Text>
            <Text style={styles.descriptionSubText}>
              Personal Capital Expensify
            </Text>
          </View>

          <Animated.View entering={FadeInDown} style={styles.buttonContainer}>
            <Button
              title='Login'
              handleOpenPress={() => router.push('/(auth)/login')}
              customStyles={[
                styles.button,
                {
                  width: width <= 899 ? width * 0.5 : width * 0.25,
                },
              ]}
              textStyles={styles.buttonText}
            />
            <Button
              title='Register'
              handleOpenPress={() => router.push('/(auth)/register')}
              customStyles={[
                styles.buttonRegister,
                {
                  width: width <= 899 ? width * 0.5 : width * 0.25,
                },
              ]}
              textStyles={styles.buttonText}
            />
          </Animated.View>
        </View>
        <View
          style={[styles.deviceMockupContainer, width <= 899 && styles.hidden]}
        >
          <View style={styles.deviceMockup}>
            <View style={styles.deviceMockupTop}></View>
            <View
              style={[styles.deviceMockupSideButton, { top: 72, left: -17 }]}
            ></View>
            <View
              style={[
                styles.deviceMockupSideButtonLong,
                { top: 124, left: -17 },
              ]}
            ></View>
            <View
              style={[
                styles.deviceMockupSideButtonLong,
                { top: 178, left: -17 },
              ]}
            ></View>
            <View
              style={[
                styles.deviceMockupSideButtonRight,
                { top: 142, right: -17 },
              ]}
            ></View>
            <View style={styles.deviceMockupScreen}>
              <Image
                source={require('@assets/images/device.jpg')}
                resizeMode='cover'
                style={styles.deviceMockupImage}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const DeviceMockup = () => {
  return (
    <View style={styles.deviceMockupContainer}>
      <View style={styles.deviceMockup}>
        <View style={styles.deviceMockupTop}></View>
        <View
          style={[styles.deviceMockupSideButton, { top: 72, left: -17 }]}
        ></View>
        <View
          style={[styles.deviceMockupSideButtonLong, { top: 124, left: -17 }]}
        ></View>
        <View
          style={[styles.deviceMockupSideButtonLong, { top: 178, left: -17 }]}
        ></View>
        <View
          style={[styles.deviceMockupSideButtonRight, { top: 142, right: -17 }]}
        ></View>
        <View style={styles.deviceMockupScreen}>
          <Image
            source={require('@assets/images/device.jpg')}
            resizeMode='cover'
            style={styles.deviceMockupImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },

  gradientContainer: {
    position: 'absolute',
    height: 150,
    width: 150,
    borderRadius: '50%',
    right: -100,
    top: -80,
  },
  gradient: {
    position: 'absolute',
    height: 400,
    width: 400,
    borderRadius: '50%',
    right: -40,
    top: -30,
  },
  card: {
    marginTop: 14,
    marginLeft: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    transform: [{ rotate: '-4deg' }],
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    opacity: 0.8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
  },
  cardCircleRed: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EE401B',
    opacity: 0.7,
  },
  cardCircleOrange: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1621B',
    opacity: 0.7,
    right: 24,
  },
  cardText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  cardNumber: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
    alignItems: 'center',
  },
  cardNumberText: {
    padding: 4,
    color: Colors.white,
    fontSize: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 40,
    fontStyle: 'italic',
    marginRight: 8,
    backgroundColor: '#F38D1B',
    padding: 4,
    borderRadius: 8,
  },
  titleSubText: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    width: '50%',
  },
  descriptionText: {
    color: Colors.white,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginBottom: 4,
    marginTop: 8,
    fontSize: 16,
    letterSpacing: 1.5,
    fontFamily: 'sans-serif-light',
  },
  descriptionSubText: {
    color: Colors.white,
    fontFamily: 'sans-serif-semibold',
    marginTop: 8,
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 12,
    marginLeft: -12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: '33%',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.white,
    marginTop: 4,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  buttonRegister: {
    backgroundColor: '#1E90FF',
    marginTop: 16,
  },
  hidden: {
    display: 'none',
  },
  deviceMockupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceMockup: {
    position: 'relative',
    marginHorizontal: 'auto',
    borderColor: '#4B5563',
    backgroundColor: '#4B5563',
    borderWidth: 14,
    borderRadius: 20,
    height: 600,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  deviceMockupTop: {
    width: 148,
    height: 18,
    backgroundColor: '#4B5563',
    top: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    left: '50%',
    transform: [{ translateX: -74 }],
    position: 'absolute',
  },
  deviceMockupSideButton: {
    height: 32,
    width: 3,
    backgroundColor: '#4B5563',
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  deviceMockupSideButtonLong: {
    height: 46,
    width: 3,
    backgroundColor: '#4B5563',
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  deviceMockupSideButtonRight: {
    height: 64,
    width: 3,
    backgroundColor: '#4B5563',
    position: 'absolute',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  deviceMockupScreen: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  deviceMockupImage: {
    width: 270,
    height: 600,
  },
});
