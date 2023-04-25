import React, { Component, useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Button,
  Modal,
  FormControl,
  Input,
  Container,
  Stack,
  WarningOutlineIcon,
  Image,
  useToast,
  Alert,
  Collapse,
  IconButton,
  CloseIcon,
  themeTools, setItemStorage, List, Checkbox
} from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, ScrollView, ImageBackground, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const saveUserInfo = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_UserInfo", jsonValue);
  } catch (e) {
    // saving error
  }
};


// extend the theme
export const theme = extendTheme({ config });

export default function Login({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [taiKhoan, setTaiKhoan] = useState(null);
  const [matKhau, setMatKhau] = useState(null);
  const toast = useToast();
  const [show, setShow] = React.useState(false);

  const _handleChangeTaiKhoan = (text) => setTaiKhoan(text);
  const _handleChangeMatKhau = (text) => setMatKhau(text);

  const _dangNhap = async () => {
    console.log("=======================");

    return fetch("https://testsoft.tayninh.gov.vn/api/Users/Authenticate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: taiKhoan,
        PassWord: matKhau,
        type: "account",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("open");
        if (result.code === "1") {
          setShow(true);
        } else {
          saveUserInfo(result);
          console.log(result)
          navigation.navigate("Mytabs");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../component/images/banner.png')}
        style={{ padding: 140, backgroundColor: "#87C8F7" }}
      >
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{ padding: 40, color: "#ffffff" }}>
          <Text style={{ color: "#0554AF", fontSize: 20, fontWeight: "700" }}>Đăng nhập hệ thống</Text>

          <View style={{ marginTop: 30 }}>

            <Text style={{ fontSize: 15 }}>Tài khoản</Text>
            <Input fontSize={14} placeholder="Nhập tên tài khoản"
              variant="underlined"
              onChangeText={_handleChangeTaiKhoan}
              rightElement={<Ionicons
                name='checkmark'
                size={18}
                color='#A6A6A6'
              />} />



            <Text style={{ fontSize: 15, paddingTop: 25 }}>Mật khẩu</Text>
            <Input fontSize={14} placeholder="Nhập mật khẩu"
              type="password"
              variant="underlined"
              onChangeText={_handleChangeMatKhau}
              rightElement={<Ionicons
                name='eye'
                size={18}
                color='#A6A6A6'
              />} />
          </View>
          <View style={styles.forgotPassView}>
            <View style={{ flex: 1, marginLeft: -20 }}>
              <List.Item noBorder style={{ marginLeft: 13 }}>
                {/* <Box>
                  <Checkbox rounded={'full'} checked={true} color="red" />
                  <Text style={{ fontSize: 12, alignSelf: "flex-start", marginTop: -18, marginLeft: 25 }}>Nhớ mật khẩu</Text>
                </Box> */}
              </List.Item>
            </View>
          </View>
          <View style={{
            height: 200,
            justifyContent: 'center',
            alignItems: "center",
          }}>

            <Button rounded={'full'} marginTop="4"
              colorScheme="darkBlue"
              fontSize={16}
              fontWeight={"bold"}
              width={"220"}
              onPress={_dangNhap}>
              Đăng Nhập
            </Button>

            <Box w="100%" alignItems="center" style={{ paddingTop: 9 }}>
              <Collapse isOpen={show}>
                <Alert maxW="400" status="error">
                  <VStack space={1} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        {/* <Alert.Icon /> */}
                        <Text
                          fontSize="md"
                          fontWeight="medium"
                          _dark={{
                            color: "gray",
                          }}
                        >
                          Sai tài khoản hoặc mật khẩu !
                        </Text>
                      </HStack>

                      <IconButton
                        variant="unstyled"
                        _focus={{
                          borderWidth: 0,
                        }}

                        icon={


                          <Ionicons

                            name={"close"}
                          />}
                        _icon={{
                          color: "gray",
                        }}
                        onPress={() => setShow(false)}
                      />
                    </HStack>
                    <Box

                      pl="0"
                      _dark={{
                        _text: {
                          color: "gray",
                        },
                      }}
                    >
                      Tài khoản không có quyền truy cập
                    </Box>
                  </VStack>
                </Alert>
              </Collapse>
            </Box>
            <View style={{ flex: 1 }}>
              <Text style={styles.TextView}>© 2023 Đài Phát thanh và Truyền hình Tây Ninh</Text>

            </View>
          </View>
        </View>
      </View>
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  bottomView: {
    flex: 1.5,
    backgroundColor: "#ffffff",
    height: 505,
    bottom: 45,
    borderTopStartRadius: 55,
    borderTopEndRadius: 55,


  },
  forgotPassView: {
    marginTop: 15,
    flexDirection: "row",
  },
  LoginBtn: {
    alignSelf: "center",
    backgroundColor: "#1D62B4",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",

  },
  TextView: {
    marginTop: 25,
    fontSize: 12,
    color: "grey",
    textAlign: "center",

  }

})