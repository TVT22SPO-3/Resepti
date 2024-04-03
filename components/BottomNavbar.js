import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home"
import Signup from "../screens/Signup"
import { NavigationContainer } from "@react-navigation/native"
import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Account from "../screens/Account"
import components from "../components/components"

export default function BottomNavbar() {

    const Tab = createBottomTabNavigator();

    return (
        
            <Tab.Navigator>

                <Tab.Screen name={"Home"}
                    component={Home}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={40} />
                        )
                    }}
                />
                
                <Tab.Screen
                name={"Account"}
                component={Account}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={40} />
                        )
                    }}
                />
                <Tab.Screen
                name={"components"}
                component={components}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="magnify" color={color} size={40} />
                        )
                    }}
                />

            </Tab.Navigator>
    )
}