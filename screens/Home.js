import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Button, IconButton } from 'react-native-paper'
import Hometext from '../components/Hometext';
import Sign from '../components/Sign';
import { useAuth } from '../context/useAuth';
import LogInText from '../text/HomeTextLogIn';
import Styles from '../Styles';
import ThemeSwitchButton from '../components/ThemeSwitch/ThemeSwitchButton';
import { useTheme } from '../context/useTheme';
import RandomMeal from '../components/RandomMeal';
import SearchBar from '../components/Search/SearchBar';
import Categories from '../components/Categories';

export default function Home({ navigation }) {
  const {user} = useAuth()
  console.log("Home", user)
  const {isDarkMode} = useTheme()
  const [visible, setVisible] = useState(true)

  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
        {visible && (
        <View style={styles.container2}>
          <Hometext navigation={navigation}/>
          <Button style={styles.closeButton} onPress={() => setVisible(false)}>Close</Button>
        </View>
        )}
        <View style={styles.searchBarContainer}>
          <SearchBar navigation={navigation}/>
        </View>
        <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
          <RandomMeal/>
        </View>
        <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
          <Categories/>
        </View>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7C7C7',
    marginHorizontal: 10,
    marginVertical: 40,
    padding: 20,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
  },
  button: {
    marginVertical: 12,
    width: 240,
  },
  closeButton: {
    marginTop: 15,
  }
});
