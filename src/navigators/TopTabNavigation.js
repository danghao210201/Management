import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
} from "native-base";
import { StatusBar, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import List from '../screen/List'
import History from '../screen/History'
import DetailList from '../screen/DetailList'
import DetailHistory from "../screen/DetailHistory";
import Create from '../screen/Create'
import Edit from "../screen/EditList";
import Login from "../screen/Login";

const StackScreen = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const ListStackScreen = createNativeStackNavigator();

const getUserInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_UserInfo");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

// function Login() {
//   return (
//     <Login />
//   );
// }


function ListTop() {
  return (
    <ListStackScreen.Navigator initialRouteName="List">
      <ListStackScreen.Screen
        name="List"
        component={List}
        options={{
          headerShown: false,
        }}
      />
      <ListStackScreen.Screen
        name="Detail"
        component={DetailList}
        options={{
          headerShown: false,
        }}
      />
      <ListStackScreen.Screen
        name="Edit"
        component={Edit}
        options={{
          headerShown: false,
        }}
      />
      <ListStackScreen.Screen
        name="Create"
        component={Create}
        options={{
          headerShown: false,
        }}
      />
    </ListStackScreen.Navigator>

  );
}
function HistoryTop() {
  return (
    <ListStackScreen.Navigator initialRouteName="List">
    <ListStackScreen.Screen
      name="History"
      component={History}
      options={{
        headerShown: false,
      }}
    />
    <ListStackScreen.Screen
      name="DetailHistory"
      component={DetailHistory}
      options={{
        headerShown: false,
      }}
    />
  </ListStackScreen.Navigator>
  );
}

function Mytabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="ListTop"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, color: '#ffffff', fontWeight: 600 },
        tabBarPressColor: { color: "blue" },
        tabBarStyle: { backgroundColor: '#DD581B'},

      }}

    // style: { backgroundColor: "white", marginTop: insets.top },

    >
      <Tab.Screen
        name="ListTop"
        component={ListTop}
        options={{
          tabBarLabel: "Tin đang soạn",
          tabBarStyle: { backgroundColor: '#DD581B'},
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
  const [logined, setLogined] = useState(null);
  useEffect(() => {
    // Nếu như kiẻm tra AsyncStorage  mà có key @storage_UserInfo thì render màn hình danh sách tin bài
    async function getData() {
      const userData = await getUserInfo(); //null || dataObject
      if (userData != null) {
        setLogined(true);
      }
      // Nếu kiểm tra AsyncStorage mà không có dữ liệu thì render màn hinh đăng nhập
      else if (userData === null) {
        //  render màn hình đăng nhập
        setLogined(false);
      }
    }

    getData();
  }, []);
  return (
   
      <Mytabs />

  );
}

