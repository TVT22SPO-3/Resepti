import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();




export default function App() {


  
  return (
<PaperProvider>
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      {/* <Stack.Screen name="Search" component={Search}/> */}
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
    </Stack.Navigator>
  </NavigationContainer>
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


