import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signup from "../screens/Signup"
import Login from "../screens/Login"
import Home from "../screens/Home"


export default function Stacknav({initialRoute}) {


    const Stack = createNativeStackNavigator();


  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
    </Stack.Navigator>
  )
}