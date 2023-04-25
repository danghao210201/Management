import { Button, Input, ScrollView,IconButton} from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, StyleSheet, View, } from "react-native";
import {
  Avatar, Text
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import Share from 'react-native-share';
import { Platform } from "react-native";
// import files from '../assets/filesBase64';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};



// extend the theme
// export const theme = extendTheme({ config });

export default function EditProfile({ route, navigation }) {
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    async function getData() {
      const userData = await getUserInfo(); //null || dataObject

      if (userData != null) {
        setDataUser(userData);
      } else if (userData === null) {
        setDataUser(null);
      }
    }
    getData();
  }, []);

  const logout = async () => {
    await removeUserInfo();
    navigation.navigate("Login");
  };

  const getUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_UserInfo");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };



  const [image, setImage] = useState(null);

  const openCamera = async () => {

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.canceled) {

      let path = result.assets[0].uri;
      let filename = '';
      const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path;
      //show 1 cais loading
      // call api upload image

      setImage(result.assets[0].uri);

    }
  };



  return (
   
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
                <IconButton
                    icon={<Icon as={Feather} name="arrow-left" size={27} color="white" />}
                    style={{ marginLeft: -10 }}
                    borderRadius="50"
                    _icon={{
                        size: "xl",
                    }}
                    _hover={{
                        bg: 'coolGray.800:alpha.20'
                    }} _pressed={{
                        bg: 'coolGray.800:alpha.20',
                    }}
                    onPress={() => {
                        navigation.navigate("DetailProfile")
                    }}

                />
                <Text style={styles.headerTitle}>Cập nhật thông tin</Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",

                    }}
                >

                </View>
            </View>
            <ScrollView backgroundColor={"#ffffff"}>
        <View backgroundColor="white">
          <TouchableOpacity
            onPress={openCamera}
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "center",
              display: "flex",
              height: 128,
            }}
          >
            <Avatar.Image
              source={{
                uri: "https://ttgsdh.tayninh.gov.vn/uploads/logo_1.png",
                marginLeft: 50,

              }}
              size={116}
            />
          </TouchableOpacity>

        </View>

        <View style={styles.menuWrapper}>
          {/* <Title style={styles.menuItemText2}>Thông tin cá nhân</Title> */}
          <View style={styles.menuItem}>
            <Text style={{fontWeight:"bold", fontSize:16}}>
              Chức danh:
            </Text>
          </View>
          {/* <Input
            variant="underlined"
            fontSize={14}
            marginLeft="5"
            // placeholder="Nhập họ và tên"
          /> */}

          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>
              Họ và tên
            </Text>
          </View>
          <Input
            variant="underlined"
            fontSize={14}
            marginLeft="5"
            placeholder="Nhập họ và tên"
          />

          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Số căn cước</Text>
          </View>

          <Input
            variant="underlined"
            fontSize={14}
            marginLeft="5"
            placeholder="Nhập số căn cước"
          />

          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Điện thoại</Text>
          </View>

          <Input
            variant="underlined"
            fontSize={14}
            marginLeft="5"
            placeholder="Nhập số điện thoại"
          />
          
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Email</Text>
          </View>

          <Input
            variant="underlined"
            fontSize={14}
            marginLeft="5"
            placeholder="Nhập địa chỉ email"
          />

          <Button colorScheme="darkBlue"
            style={{ borderRadius: 50, margin: 20,width:150, marginLeft:105}}
          >
            <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
              Lưu thông tin
            </Text>
          </Button>
        </View>
        </ScrollView>
      </SafeAreaView>
   
  );

  // }
  // export default ProfileScreen;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#22A7E4",
    padding: 10,
    height: 70,

},
headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ffffff",
    marginRight: 50,
    marginLeft: 30,
},
Title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#22A7E4",
    width: 90,
    marginTop: 10,
    marginLeft: 260,
    borderRadius: 50,
},

  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  caption: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "350",
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
    paddingVertical: 5,
    textAlign: "center",
  },
  infoBoxWrapper: {
    borderBottomColor: "#FF6347",
    borderBottomWidth: 1,
    borderTopColor: "#FF6347",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 1,
    backgroundColor: "#ffffff",

  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,


  },
  menuItemText2: {
    color: "black",
    marginLeft: 20,
    paddingTop: 10,
    height: '8%',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 26,
  },
  menuItemText: {
    color: "black",
    // marginLeft: 1,
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 20,

  },

});
