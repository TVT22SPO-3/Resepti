import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Styles from '../Styles'
import { useTheme } from '../context/useTheme'
import { useAuth } from '../context/useAuth'

export default function LogInText() {
  const {isDarkMode} = useTheme()
  const {user} = useAuth()
  return (
    <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
      <Text style={[styles.header,isDarkMode ? Styles.dark : Styles.light]}>Welcome back {user.displayName} to the Foodthusiast!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontStyle: 'italic',
    fontSize: 28,
    paddingTop: 24,
    paddingBottom: 24,
    marginHorizontal: 12,
  },
  text: {
    fontStyle: 'italic',
    fontSize: 24,
    marginHorizontal: 12,
  }
})