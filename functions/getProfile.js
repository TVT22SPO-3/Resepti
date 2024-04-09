import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../context/useAuth'
import { doc,firestore,getDoc,query, where, collection, querySnapshot } from '../firebase/config';
import { useState } from 'react';
import { getDocs } from 'firebase/firestore';


const getByUsername = async (username) => {
    
    console.log("getbyusername1", username )
    const profileData = {}
    const docRef = (collection(firestore, "profile"))
    const docSnap = query(docRef, where("username","==", username))
    const querySnapshot = await getDocs(docSnap)
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
        const data = doc.data()
        profileData.id  = doc.id
        profileData.fname  = data.fname
        profileData.lname  = data.lname
        profileData.username  = data.username
        console.log("3", profileData) 
        console.log("4",profileData)  
    })

    console.log("11", profileData)
    return profileData
    
}


export { getByUsername }