import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function LogInText() {
  return (
    <View>
      <Text style={styles.header}>Welcome back to the Foodthusiast home page!</Text>
      <Text style={styles.text}>Here you can find and upload delicious recipes!</Text>
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
  text: {
    fontStyle: 'italic',
    fontSize: 24,
    marginHorizontal: 12,
  }
})