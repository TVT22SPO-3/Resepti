import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../context/useAuth'
import { doc,firestore,getDoc,query, where, collection, querySnapshot } from '../firebase/config';
import { useState } from 'react';
import { getDocs } from 'firebase/firestore';




const getProfile = async (id) => {
    
    console.log("getprofile", id )
    const docRef = doc(firestore, "profile", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const profileData = (docSnap.data())
        console.log("2", profileData)
        return profileData
    }

    console.log("2", profileData)

}
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
/*const updateFname = async (id, name) => {

    const nameRef = doc(db, "profiles", id);
    
    await updateDoc(nameRef, {
      fname: name
    });

}
const updateLname = async (id, name) => {

    const nameRef = doc(db, "profiles", id);
    
    await updateDoc(nameRef, {
      fname: name
    });

}
const updateUsername = async (id, name) => {

    const nameRef = doc(db, "profiles", id);
    
    await updateDoc(nameRef, {
      username: name
    });

}
*/

export {getProfile, getByUsername}