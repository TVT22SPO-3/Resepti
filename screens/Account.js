import { View, ScrollView, RefreshControl, Text, Button } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { auth } from 'firebase/auth'
import { getAuth, reload } from 'firebase/auth'
import OwnRecipes from '../components/AddRecipes'
import UserCard from '../components/EditProfile/UserCard'
import UserInformationCard from '../components/EditProfile/UserInformationCard'
import ChangePassword from '../components/EditProfile/ChangePassword'
import ChangeProfilePic from '../components/EditProfile/ChangeProfilePic'


export default function Account() {


  const [refreshing, setRefreshing] = useState(false);

  const handleReload = async () => {
    setRefreshing(true);
    const auth = getAuth();

    try {
      await reload(auth.currentUser);
      setRefreshing(false);
    } catch (error) {
      console.error('Error refreshing user:', error.message);
      setRefreshing(false);
    }
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleReload}/>}>
      <UserCard/>
      <UserInformationCard/>
      <ChangeProfilePic />
      <ChangePassword/>
    </ScrollView>
  )
} 