import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, extendTheme } from "react-native";
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Divider, IconButton, ScrollView } from "native-base";
const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
};
const removeUserInfo = async () => {
    try {
        await AsyncStorage.removeItem("@storage_UserInfo");
    } catch (e) {
        // remove error
    }

    console.log("Done.");
};


export default function Profile({ navigation }) {

    const [dataUser, setDataUser] = useState(null);
    useEffect(() => {
        const focusHandler = navigation.addListener("focus", () => {

        });
        return focusHandler;
    }, [navigation]);

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

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const getUserInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@storage_UserInfo");
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
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
                        navigation.navigate("Profile")
                    }}

                />
                <Text style={styles.headerTitle}>Chi tiết thông tin</Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",

                    }}
                >

                </View>
            </View>
            <ScrollView>
            <View backgroundColor="white">
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 20,
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
                </View>
            </View>
        
                <View style={styles.menuWrapper}>
                    {/* <Title style={styles.menuItemText2}>Thông tin cá nhân</Title> */}

                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>
                            Họ và tên
                            <Text> </Text>
                        </Text>
                    </View>

                    <Divider style={{ marginLeft: 20 }} my="2" />
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Số căn cước</Text>
                    </View>

                    <Divider style={{ marginLeft: 20 }} my="2" />
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Ngày sinh</Text>
                    </View>

                    <Divider style={{ marginLeft: 20 }} my="2" />
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Điện thoại</Text>
                    </View>

                    <Divider style={{ marginLeft: 20 }} my="2" />
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Quyền</Text>
                    </View>
                    <Divider style={{ marginLeft: 20 }} my="2" />
                    <Button colorScheme="darkBlue"
                        style={{ borderRadius: 50, width: 150, marginLeft: 112, margin: 20 }} onPress={() =>
                            navigation.navigate("Edit")

                        }
                    >
                        <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
                            <AntDesign name="edit" size={20} color="white" /> Chỉnh sửa
                        </Text>
                    </Button>
                </View>
                </ScrollView>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    userInfoSection: {
        paddingHorizontal: 20,
        marginBottom: 25,
        backgroundColor: "#ffffff",
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
        height: 480
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
        lineHeight: 26,
    },

});