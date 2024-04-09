import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/useAuth';
import { firestore, collection, getDocs, doc, deleteDoc } from '../firebase/config';


export default function Favorites() {
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    fetchFavoriteRecipes();
  }, []);

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
      <Text style={styles.subtitle}>Favorite Recipes:</Text>
      <FlatList
        data={favoriteRecipes}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text>{item.strMeal}</Text>
            <Button title="Remove from Favorites" onPress={() => removeFromFavorites(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  recipeItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});