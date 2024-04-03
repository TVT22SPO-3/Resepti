import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, FlatList, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function MealExplorer() {
  const [meal, setMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchById, setSearchById] = useState('');

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchRandomMeal = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
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
      setMeal(data.meals ? data.meals[0] : null);
      setMeals([]);
      setSelectedCategory('');
    } catch (error) {
      console.error(error);
    }
  };

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
    setSearchById('');
    setMeal(null);
    setMeals([]);
    setSelectedCategory('');
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
        <Button title="Search" onPress={fetchMealByName} color="#FFA500" />
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
      {(meal || meals.length > 0) && (
        <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={meal ? [meal] : meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => fetchMealById(item.idMeal)}>
              <View style={styles.mealContainer}>
                <Text style={styles.mealName}>{item.strMeal}</Text>
                <Image style={styles.mealImage} source={{ uri: item.strMealThumb }} />
                <Text style={styles.instructions}>{item.strInstructions}</Text>
              </View>
            </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mealName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
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
});