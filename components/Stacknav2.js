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
import FavoriteRecipesCard from "./FavoriteRecipes"
import HomeLogged from "../screens/HomeLogged"
import Newest from "./NewestRecipes"
import Categories from "./Categories"
import CategoryCard from "./RecipeCard/CategoryCard"
import SmallRecipeCard from "./RecipeCard/SmallRecipeCard"
import RandomMeal from "./RandomMeal"


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

function ShowRecipesStack({ initialRoute }) {


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
      <Stack.Screen name="Showrecipes" component={ShowRecipes} />

    </Stack.Navigator>
  )

}
function FavoritesStack({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={[isDarkMode ? Styles.dark : Styles.light]}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="FavoriteRecipes" component={FavoriteRecipesCard} />
      <Stack.Screen name="SmallRecipeCard" component={SmallRecipeCard} />
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard} />
    </Stack.Navigator>
  )

}
function AccountStack({ initialRoute }) {


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
      <Stack.Screen name="ShowRecipes" component={ShowRecipesStack} />
      <Stack.Screen name="Favorites" component={FavoritesStack} />
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard} />
    </Stack.Navigator>
  )

}
function SearchStack({ initialRoute }) {


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
    </Stack.Navigator>
  )

}
function HomeLoggedStack({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={[isDarkMode ? Styles.dark : Styles.light]}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeLogged" component={HomeLogged} />
      <Stack.Screen name="RandomMeal" component={RandomMealStack} />
      <Stack.Screen name="Categories" component={CategoriesStack} />
      <Stack.Screen name="Newest" component={NewestStack} />
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard} />
    </Stack.Navigator>
  )

}
function NewestStack({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={[isDarkMode ? Styles.dark : Styles.light]}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Newest" component={Newest} />
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard} />
    </Stack.Navigator>
  )

}
function RandomMealStack({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={[isDarkMode ? Styles.dark : Styles.light]}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="RandomMeal" component={RandomMeal} />
      <Stack.Screen name="FullRecipeCard" component={FullRecipeCard} />
    </Stack.Navigator>
  )

}
function CategoriesStack({ initialRoute }) {


  const Stack = createNativeStackNavigator();
  const { isDarkMode } = useTheme();


  return (
    <Stack.Navigator
      style={[isDarkMode ? Styles.dark : Styles.light]}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Categories" component={CategoriesStack} />
      
      <Stack.Screen name="SearchPage" component={SearchStack} />
    </Stack.Navigator>
  )

}
export { Stacknav2, ShowRecipesStack, FavoritesStack, AccountStack, SearchStack, HomeLoggedStack, NewestStack, RandomMealStack, CategoriesStack }