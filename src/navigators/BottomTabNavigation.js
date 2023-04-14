import * as React from 'react'
import { Text, View, Button,Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { Ionicons } from '@expo/vector-icons'; 
import TopTabNavigation from './TopTabNavigation'
import Notification from '../screen/Notification'

import {
    NativeBaseProvider,
    IconButton,
  } from "native-base";

const Tab = createBottomTabNavigator();

function Mytabs() {
    return (
        <Tab.Navigator
            initialRouteName="List"
            // tabBarOptions={{
            //     activeTintColor: "#e91e63"
            // }}
        >
            <Tab.Screen
                name="List"
                component={TopTabNavigation}
                options={{
                    tabBarLabel: "Sản phẩm",
                    tabBarIcon: ({ color, size}) => (
                        <Icon name={"list"} color={color} size={size}/>
                    ),
                    headerShown: false
                }}
            />
             <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarLabel: "Thông báo",
                    tabBarIcon: ({ color, size}) => (
                        <Icon name={"notifications-outline"} color={color} size={size}/>
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

export default function TopTabNavigator() {
    return(
        <NativeBaseProvider>
        <NavigationContainer>
            <Mytabs/>
        </NavigationContainer>
        </NativeBaseProvider>
    )
}