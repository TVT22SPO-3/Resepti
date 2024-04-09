import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../context/useAuth';
import { firestore, query, collection } from '../firebase/config';
import { onSnapshot, orderBy, where } from 'firebase/firestore';


export default function ShowRecipes() {
    const { user } = useAuth()
    const userId = user.uid
    const [recipes, setRecipes] = useState([]);

    useEffect(() =>{
        const q = query(collection(firestore,'recipes'), where('uid', '==', userId), orderBy('created', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot)=>{
            const tempRecipes =[];
            querySnapshot.forEach((doc) => {
                const recipeObject = {
                    id: doc.id,
                    name: doc.data().name,
                    ingredients: doc.data().ingredients,
                    instructions: doc.data().instructions
                    }
                    tempRecipes.push(recipeObject)
                });
            console.log("Fetched Recipes:", tempRecipes);
            setRecipes(tempRecipes)
        });
    return() =>{
        unsubscribe();
    }
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Your Recipes: {userId}
            </Text>
            <View>
                {recipes.map(recipe => (
                    <View key={recipe.id} style={styles.recipe}>
                        <Text style={styles.recipeName}>{recipe.name}</Text>
                        <Text>Ingredients: {recipe.ingredients}</Text>
                        <Text>Instructions: {recipe.instructions}</Text>
                    </View>
                ))}
            </View>
        </View>
      );
    }
/*
    useEffect(()  =>{
        const fetchRecipes = async() =>{
            try{
                const firestore = firebase.firestore();
                const recipesRef = firestore.collection('recipes');
                const snapshot = await recipesRef.where('uid', '==', userId).get();

                const fetchedRecipes = [];

                snapshot.forEach(doc => {
                fetchedRecipes.push({ id: doc.id, ...doc.data() });
                });
                setRecipes(fetchedRecipes);
            }catch (error) {
                console.error('Error fetching recipes: ', error);
              }
        }

        fetchRecipes();
        }, [id])

    

  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Your Recipes: {id}
        </Text>
        <Text style={styles.smallText}>
            {recipes.map(recipes => (
            <li key={recipes.id}>
                <h3>{recipes.name}</h3>
                <p>Ingredients: {recipes.ingredients.join(', ')}</p>
                <p>Instructions: {recipes.instructions}</p>
            </li>
            ))}
        </Text>
    </View>
  )}
  */




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#faebd7',
    },
    text: {
        textAlign: 'left',
        fontSize: 16,
        backgroundColor: '#faebd7',
        marginTop: 24,
        marginLeft: 32,
      },
    recipeName:{
        textAlign: 'left',
        fontSize: 12,
        backgroundColor: '#faebd7',
        marginTop: 5,
        marginLeft: 5,
    },
})