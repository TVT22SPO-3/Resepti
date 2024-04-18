import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ThemeSwitchButton from "./ThemeSwitch/ThemeSwitchButton"
import Styles from "../Styles"
import { useTheme } from "../context/useTheme"
import FullRecipeCard from "./RecipeCard/FullRecipeCard"
import MealExplorer from "./components"
import ShowRecipes from "./ShowRecipes"
import Account from "../screens/Account"

 function Stacknav2({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={isDarkMode ? Styles.dark : Styles.light}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MealExplorer" component={MealExplorer} />     
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard} />
      
    </Stack.Navigator>
  )

}

function Stacknav3({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={isDarkMode ? Styles.dark : Styles.light}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Account" component={Account} />     
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard}/>
      
    </Stack.Navigator>
  )

}
export {Stacknav2, Stacknav3}