import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/useAuth';
import { firestore, collection, getDocs, deleteDoc, doc } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import SmallRecipeCard from './RecipeCard/SmallRecipeCard';
import FavoritesCard from './RecipeCard/FavoritesCard';

export default function FavoriteRecipesCard({ item }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    fetchFavoriteRecipes();
  }, []); // Fetch favorite recipes on component mount

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const openRecipe = (recipeId) => {
    navigation.navigate('FullRecipeCard', { recipeId });
  };

  const fetchFavoriteRecipes = async () => {
    try {
      const favoritesRef = collection(firestore, `users/${user.uid}/favorites`);
      const favoritesSnapshot = await getDocs(favoritesRef);
      const favoritesData = favoritesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setFavoriteRecipes(favoritesData);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };

  const removeFromFavorites = async (recipeId) => {
    try {
      await deleteDoc(doc(firestore, `users/${user.uid}/favorites`, recipeId));
      setFavoriteRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error removing recipe from favorites:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleAccordion} style={styles.button}>
        <Text style={styles.buttonText}>Favorite Recipes</Text>
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
            openRecipe={openRecipe}
            removeFromFavorites={removeFromFavorites}
            showRemoveButton 
          />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: '#FAEBD7',
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