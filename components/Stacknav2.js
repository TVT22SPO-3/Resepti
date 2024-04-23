import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ThemeSwitchButton from "./ThemeSwitch/ThemeSwitchButton"
import Styles from "../Styles"
import { useTheme } from "../context/useTheme"
import FullRecipeCard from "./RecipeCard/FullRecipeCard"
import FullEditRecipeCard from "./RecipeCard/FullEditRecipeCard"
import MealExplorer from "./components"
import ShowRecipes from "./ShowRecipes"
import Account from "../screens/Account"
import SearchPage from "./Search/SearchPage"
import SmallRecipeCard from "./RecipeCard/SmallRecipeCard"
import CategoryCard from "./RecipeCard/CategoryCard"


 function Stacknav2({ initialRoute }) {



  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={[isDarkMode ? Styles.dark : Styles.light]}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="SearchPage" component={SearchPage} />     
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard} />
      <Stack.Screen name="FullEditRecipeCard" component={FullEditRecipeCard} />
      <Stack.Screen name="CategoryCard" component={CategoryCard} />
      
    </Stack.Navigator>
  )

}

function Stacknav3({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={[isDarkMode ? Styles.dark : Styles.light]}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Account" component={Account} />     
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard}/>
      <Stack.Screen name="FullEditRecipeCard" component={FullEditRecipeCard}/>
      <Stack.Screen name="CategoryCard" component={CategoryCard} />
    </Stack.Navigator>
  )

}
export {Stacknav2, Stacknav3}