import React from 'react'
import Styles from '../Styles';
import ThemeSwitchButton from '../components/ThemeSwitchButton';
import { useTheme } from '../context/useTheme';
import { StyleSheet, Text, View } from 'react-native';

export default function Settings() {
    const { isDarkMode } = useTheme()
  return (
    <View style={[Styles.container,isDarkMode ? Styles.dark : Styles.light]}>
        <Text style={isDarkMode ? Styles.dark : Styles.light}>
            Change theme:
        </Text>
        <ThemeSwitchButton/>
    </View>

  )
}
