import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, extendTheme } from 'react-native';
import {
    Divider, ScrollView, IconButton
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple
} from 'react-native-paper';
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
// Define the config
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


export default function Profile({ route, navigation }) {
    // const { id } = route.params;
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

    const [dataList, setDataList] = useState([]);
    const [selectedCCCD, setSelectedCCCD] = useState([]);
    const [selectedHoTen, setSelectedHoTen] = useState([]);
    const [selectedQuyen, setselectedQuyen] = useState([]);
    const [selectedSDT, setselectedSDT] = useState([]);
    const [selectedUser, setselectedUser] = useState([]);
    const idUser = 20015;
    const page = 20;
    const current = 1;
    const iD = null;
    // const sdt = null;
    // const hoTen = null;
    // const quyen = null;

    useEffect(() => {
        _fetchProfile();
        _getUser();
    }, [])

    const _fetchProfile = async () => {
        return fetch(
            `https://testsoft.tayninh.gov.vn/api/Users/Authenticate`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIwMDE1IiwidW5pcXVlX25hbWUiOiJOZ3V54buFbiBWxINuIFZpw6puIiwicm9sZSI6InBob25ndmllbiIsIm5iZiI6MTY4MTg5NTY5MiwiZXhwIjoxNjgyMDY4NDkyLCJpYXQiOjE2ODE4OTU2OTJ9.uhDkmCU0ujPdHwDzzAfp-zwege3KdMFOWBOiFktLiXI",
                },
            }
        )


            .then((response) => response.json())
            .then((result) => {
                setDataList(result.data);
                setSelectedCCCD(result.data[0].cmnd);
                setSelectedHoTen(result.data[0].hoTen);
                setselectedQuyen(result.data[0].quyen);
                setselectedSDT(result.data[0].sdt);
                selectedUser(result.data[0].idUser);




            })
            .catch((error) => console.log("error", error));
    };
    const _getUser = async () => {
        return fetch(
            `https://testsoft.tayninh.gov.vn/api/Users/getById`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIwMDE1IiwidW5pcXVlX25hbWUiOiJOZ3V54buFbiBWxINuIFZpw6puIiwicm9sZSI6InBob25ndmllbiIsIm5iZiI6MTY4MTg5NTY5MiwiZXhwIjoxNjgyMDY4NDkyLCJpYXQiOjE2ODE4OTU2OTJ9.uhDkmCU0ujPdHwDzzAfp-zwege3KdMFOWBOiFktLiXI",
                },
            }
        )


            .then((response) => response.json())
            .then((result) => {
                setDataList(result.data);
                setSelectedCCCD(result.data[0].cmnd);
                setSelectedHoTen(result.data[0].hoTen);
                setselectedQuyen(result.data[0].quyen);
                setselectedSDT(result.data[0].sdt);
                selectedUser(result.data[0].idUser);



            })
            .catch((error) => console.log("error", error));
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Thông tin cá nhân</Text>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",

                        }}
                    >
                        <IconButton
                            icon={<Icon as={AntDesign} name="logout" size={25} color="white" />}
                            borderRadius="50"
                            marginLeft={4}
                            _icon={{
                                size: "xl",
                            }}
                            _hover={{
                                bg: 'coolGray.800:alpha.20'
                            }} _pressed={{
                                bg: 'coolGray.800:alpha.20',
                            }}
                            onPress={() => {
                                logout()
                            }}
                        />
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 20, height: 80 }}>
                        <Avatar.Image
                            source={{
                                uri: 'https://ttgsdh.tayninh.gov.vn/uploads/logo_1.png',
                                marginLeft: 50
                            }}
                            size={60}

                        />
                        <View style={{ marginLeft: 18 }}>
                            <Title style={[styles.title, {
                                marginTop: 4,
                                marginBottom: 4,
                            }]}>Đặng Văn A</Title>
                            <Caption style={styles.caption}>@phongvien</Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={19} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>352532523</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={19} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>danga2023@email.com</Text>
                    </View>
                </View>

                {/* <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox, {
              borderRightColor: '#dddddd',
              borderRightWidth: 1
            }]}>
              <Title>₹140.50</Title>
              <Caption>Wallet</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>12</Title>
              <Caption>Orders</Caption>
            </View>
        </View> */}

                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() =>
                        navigation.navigate("DetailProfile")

                    }>
                        <View style={styles.menuItem}>
                            <Ionicons name="person-outline" size={19} color="#FF6347" />
                            <Text style={styles.menuItemText}>Thông tin cá nhân</Text>
                        </View>

                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <Ionicons name="md-lock-closed-outline" size={20} color="#FF6347" />
                            <Text style={styles.menuItemText}>Đổi mật khẩu</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <Ionicons name="card-outline" size={20} color="#FF6347" />
                            <Text style={styles.menuItemText}>Nhuận bút</Text>
                        </View>
                    </TouchableRipple>
                    {/* <TouchableRipple onPress={myCustomShare}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple> */}
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            {/* <Icon name="account-check-outline" color="#FF6347" size={25}/> */}
                            <Ionicons name="md-chatbubble-ellipses-outline" size={20} color="#FF6347" />
                            <Text style={styles.menuItemText}>Hỗ trợ</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <Ionicons name="settings-outline" size={20} color="#FF6347" />
                            {/* <Icon name="settings-outline" color="#FF6347" size={25}/> */}
                            <Text style={styles.menuItemText}>Cài đặt</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {
                        logout()
                    }}>
                        <View style={styles.menuItem}>
                            <MaterialIcons name="logout" size={22} color="#FF6347" />
                            {/* <Icon name="settings-outline" color="#FF6347" size={25}/> */}
                            <Text style={styles.menuItemText}>Đăng xuất</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",

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
        marginLeft: 90,
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
        fontWeight: '400',

    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingVertical: 5,
        textAlign: "center"

    },
    infoBoxWrapper: {
        borderBottomColor: '#FF6347',
        borderBottomWidth: 1,
        borderTopColor: '#FF6347',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,

    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 1,
        backgroundColor: "#ffffff",
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 26,
    },
});
