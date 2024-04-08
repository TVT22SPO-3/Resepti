import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signup from "../screens/Signup"
import Login from "../screens/Login"
import Home from "../screens/Home"
import ThemeSwitchButton from "./ThemeSwitchButton"
import Styles from "../Styles"
import { useTheme } from "../context/useTheme"

export default function Stacknav({initialRoute}){


    const Stack = createNativeStackNavigator();
    const {isDarkMode} = useTheme();


  return (
    <Stack.Navigator
      style={isDarkMode ? Styles.dark : Styles.light}
      screenOptions={{
        headerRight: () => <ThemeSwitchButton/>
      }}
      >
      <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
    </Stack.Navigator>
  )
}