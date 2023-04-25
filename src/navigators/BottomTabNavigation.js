import React, { useEffect, useState } from "react";
import { Text, View, Button, Platform } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import TopTabNavigation from './TopTabNavigation'
import Notification from '../screen/Notification'
import Profile from '../screen/Profile'
import DetailProfile from '../screen/DetailProfile'
import EditProfile from '../screen/EditProfile';
import Login from "../screen/Login";
import {
  NativeBaseProvider,
  IconButton,
} from "native-base";

const StackScreen = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStackScreen = createNativeStackNavigator();

const getUserInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_UserInfo");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

function ProfileStack() {
  return (
    <ProfileStackScreen.Navigator initialRouteName="Profile">
      <ProfileStackScreen.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />

      <ProfileStackScreen.Screen
        name="DetailProfile"
        component={DetailProfile}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStackScreen.Screen
        name="Edit"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStackScreen.Navigator>
  );
}


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
          tabBarIcon: ({ color, size }) => (
            <Icon name={"list"} color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ color, size }) => (
            <Icon name={"notifications-outline"} color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name={"user"} color={color} size={size} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

export default function TopTabNavigator() {
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

    <NativeBaseProvider>
    <NavigationContainer>
    <StackScreen.Navigator
      initialRouteName={logined === true ? "Mytabs" : "Login"}
    >
      <StackScreen.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <StackScreen.Screen
        name="Mytabs"
        component={Mytabs}
        options={{ headerShown: false }}
      />
    </StackScreen.Navigator>
    </NavigationContainer>
</NativeBaseProvider>
    // <NativeBaseProvider>
    //   <NavigationContainer>
    //     <Mytabs />
    //   </NavigationContainer>
    // </NativeBaseProvider>
  )
}