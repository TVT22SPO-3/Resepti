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
        console.error("1 error",error);
    }
}

export { fetchMealById }