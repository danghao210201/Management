import {
  FlatList,
  Text,
  Select,
  CheckIcon,
  Button,
  VStack,
  Box,
  HStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, TouchableOpacity, Alert, Image } from "react-native";
import Moment from "moment";
import SearchComponent from '../component/SearchComponent'

export default function List({ navigation }) {
  // First Run
  const [dataList, setDataList] = useState([]);
  const page = 20;
  const current = 1;
  const idUser = 20015;
  const maLinhVuc = null;

  const dataTheLoai = [
    { value: 7, label: "Ghi nhanh" },
    { value: 9, label: "Tin trong tỉnh" },
    { value: 10, label: "Tin trong nước" },
    { value: 18, label: "Tin thế giới" },
    { value: 19, label: "Phóng sự" },
    { value: 22, label: "Hình hiệu" },
    { value: 23, label: "Quay phim" },
    { value: 24, label: "Đoạn dẫn" },
  ];

  const dataChuongTrinh = [
    { value: 101, label: "Phát thanh" },
    { value: 102, label: "Truyền hình" },
  ];

  const LinhVuc = [
    { value: "1", label: "Chăn nuôi" },
    { value: "2", label: "Trồng trọt" },
    { value: "3", label: "Lưu trú" },
    { value: "4", label: "Khách sạn" },
    { value: "5", label: "Kinh tế số" },
    { value: "6", label: "Xuất khẩu" },
    { value: "7", label: "Nước sạch" },
    { value: "8", label: "Thương binh xã hội" },
    { value: "9", label: "Y tế" },
    { value: "10", label: "Văn hóa - Thể thao - Du lịch" },
    { value: "1005", label: "Công an Tây Ninh" },
    { value: "1006", label: "Hội đồng nhân dân" },
    { value: "1007", label: "Sở Nội Vụ" },
    { value: "1008", label: "Lao động - thương binh xã hội" },
    { value: "1011", label: "Kinh tế - Xã hội" },
    { value: "1012", label: "Đảng Cộng sản Việt Nam" },
  ]

  const [searchData, setSearchData] = useState([]);
  const [err, setErr] = useState([]);
  const [selectedCT, setSelectedCT] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCallApi, setIsCallApi] = useState(false);
  const [ketqua, setKetqua] = useState('');

  const _fetchData = async () => {
    return fetch(
      `https://testsoft.tayninh.gov.vn/api/BanTin/GetBanTin?current=${current}&pageSize=${page}&Menu=DANGSOAN&tieuDeTin=${searchData}&IDUser=${idUser}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIwMDE1IiwidW5pcXVlX25hbWUiOiJOZ3V54buFbiBWxINuIFZpw6puIiwicm9sZSI6InBob25ndmllbiIsIm5iZiI6MTY4MTQzNjAyMSwiZXhwIjoxNjgxNjA4ODIxLCJpYXQiOjE2ODE0MzYwMjF9.-uva2eXbNyoxQwHwdMh3SBqg2kvRXWAjpDEok-wGAEQ",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setDataList(result.data);
        setIsCallApi(true);
        setKetqua(ketqua);
      })
      .catch((error) => console.log("error", error));
  };

  const onRefresh = () => {
    _fetchData();
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#22A7E4" />
      <View style={styles.container}>
     
        <View>
          <SearchComponent
            onSearchEnter={(newTerm) => {
              setSearchData(newTerm);
              setErr("");
            }}
          />
        </View>
        
      
        {dataList.length !== 0 && isCallApi ? (
          <FlatList
            backgroundColor="#ffffff"
            data={dataList}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            // renderItem={(renderPosts)}

            renderItem={({ item }) => {
              let maLV = item?.maLinhVuc;
              let mang = maLV.split(',');
              let ketqua = "";

              for (let i = 0; i < mang.length; i++) {
                for (let j = 0; j < LinhVuc.length; j++) {
                  if (mang[i] === LinhVuc[j].value) {
                    if (ketqua !== "") {
                      ketqua += ", ";
                    }
                    ketqua += LinhVuc[j].label;
                    break;
                  }
                }
              }
              return (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Detail", {
                        id: item.id,
                      })
                    }

                  >

                    <Box
                      style={styles.itemWrapperStyle}
                      pl={["0", "0"]}
                      pr={["0", "0"]}
                      py="1"
                      Avatar=""
                    >

                      <HStack marginLeft="13">
                        <VStack>
                          <Text style={styles.itemTitleStyle}>
                            {item.id}: {item.tieuDeTin}
                          </Text>

                          <Text style={styles.itemBodyStyle}>
                            Chương trình:{" "}
                            {dataChuongTrinh.map((i) => {
                              if (i.value === item.idChuongTrinh) return i.label;
                            })}
                          </Text>

                          <Text style={styles.itemBodyStyle}>
                            Thể loại:{" "}
                            {dataTheLoai.map((i) => {
                              if (i.value === item.idTheLoai) return i.label;
                            })}
                          </Text>

                          <Text style={styles.itemBodyStyle}>
                            Lĩnh vực: <Text>
                              {ketqua}
                            </Text>
                          </Text>
                          <Text style={styles.itemBodyStyle}>
                            Ngày tạo: {Moment(item.ngayTao).format("DD/MM/YYYY")}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                
                </>
              )
            }}
            
          />
          
        ) : (
          <Text style={{ color: "red", marginLeft: 110, paddingTop: 10 }}>
            Không tìm thấy bản tin!
          </Text>
        )}
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("Crud", {})
          }
          style={styles.TouchableOpacityStyle} >
          <Image source={require('../component/images/button_png.png')} style={styles.FloatingButtonStyle} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    height: 80,
    width: "100%",
    backgroundColor: "#005DB4",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  input: {
    height: 45,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "#0554AF",
  },
  icon: {
    position: "absolute",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    right: 18,
    color: "white",
    backgroundColor: "#F48225",
    padding: 15,
  },
  itemWrapperStyle: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderColor: "#ccc",
    paddingHorizontal: 16,
  },

  itemTitleStyle: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    paddingTop: 5,
  },
  itemBodyStyle: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
  errStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "red",
  },
  chuongtrinhStyle: {
    paddingHorizontal: 3,
    paddingTop: 2,
    paddingBottom: 7,
    color: "#0B5181",
    fontSize: 13,
    fontWeight: "500",
  },
  theloaiStyle: {
    paddingHorizontal: 15,
    paddingTop: 7,
    color: "#0B5181",
    fontSize: 13,
    fontWeight: "500",
  },
  selectStyle: {
    width: 320,
    paddingTop: 10,
    marginLeft: 20,
  },
  //
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 25,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    marginTop: 10,
    width: 50,
    height: 50,
    marginTop: -40,
    marginLeft: 20
  },

});
