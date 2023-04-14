import React, { useEffect, useState } from "react";
import { StatusBar, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import List from '../screen/List'
import History from '../screen/History'
import DetailList from '../screen/DetailList'
import Crud from '../screen/Crud'


function ListTop() {
  return (
    <ListStackScreen.Navigator initialRouteName="List">
      <ListStackScreen.Screen
        name="List"
        component={List}
        options={{
          headerShown: false,
          headerTitle: "Bản tin đang soạn",
          headerTitleAlign: "center",
          headerTintColor: "white",

          headerStyle: {
            backgroundColor: "#22A7E4",
          },
        }}
      />
      <ListStackScreen.Screen
        name="Detail"
        component={DetailList}
        options={{
          headerTitle: "Chi tiết bản tin",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#22A7E4",
          },
        }}
      />
      <ListStackScreen.Screen
        name="Crud"
        component={Crud}
        options={{
          headerShown: false,
          headerTitle: "Tạo mới sản phẩm",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#22A7E4",
          },
        }}
      />
    </ListStackScreen.Navigator>
  );
}


function HistoryTop() {
  return (
    <History />
  );
}


const Tab = createMaterialTopTabNavigator();
const ListStackScreen = createNativeStackNavigator();


function Mytabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="ListTop"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, color: '#ffffff', fontWeight: 600 },
        tabBarPressColor: { color: "blue" },
        tabBarStyle: { backgroundColor: '#DD581B', },

      }}

    // style: { backgroundColor: "white", marginTop: insets.top },

    >
      <Tab.Screen
        name="ListTop"
        component={ListTop}
        options={{
          tabBarLabel: "Tin đang soạn",

        }}

      />

      <Tab.Screen
        name="HistoryTop"
        component={HistoryTop}
        options={{ tabBarLabel: "Tin đã gửi" }}
      />
    </Tab.Navigator>
  );
}

export default function TopBarNavigator() {
  return <Mytabs />

}

