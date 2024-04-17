import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import Styles from '../Styles'
import { useTheme } from '../context/useTheme'


export default function Sign({navigation}) {
  const { isDarkMode }= useTheme()
  return (
    <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]} >
      <Button
        style={styles.button}
        mode ="contained"
        onPress={() => navigation.navigate('Login')}>
          Sign in
        </Button>
      <Button
      style={styles.button}
      mode='contained'
      onPress={() => navigation.navigate('Signup')}
      >Create account
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    header:{
      fontSize: 36,
      paddingTop: 24,
      paddingBottom: 24,
    },
    button:{
    marginVertical: 12,
    width: 240,
    }
  });