import { collection, doc, documentId, getDoc, where } from "firebase/firestore";
import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../context/useAuth'
import { firestore, query, querySnapshot } from '../firebase/config';
import { useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { convertFireBaseTimeStampToJS } from "../helpers/functions";

async function SearchByName() {

    try {
        const docRef = (collection(firestore, "recipes"), where("username", "==", username))

        const querySnapshot = await getDocs(docRef)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())

        })

    } catch (error) {
        console.log("error", error)
    }

}



async function SearchAllRecipes() {

    try {
        const docRef = (collection(firestore, "recipes"))

        const querySnapshot = await getDocs(docRef)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())

        })

    } catch (error) {
        console.log("error", error)
    }

}

async function SearchByDocId(DocId) {

    try {
        const docRef = (doc(firestore, "recipes", DocId))

        const querySnapshot = await getDoc(docRef)
        console.log("asd", querySnapshot.data())
       console.log("name", querySnapshot.data().name)
       const Data = {
        "date": convertFireBaseTimeStampToJS(querySnapshot.data().createdAt),
        "username": querySnapshot.data().username,
        "strMealThumb": querySnapshot.data().image,
        "strMeal": querySnapshot.data().name,
        "strInstructions": querySnapshot.data().instructions,
        ...querySnapshot.data().ingredients.reduce((acc, ingredient, index) => {
            acc[`strIngredient${index + 1}`] = ingredient.ingredient;
            acc[`strMeasure${index + 1}`] = ingredient.measure;
            return acc;
        }, {}),
       }
       console.log(Data)
       return Data 
       
    } catch (error) {
        console.log("error", error)
    }
}

async function SearchByUid(uid){
    const data = []
    try{
        const q = query(collection(firestore,'recipes'), where('uid', '==', uid));
        console.log(uid);
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())
            const testi = {
                "idMeal": doc.id,
                "strMealThumb": doc.data().image,
                "strMeal": doc.data().name
            }
            data.push(testi)
        })
        return data
    }catch (error) {
        console.log(error)
    }
}



export { SearchAllRecipes, SearchByDocId, SearchByName, SearchByUid }