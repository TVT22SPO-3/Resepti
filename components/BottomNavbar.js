import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home"
import Signup from "../screens/Signup"
import { NavigationContainer } from "@react-navigation/native"
import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Account from "../screens/Account"
import components from "../components/components"
import OwnRecipes from "./AddRecipes"
import LogInText from "../text/HomeTextLogIn"
import {Stacknav2, Stacknav3} from "../components/Stacknav2"

export default function BottomNavbar() {

    const Tab = createBottomTabNavigator();

    return (
        
            <Tab.Navigator>

                <Tab.Screen name={"Home"}
                    component={LogInText}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={40} />
                        )
                    }}
                />
                <Tab.Screen
                name={"Search"}
                component={Stacknav2}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="magnify" color={color} size={40} />
                        )
                    }}
                />
                <Tab.Screen
                name={"Add Recipes"}
                component={OwnRecipes}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-thick" color={color} size={40} />
                        )
                    }}
                />
                <Tab.Screen
                name={"Profile"}
                component={Stacknav3}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={40} />
                        )
                    }}
                />
                

            </Tab.Navigator>
    )
}