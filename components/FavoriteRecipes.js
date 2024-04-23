import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/useAuth';
import { firestore, doc, getDoc } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import SmallRecipeCard from './RecipeCard/SmallRecipeCard';
import { fetchMealById } from './TheMealDB/SearchBy';
import { SearchByDocId } from '../FirebaseDB/SearchBy';

export default function FavoriteRecipesCard() {
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
  
        const promises = favoriteRecipeIDs.map(async (favoriteId) => {
          try {
            let recipe;
           
            if (favoriteId.length < 7) {
            
              recipe = await fetchMealById(favoriteId);
            } else {
              
              recipe = await SearchByDocId(favoriteId);
            }
            if (recipe) {
              recipe.isFavorite = true;
              return recipe;
            } else {
              console.error("Recipe not found for ID:", favoriteId);
              return null;
            }
          } catch (error) {
            console.error("Error fetching recipe:", error);
            return null;
          }
        });
  
        const favoriteRecipesData = await Promise.all(promises);
        console.log("Favorite Recipes:", favoriteRecipesData);
       
        const combinedRecipes = [...favoriteRecipes, ...favoriteRecipesData];
        setFavoriteRecipes(combinedRecipes.filter(recipe => recipe !== null));
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderSeparator = () => <View style={styles.separator} />;

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
          horizontal
          data={favoriteRecipes}
          renderItem={({ item, index }) => <SmallRecipeCard item={item} key={index} />}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 24,
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