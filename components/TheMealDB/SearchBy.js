import React, { useState } from 'react'

const fetchMealById = async (id) => {
    
    console.log("fetchMeal1", id)
    
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json()
       const meal = (data.meals ? data.meals[0] : null)
        console.log(meal)
        return meal
    } catch (error) {
        console.error("FetchMealByID error",error);
    }
}

const fetchRandomMeal = async () => {

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        const data = await response.json()
        const meals = data.meals || [];
        const formattedMeals = meals.map(meal => ({
            "idMeal": meal.idMeal || '',
            "strMeal": meal.strMeal || '',
            "strMealThumb": meal.strMealThumb || ''
        }));
        return formattedMeals;
    } catch (error) {
        console.log("Failed to fetch random meals", error);
        return [];
    }
}

const fetchMealByName = async (name) => {
    console.log("fetchMealByName", name)
    let infoData
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      const data = await response.json();
      if(data.meals && data.meals.length > 0){
         infoData = data.meals.map( meal => ({
            "idMeal": meal.idMeal,
            "strMeal": meal.strMeal,
            "strMealThumb": meal.strMealThumb
          }))
          console.log("infoData", infoData)
      }
      else {
        console.log("no match")
      }
      console.log("meal", infoData)
      return infoData

    } catch (error) {
      console.error("FetchMealByNameError", error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      const categories = data.categories || [];
      const transformedData = categories.map(category => ({
        idCategory: category.idCategory,
        strCategory: category.strCategory,
        strCategoryThumb: category.strCategoryThumb
      }));
        console.log("infoData", transformedData);
        return transformedData;
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


export { fetchMealById, fetchRandomMeal, fetchMealByName, fetchAllCategories, fetchMealsByCategory }