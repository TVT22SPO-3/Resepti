import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import ThemeProvider from './components/ThemeProvider';



const AppRecipe = () => {
  const { user } = useAuth(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user?.uid); 
    console.log('logged in or out', isLoggedIn);
  }, [user]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomNavbar /> 
      ) : (
        <Stacknav />
      )}
    </NavigationContainer>
  );
};



export default function App() {

  return (
    <PaperProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppRecipe />
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
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


