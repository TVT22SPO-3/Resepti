import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ThemeSwitchButton from "./ThemeSwitchButton"
import Styles from "../Styles"
import { useTheme } from "../context/useTheme"
import FullRecipeCard from "./RecipeCard/FullRecipeCard"
import MealExplorer from "./components"

export default function Stacknav2({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={isDarkMode ? Styles.dark : Styles.light}
      screenOptions={{
        headerRight: () => <ThemeSwitchButton />
      }}
    >
        <Stack.Screen name="MealExplorer" component={MealExplorer}/>
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard}/>
    </Stack.Navigator>
  )



}