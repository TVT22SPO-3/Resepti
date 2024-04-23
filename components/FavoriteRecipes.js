import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/useAuth';
import { firestore, collection, doc, getDoc } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import FavoritesCard from './RecipeCard/FavoritesCard';
import Styles from '../Styles';
import { useTheme } from '../context/useTheme';
import { removeFromFavorites } from './favorites'; // Import removeFromFavorites

export default function FavoriteRecipesCard({ item }) {
  const {isDarkMode} = useTheme()
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    fetchFavoriteRecipes();
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const fetchFavoriteRecipes = async () => {
    const docRef = doc(firestore, "profile", user.uid);
  
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const favoriteRecipeIDs = data.favorite;
  
        // Fetch details of each favorite recipe
        const promises = favoriteRecipeIDs.map(async (favorite) => {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favorite}`);
          const data = await response.json();
          return data.meals[0]; // Assuming the API response structure
        });
  
        // Wait for all promises to resolve
        const favoriteRecipesData = await Promise.all(promises);
        setFavoriteRecipes(favoriteRecipesData);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openRecipe = (recipeId) => {
    navigation.navigate('FullRecipeCard', { recipeId });
  };

  const removeFromFavoritesAndUpdate = async (recipeId) => {
    try {
      // Remove the recipe from the favoriteRecipes state
      setFavoriteRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.idMeal !== recipeId));
  
      // Call removeFromFavorites function to remove the recipe from the database
      await removeFromFavorites(user.uid, recipeId);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const renderSeparator = () => <View style={styles.separator} />;
/*
  return (
    <View style={styles.container}>
      <Pressable onPress={toggleAccordion} style={[styles.button,isDarkMode ? Styles.dark : Styles.light ]}>
        <Text style={[styles.buttonText,isDarkMode ? Styles.dark : Styles.light]}>Favorite Recipes</Text>
        <MaterialCommunityIcons
          name={isOpen ? 'arrow-up-thick' : 'arrow-down-thick'}
          size={24}
        />
      </Pressable>

      {isOpen && (
        <FlatList
          data={favoriteRecipes}
          renderItem={({ item }) => (
            <FavoritesCard
              item={item}
              openRecipe={() => openRecipe(item.idMeal)} 
              removeFromFavorites={removeFromFavoritesAndUpdate} // Use removeFromFavoritesAndUpdate
              showRemoveButton={true}
            />
          )}
        />
      )}
    </View>
  );*/
  return (
    <View style={styles.container}>
        <FlatList
          data={favoriteRecipes}
          renderItem={({ item }) => (
            <FavoritesCard
            item={item}
            openRecipe={openRecipe}
            ItemSeparatorComponent={renderSeparator}
            removeFromFavorites={removeFromFavorites}
            showRemoveButton 
          />
          )}
          keyExtractor={(item) => item.id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom:24,
    justifyContent: 'center',
    alignContent: 'center',
    margin: (24, 24, 24, 24),
    borderRadius: 10,
    backgroundColor: '#faebd7',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  buttonText: {
    fontSize: 18,
  },
});