import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, FlatList, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { firestore, collection, addDoc, serverTimestamp, doc, deleteDoc, query, where, getDocs } from '../firebase/config'; 
import { useAuth } from '../context/useAuth';
import SmallRecipeCard from './RecipeCard/SmallRecipeCard';
import { SearchByIngredient, SearchByName } from '../FirebaseDB/SearchBy';

 export default function MealExplorer() {
  const { user } = useAuth();

  const [mealFB, setMealfb] = useState(null);
  const [mealsFB, setMealsfb] = useState([]);
  const [meal, setMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchAllCategories();
    fetchUserFavorites();
  }, []);


  const handleSearch = () => {
    fetchFirebaseByName(setSearchTerm)
    fetchMealByName(setSearchTerm)
  }

  const fetchUserFavorites = async () => {
    try {
      const favoritesRef = collection(firestore, `users/${user.uid}/favorites`);
      const favoritesSnapshot = await getDocs(favoritesRef);
      const favoritesData = favoritesSnapshot.docs.map(doc => doc.data());
      setFavorites(favoritesData);

      setMeals(prevMeals => {
        return prevMeals.map(recipe => {
          return {
            ...recipe,
            isFavorite: favoritesData.some(item => item.idMeal === recipe.idMeal)
          };
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addToFavorites = async (recipe) => {
    try {
      const favoritesRef = collection(firestore, `users/${user.uid}/favorites`);
      const newFavoriteDoc = await addDoc(favoritesRef, {
        ...recipe,
        userId: user.uid, 
        createdAt: serverTimestamp(),
      });
      console.log("Recipe added to favorites:", recipe); 
      setFavorites(prevFavorites => [...prevFavorites, { ...recipe, id: newFavoriteDoc.id }]); 
      updateMealFavoriteStatus(recipe.idMeal, true);
    } catch (error) {
      console.error("Error adding recipe to favorites:", error);
    }
  };

  const removeFromFavorites = async (recipe) => {
    try {
      const favoritesRef = collection(firestore, `users/${user.uid}/favorites`);
      const querySnapshot = await getDocs(query(favoritesRef, where('idMeal', '==', recipe.idMeal))); 
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log("Recipe removed from favorites:", recipe); 
      setFavorites(prevFavorites => prevFavorites.filter(item => item.idMeal !== recipe.idMeal));
      updateMealFavoriteStatus(recipe.idMeal, false);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const updateMealFavoriteStatus = (mealId, isFavorite) => {
    setMeals(prevMeals => {
      return prevMeals.map(item => {
        if (item.idMeal === mealId) {
          return { ...item, isFavorite: isFavorite };
        }
        return item;
      });
    });
  };

  const fetchRandomMeal = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      console.log("data", data)
      setMeal(data.meals[0]);
      setMeals([]);
      setSelectedCategory('');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMealByName = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      console.log("logi",data)
      setMeal(data.meals ? data.meals[0] : null);
      setMeals([]);
      setSelectedCategory('');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFirebaseByName = async () => {
    try {
      const resp = await SearchByName(searchTerm)
      console.log("fetchFirebaseByName1", resp)
      setMealfb(resp ? resp[0] : null);
      setMealsfb([]);
      setSelectedCategory('');
    } catch (error) {
      console.log("fetchFirebaseByName", error)
    }
  }
  const fetchFirebaseByingredient = async () => {
    try {
      const resp = await SearchByIngredient(searchTerm)
      console.log("FetchbyIngredient", resp)
      setMeal(resp ? resp[0] : null);
      setMeals([]);
      setSelectedCategory('');
    } catch (error) {
      console.log("fetchFirebaseByName", error)
    }
  }

  const fetchMealById = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals ? data.meals[0] : null);
      setMeals([]);
      setSelectedCategory('');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      setCategories(data.categories || []);
      setShowCategories(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMealsByCategory = async (category) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      console.log("category", data)
      setMeals(data.meals || []);
      setSelectedCategory(category);
      setMeal(null);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const cleanSearch = () => {
    setSearchTerm('');
    setMeal(null);
    setMeals([]);
    setSelectedCategory('');
  };

  const renderFavoriteButton = (recipe) => {
    if (recipe.isFavorite) {
      return (
        <TouchableOpacity onPress={() => removeFromFavorites(recipe)}>
          <Text style={styles.addToFavorites}>Remove from Favorites</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => addToFavorites(recipe)}>
          <Text style={styles.addToFavorites}>Add to Favorites</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Explorer</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter meal name"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <Button title="Search" onPress={handleSearch} color="#FFA500" />
      </View>
 
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchRandomMeal}>
          <Text style={styles.buttonText}>Random Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCategories}>
          <Text style={styles.buttonText}>{showCategories ? "Hide Categories" : "Show Categories"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={cleanSearch}>
          <Text style={styles.buttonText}>Clean</Text>
        </TouchableOpacity>
      </View>
      {showCategories && (
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.strCategory}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => fetchMealsByCategory(item.strCategory)}
            >
              <View style={styles.categoryItem}>
                <Image style={styles.categoryImage} source={{ uri: `https://www.themealdb.com/images/category/${item.strCategory}.png` }} />
                <Text style={styles.categoryName}>{item.strCategory}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {(meal || meals.length > 0 || mealFB || mealsFB > 0) && (
     <FlatList
     contentContainerStyle={styles.scrollContainer}
     data={(meal ? [meal] : meals).concat(mealFB ? [mealFB] : mealsFB)}
     keyExtractor={(item) => item.idMeal}
     renderItem={({ item }) => (
       <SmallRecipeCard
         item={item}
         addToFavorites={addToFavorites}
         removeFromFavorites={removeFromFavorites}
       />
          /*  <TouchableOpacity onPress={() => fetchMealById(item.idMeal)}>
              <View style={styles.mealContainer}>
                <Text style={styles.mealName}>{item.strMeal}</Text>
                <Image style={styles.mealImage} source={{ uri: item.strMealThumb }} />
                <Text style={styles.instructions}>{item.strInstructions}</Text>
                {renderFavoriteButton(item)}
              </View>
            </TouchableOpacity>*/
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  subtitle: {
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, 
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 5, 
    marginRight: 5, 
    borderRadius: 3, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10, 
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 10, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 14, 
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    width: 400,
    alignItems: 'center',
    backgroundColor: 'red'
  },
  mealContainer: {
    alignItems: 'center',
    marginBottom: 10, 
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  mealImage: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginRight: 10,
  },
  addToFavorites: {
    color: '#FFA500',
    fontWeight: 'bold',
    marginTop: 5,
  },
  
});

  

