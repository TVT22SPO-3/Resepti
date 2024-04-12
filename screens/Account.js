import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Profileinfo from '../components/Profileinfo'
import { auth } from 'firebase/auth'
import { useAuth, signOut } from '../context/useAuth'
import { getAuth } from 'firebase/auth'
import OwnRecipes from '../components/OwnRecipes'
import ShowRecipes from '../components/ShowRecipes'
import UserCard from '../components/EditProfile/UserCard'
import UserInformationCard from '../components/EditProfile/UserInformationCard'
import ChangePassword from '../components/EditProfile/ChangePassword'




export default function Account() {



  return (

    
    <ScrollView>
      <View>
        <Profileinfo/>
        <UserCard/>
        <UserInformationCard/>
        <ChangePassword/>
        <ShowRecipes/>
      </View>
    </ScrollView>
  )
} 