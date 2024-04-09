import { View, Text } from 'react-native'
import React from 'react'
import Profileinfo from '../components/Profileinfo'
import { auth } from 'firebase/auth'
import { useAuth, signOut } from '../context/useAuth'
import { getAuth } from 'firebase/auth'
import OwnRecipes from '../components/OwnRecipes'
import ShowRecipes from '../components/ShowRecipes'


export default function Account() {



  return (

    
    <View>
      <Profileinfo/>
      <ShowRecipes/>
    </View>
  )
}