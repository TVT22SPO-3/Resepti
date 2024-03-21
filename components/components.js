import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export function MealExplorer() {
  const [meal, setMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

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
      setMeal(data.meals[0]);
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
        <Button title="Random Meal" onPress={fetchRandomMeal} color="#FFA500" />
        <Button title={showCategories ? "Hide Categories" : "Show Categories"} onPress={toggleCategories} color="#FFA500" />
      </View>
      {showCategories && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.subtitle}>All Meal Categories:</Text>
          {categories.map(category => (
            <TouchableOpacity 
              key={category.strCategory} 
              onPress={() => fetchMealsByCategory(category.strCategory)}
            >
              <Text style={styles.category}>{category.strCategory}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {(meal || meals.length > 0) && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {meal && (
            <View style={styles.mealContainer}>
              <Text style={styles.mealName}>{meal.strMeal}</Text>
              <Image style={styles.mealImage} source={{ uri: meal.strMealThumb }} />
              <Text style={styles.instructions}>{meal.strInstructions}</Text>
            </View>
          )}
          {meals.length > 0 && (
            <>
              <Text style={styles.subtitle}>
                Meals in {selectedCategory} Category:
              </Text>
              {meals.map(meal => (
                <View key={meal.idMeal} style={styles.mealContainer}>
                  <Text style={styles.mealName}>{meal.strMeal}</Text>
                  <Image style={styles.mealImage} source={{ uri: meal.strMealThumb }} />
                  <Text style={styles.instructions}>{meal.strInstructions}</Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealContainer: {
    alignItems: 'center',
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
  category: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});