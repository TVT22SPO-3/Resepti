import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import BottomNavbar from './components/BottomNavbar';
import Stacknav from './components/Stacknav';
import { useAuth } from './context/useAuth';
import { auth, onAuthStateChanged } from './firebase/config';
import { useState, useEffect, useContext } from 'react';
import AuthProvider from './context/AuthProvider';
import { AuthContext } from './context/CreateAuthContext';


const AppRecipe = () => {

  const {user} = useAuth()


  console.log("app", user.uid)

  return (

    <NavigationContainer>
      {user.uid ? <BottomNavbar />: <Stacknav />}
    </NavigationContainer>

  )
}


export default function App() {


  return (
    <AuthProvider>
      <AppRecipe />
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


