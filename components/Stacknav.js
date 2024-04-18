import React from "react"
import { View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signup from "../screens/Signup"
import Login from "../screens/Login"
import Home from "../screens/Home"
import ThemeSwitchButton from "./ThemeSwitch/ThemeSwitchButton"
import Styles from "../Styles"
import { useTheme } from "../context/useTheme"
import FullRecipeCard from "./RecipeCard/FullRecipeCard"
import { LoginButton, RegisterButton } from "./LoginButton"
import { useNavigation } from "@react-navigation/native"
import TopBarMenu from "./LoginButton"

export default function Stacknav({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  return (
    
    <Stack.Navigator
      style={isDarkMode ? Styles.dark : Styles.light}
      screenOptions={{
        headerRight: () => <ThemeSwitchButton />, 
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard}/>
    </Stack.Navigator>
    
  )

}