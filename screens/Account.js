import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { getAuth } from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import UserCard from '../components/EditProfile/UserCard';
import UserInformationCard from '../components/EditProfile/UserInformationCard';
import ChangePassword from '../components/EditProfile/ChangePassword';
import ChangeProfilePic from '../components/EditProfile/ChangeProfilePic';
import ShowRecipes from '../components/ShowRecipes';
import FavoriteRecipes from '../components/FavoriteRecipes'; // Import FavoriteRecipes component
import { useAuth, signOut } from '../context/useAuth';

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
    <GestureHandlerRootView>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleReload} />}
        data={[
          { key: 'UserCard' },
          { key: 'UserInformationCard' },
          { key: 'ChangeProfilePic' },
          { key: 'ChangePassword' },
          { key: 'ShowRecipes' },
          { key: 'FavoriteRecipes' }, 
        ]}
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
  );
}