import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Styles from '../Styles'
import { useTheme } from '../context/useTheme'

export default function Hometext() {
  const {isDarkMode} = useTheme()
  return (
    <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
      <Text style={[styles.header, isDarkMode ? Styles.dark : Styles.light]}>Welcome to the Foodthusiast home page!</Text>
      <Text style={[styles.text, isDarkMode ? Styles.dark : Styles.light]}>Here you can find and upload delicious recipes!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontStyle: 'italic',
    fontSize: 28,
    paddingTop: 24,
    paddingBottom: 24,
    marginHorizontal: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontStyle: 'italic',
    fontSize: 24,
    marginHorizontal: 12,
  }
})