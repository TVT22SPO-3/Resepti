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
import FavoriteRecipes from '../components/FavoriteRecipes';
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
      <ShowRecipes/>
    </ScrollView>

  )
} 