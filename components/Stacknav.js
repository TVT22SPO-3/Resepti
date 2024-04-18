import React from "react"
import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signup from "../screens/Signup"
import Login from "../screens/Login"
import Home from "../screens/Home"
import ThemeSwitchButton from "./ThemeSwitch/ThemeSwitchButton"
import Styles from "../Styles"
import { useTheme } from "../context/useTheme"
import FullRecipeCard from "./RecipeCard/FullRecipeCard"
import { LoginButton, RegisterButton } from "./TopBar.js/LoginButton"
import { useNavigation } from "@react-navigation/native"
import TopBar from "./TopBar.js/TopBar"

export default function Stacknav({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  return (

    <>
      <TopBar />
      <Stack.Navigator
        style={isDarkMode ? Styles.dark : Styles.light}
        screenOptions={{
          headerShown: false,
          /*headerRight: () => <ThemeSwitchButton />, */
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="FullRecipeCard" component={FullRecipeCard}/>
      </Stack.Navigator>
    </>
    

  )

}