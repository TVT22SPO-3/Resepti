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
import ThemeProvider from './components/ThemeSwitch/ThemeProvider';



const AppRecipe = () => {
  const { user } = useAuth(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      console.log('logged in or out', !!user); 
    });
    return () => unsubscribe();
  }, [auth]);

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


