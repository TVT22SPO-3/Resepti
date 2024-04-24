import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/useAuth';
import { firestore, doc, getDoc, query, collection } from '../firebase/config';
import { onSnapshot } from 'firebase/firestore';
import { getAuth } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import FavoritesCard from './RecipeCard/FavoritesCard';
import Styles from '../Styles';
import { useTheme } from '../context/useTheme';
import { removeFromFavorites } from './favorites'; 
import SmallRecipeCard from './RecipeCard/SmallRecipeCard';
import { fetchMealById, fetchMealById2 } from './TheMealDB/SearchBy';
import { Card } from 'react-native-paper';
import {  SearchByDocId2 } from '../FirebaseDB/SearchBy';


export default function FavoriteRecipesCard({ item }) {
  const {isDarkMode} = useTheme()



  const navigation = useNavigation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  

  useEffect(() => {
    fetchFavoriteRecipes();
  },[isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const fetchFavoriteRecipes = async () => {
    const docRef = doc(firestore, "profile", user.uid);
    const recipes = []
    const recipes2 = []
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const favoriteRecipeIDs = data.favorite;
        console.log("favoriteRecipeIDs", favoriteRecipeIDs.length)

        for (const id of favoriteRecipeIDs) {
          let result
          if (id.length < 10) {
             result = await fetchMealById2(id)
            console.log("result", result)
            recipes.push(result)
            
          }else{
             result = await SearchByDocId2(id)
            console.log("else id", id)
            recipes2.push(result)
            
          }
         
          
      }

      console.log("recipes",recipes)
      console.log("recipes2",recipes2)
      const recipes3 = [...recipes2,...recipes,]
      console.log("recipes3",recipes3)
      const recipes4 = [].concat(...recipes3)
      setFavoriteRecipes(recipes4)
      console.log("favorite",favoriteRecipes)
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <Card style={[styles.container,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
      <Pressable onPress={toggleAccordion} style={[styles.button,isDarkMode ? Styles.darkCard : Styles.lightCard ]}>
        <Text style={[styles.buttonText,isDarkMode ? Styles.darkCard : Styles.lightCard]}>Favorite Recipes</Text>
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
    </Card>
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
    //backgroundColor: '#faebd7',
    paddingLeft: 15,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    //borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  buttonText: {
    fontSize: 18,
  },
  separator: {
    height: 24,
    width: 20,
    paddingLeft: 20,
  },
});