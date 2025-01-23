import { StyleSheet } from 'react-native';
import React from 'react';

import LandingPage from './LandingPage';

export default function App() {
  return <LandingPage />;
}

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
});
