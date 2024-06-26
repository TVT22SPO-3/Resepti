import { collection, deleteDoc, doc, documentId, getDoc, getFirestore, limit, orderBy, where } from "firebase/firestore";
import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../context/useAuth'
import { firestore, query, querySnapshot } from '../firebase/config';
import { useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { convertFireBaseTimeStampToJS } from "../helpers/functions";






async function NewestFB() {
    const data = []
    try {
        console.log("newest", )
        const docRef = query(collection(firestore, "recipes"), orderBy("date", "desc"), limit(5))
        const querySnapshot = await getDocs(docRef)
        
        if (querySnapshot.empty) {
            console.log("no match")
        } else{
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
                console.log("asd", doc.data())
               
                const infoData = {
                    "idMeal": doc.id,
                    "strMealThumb": doc.data().strMealThumb,
                    "strMeal": doc.data().strMeal,               
                }
                 
                console.log("Newest", infoData)
                data.push(infoData)
            })
            console.log("Newest", data)
            return data
        }
        
    } catch (error) {
        console.log("error Newest", error)
    }

}



async function SearchByCategories(category) {
    const data = []
    try {
        console.log("category", category)
        const docRef = query(collection(firestore, "recipes"), where("strCategory", "==", category))
        const querySnapshot = await getDocs(docRef)
        
        if (querySnapshot.empty) {
            console.log("no match")
        } else{
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
                console.log("asd", doc.data())
               
                const infoData = {
                    "idMeal": doc.id,
                    "strMealThumb": doc.data().strMealThumb,
                    "strMeal": doc.data().strMeal,               
                }
                 
                console.log("category", infoData)
                data.push(infoData)
            })
            console.log("category2", data)
            return data
        }
        
    } catch (error) {
        console.log("error SearchByCategories", error)
    }

}





async function SearchByArea(area) {
    const data = []
    try {
        console.log("Area", area)
        const docRef = query(collection(firestore, "recipes"), where("strArea", "==", area))
        const querySnapshot = await getDocs(docRef)
        
        if (querySnapshot.empty) {
            console.log("no match")
        } else{
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
                console.log("asd", doc.data())
               
                const infoData = {
                    "idMeal": doc.id,
                    "strMealThumb": doc.data().strMealThumb,
                    "strMeal": doc.data().strMeal,               
                }
                 
                console.log("Area", infoData)
                data.push(infoData)
            })
            console.log("Area", data)
            return data
        }
        
    } catch (error) {
        console.log("error Area", error)
    }

}






async function SearchByIngredient(ingre) {
    const data = []
    try {
        console.log("ingredient", ingre)
        const docRef = query(collection(firestore, "recipes"), where("strIngredient", "array-contains", ingre))
        const querySnapshot = await getDocs(docRef)
        
        if (querySnapshot.empty) {
            console.log("no match")
        } else{
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
                console.log("asd", doc.data())
               
                const infoData = {
                    "idMeal": doc.id,
                    "strMealThumb": doc.data().strMealThumb,
                    "strMeal": doc.data().strMeal,               
                }
                 
                console.log("info", infoData)
                data.push(infoData)
            })
            console.log("inf2", data)
            return data
        }
        
    } catch (error) {
        console.log("error", error)
    }

}

async function SearchByName(name) {
    const data = []
    try {
        console.log("name", name)
        const docRef = query(collection(firestore, "recipes"), where("strMeal", "==", name))

        const querySnapshot = await getDocs(docRef)
        if (querySnapshot.empty) {
            console.log("no match")
        }else{
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
                const infoData = {
                    "idMeal": doc.id,
                    "strMealThumb": doc.data().strMealThumb,
                    "strMeal": doc.data().strMeal,
                }
                data.push(infoData)
                console.log("inf", infoData)
            })
            console.log("inf", data)
            return data
        }
        
        
    } catch (error) {
        console.log("error", error)
    }

}



async function SearchAllRecipes() {
    
    const data = []
    try {

        const docRef = (collection(firestore, "recipes"))

        const querySnapshot = await getDocs(docRef)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())
             const infoData = {
                "idMeal": doc.id,
                "strMealThumb": doc.data().image,
                "strMeal": doc.data().name,
            }
            data.push(infoData)
            console.log("inf", infoData)
        })
        console.log("inf", infoData)
        return data
        
    } catch (error) {
        console.log("errorSearchAllRecipes", error)
    }

}

async function SearchByDocId(DocId) {
    console.log("SearchByDocId", DocId)
        try {
            const docRef = (doc(firestore, "recipes", DocId))
    
            const querySnapshot = await getDoc(docRef)
            console.log("SearchByDocId 1", querySnapshot.data())
            console.log("name", querySnapshot.data().username)
            const convdate = convertFireBaseTimeStampToJS(querySnapshot.data().date)
            const Data = querySnapshot.data()
            console.log("convdate", convdate)
            Data.date = convdate
            const ingreArray = Data.strIngredient
            const measArray = Data.strMeasure
            console.log("ingra",ingreArray)
            for (let i = 0; i < ingreArray.length; i++) {
                Data[`strIngredient${i + 1}`] = ingreArray[i];
              }
              for (let i = 0; i < measArray.length; i++) {
                Data[`strMeasure${i + 1}`] = measArray[i];
              }
            
            console.log("Data22",Data)
            return Data
    
        } catch (error) {
            console.log("errorSearchbyDocId", error)
        }
    }

async function SearchByDocId2(DocId) {
    console.log("SearchByDocId2", DocId)
        const data = []
        try {
            const docRef = doc(collection(firestore, "recipes"), DocId)
    
            const querySnapshot = await getDoc(docRef)
            console.log("asd", querySnapshot.data())
                
                 const infoData = {
                    "idMeal": querySnapshot.id,
                    "strMealThumb": querySnapshot.data().strMealThumb,
                    "strMeal": querySnapshot.data().strMeal,
                }
                data.push(infoData)
                console.log("searchDocId", infoData)
            
            console.log("SearchDocId", infoData)
            return data
            
    
        } catch (error) {
            console.log("errorSearchbyDocId", error)
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
                "uid": doc.data().uid,
                "strMealThumb": doc.data().strMealThumb,
                "strMeal": doc.data().strMeal,
            }
            data.push(testi)
        })
        return data
    }catch (error) {
        console.log(error)
    }
}


const deleteRecipe = async (docId) => {
    try{
        await deleteDoc(doc(collection(firestore,'recipes'), docId));
        console.log('Document deleted successfully');
    }
    catch (error){
        console.log("Failed to delete Recipe from firestore", error)
    }
}


export { SearchAllRecipes, SearchByDocId, SearchByName, SearchByIngredient, SearchByUid, SearchByCategories, SearchByArea, NewestFB, deleteRecipe, SearchByDocId2}

