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
import {Stacknav2, AccountStack, SearchStack, HomeLoggedStack} from "../components/Stacknav2"
import TopBar from "./TopBar/TopBar"
import HomeLogged from "../screens/HomeLogged"
import Styles from "../Styles"
import { useTheme } from "../context/useTheme"
import { Appbar } from "react-native-paper"

export default function BottomNavbar() {
    const {isDarkMode} = useTheme()
    const Tab = createBottomTabNavigator();

    return (
        <>
            <TopBar style={[isDarkMode ? Styles.darkCard : Styles.lightCard]}/>
            <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#FFA500',
                tabBarStyle: {
                    backgroundColor: isDarkMode ? '#3f3f3f' : '#fff',
                    borderTopColor: 'transparent',
                }
            }}
            
            >
                <Tab.Screen name={"Home"}
                    component={HomeLoggedStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={40} />
                        )
                    }}
                />
                <Tab.Screen
                name={"Search"}
                component={SearchStack}
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
                component={AccountStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={40} />
                        )
                    }}
                />
            </Tab.Navigator>
        </>
            
    )
}