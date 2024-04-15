import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/useAuth';
import { firestore, collection, getDocs, doc, deleteDoc, query, where } from '../firebase/config';

export default function FavoriteRecipesCard() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchFavoriteRecipes();
    }
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

  const openRecipe = async (recipeId) => {
    try {
      console.log("Opening recipe with ID:", recipeId);
    } catch (error) {
      console.error("Error opening recipe:", error);
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
            <View style={styles.recipeItem}>
              <TouchableOpacity onPress={() => openRecipe(item.id)}>
                <Image style={styles.recipeImage} source={{ uri: item.strMealThumb }} />
              </TouchableOpacity>
              <View style={styles.recipeContent}>
                <Text style={styles.recipeName}>{item.strMeal}</Text>
                <Text style={styles.instructions}>{item.strInstructions}</Text>
              </View>
              <Button title="Remove from Favorites" onPress={() => removeFromFavorites(item.id)} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    backgroundColor: '#faebd7',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonText: {
    fontSize: 18,
  },
  recipeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipeImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  recipeContent: {
    flex: 1,
    marginRight: 10,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instructions: {
    fontSize: 14,
  },
});