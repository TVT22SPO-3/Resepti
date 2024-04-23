
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Profileinfo from '../components/Profileinfo'
import { auth, reload } from 'firebase/auth'
import { useAuth, signOut } from '../context/useAuth'
import { getAuth } from 'firebase/auth'
import ShowRecipes from '../components/ShowRecipes'
import UserCard from '../components/EditProfile/UserCard'
import UserInformationCard from '../components/EditProfile/UserInformationCard'
import ChangePassword from '../components/EditProfile/ChangePassword'
import ChangeProfilePic from '../components/EditProfile/ChangeProfilePic'
import { RefreshControl, GestureHandlerRootView } from 'react-native-gesture-handler'
import Styles from '../Styles'
import FavoriteRecipes from '../components/FavoriteRecipes'
import { useTheme } from '../context/useTheme'




export default function Account() {

  const {isDarkMode} = useTheme()

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
    <GestureHandlerRootView >
        <FlatList
        style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleReload}/>}
        data={[{ key: 'UserCard' }, { key: 'UserInformationCard' }, { key: 'ChangeProfilePic' }, { key: 'ChangePassword' }, { key: 'ShowRecipes' }, {key: 'FavoriteRecipes'}]}

        renderItem={({ item }) => {
          switch (item.key) {
            case 'UserCard':
              return <UserCard />;
            case 'UserInformationCard':
              return <UserInformationCard />;
            case 'ChangeProfilePic':
              return <ChangeProfilePic />;
            case 'ChangePassword':
              return <ChangePassword />;
            case 'ShowRecipes':
              return <ShowRecipes />;
            case 'FavoriteRecipes': 
              return <FavoriteRecipes />;
            default:
              return null;
          }
        }}
      />
    </GestureHandlerRootView>

      
  )
} 

const styles = StyleSheet.create({
  container:{
    height:'100%',
  },
})