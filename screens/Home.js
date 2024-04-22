import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
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

  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
        <Hometext navigation={navigation}/>
          <Sign navigation={navigation}/>
          <SearchBar navigation={navigation}/>
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
  button: {
    marginVertical: 12,
    width: 240,
  },
});
