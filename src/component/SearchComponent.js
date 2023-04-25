import React, { useEffect, useState, useMemo } from "react";
import {
  FlatList, Text, Select, CheckIcon, Button, IconButton, Modal, FormControl
} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";



export default function SearchComponent({ onSearchEnter, navigation }) {

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  const openModal = placement => {
    setOpen(true);
    setPlacement(placement);
  };
  const TheLoai = [
    { value: 7, label: "Ghi nhanh" },
    { value: 9, label: "Tin trong tỉnh" },
    { value: 10, label: "Tin trong nước" },
    { value: 18, label: "Tin thế giới" },
    { value: 19, label: "Phóng sự" },
    { value: 22, label: "Hình hiệu" },
    { value: 23, label: "Quay phim" },
    { value: 24, label: "Đoạn dẫn" },
    { value: 25, label: "Chuyên mục" },
    { value: 26, label: "Tin có phát biểu" },
    { value: 27, label: "Bài phản ánh" },
    { value: 28, label: "Phỏng vấn" },
  ];

  const dataChuongTrinh = [
    { value: 101, label: "Phát thanh" },
    { value: 102, label: "Truyền hình" },
  ];
  const [dataList, setDataList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [selectedCT, setSelectedCT] = useState("");
  const [selectedTheLoai, setSelectedTheLoai] = useState("");
  const [selectedChuongTrinh, setSelectedChuongTrinh] = useState([]);
  const page = 20;
  const current = 1;
  const idUser = 20015;

  const _fetchData = async () => {
    return fetch(
      `https://testsoft.tayninh.gov.vn/api/BanTin/GetBanTin?current=${current}&idChuongTrinh=${selectedCT}&idTheLoai=${selectedTheLoai}&pageSize=${page}&Menu=DANGSOAN&tieuDeTin=${searchData}&IDUser=${idUser}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIwMDE1IiwidW5pcXVlX25hbWUiOiJOZ3V54buFbiBWxINuIFZpw6puIiwicm9sZSI6InBob25ndmllbiIsIm5iZiI6MTY4MTIyNTg0MiwiZXhwIjoxNjgxMzk4NjQyLCJpYXQiOjE2ODEyMjU4NDJ9.fPmuOojXmwJqPx2GpzbcWGseNQk1rFsEsLJt1rFXOXk",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setDataList(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const onRefresh = () => {
    _fetchData();
  };

  useEffect(() => {
    _fetchData();
  }, [])

  return (
    <View>
      <View style={styles.searchWrapperStyle}>
        <Icon size={18} name="search" color="white" style={styles.iconStyle} />
        <TextInput
          placeholder="Tìm kiếm..."
          placeholderTextColor="white"
          style={styles.searchInputStyle}
          value={searchData.toString("")}
          onChangeText={(searchData) => {
            setSearchData(searchData);
          }}
          onEndEditing={() => {
            onSearchEnter(searchData);
          }}

        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",

          }}
        >
          <IconButton
            icon={<Icon as={Icon} name="close" size={20} color="white" />}
            borderRadius="50"

            _hover={{
              bg: 'coolGray.800:alpha.20'
            }} _pressed={{
              bg: 'coolGray.800:alpha.20',
            }}
            onPress={() => {
              setSearchData("");
              onSearchEnter("");
            }}

          />

          <IconButton
            icon={<AntDesign name="filter" size={20} color="white" />}
            borderRadius="50"

            _hover={{
              bg: 'coolGray.800:alpha.20'
            }} _pressed={{
              bg: 'coolGray.800:alpha.20',
            }}
            onPress={() => openModal("center")}

          />
          <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
            <Modal.Content maxWidth="350" {...styles[placement]}>
              <Modal.CloseButton />
              <Modal.Header>Tìm kiếm theo danh mục</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <Text fontSize={15} style={{ color: "#0B5181" }} bold>
                    Chương trình: </Text>

                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyleDrop}
                    data={dataChuongTrinh}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Chọn chương trình"
                    value={selectedChuongTrinh}
                    onChange={(item) => {
                      setSelectedChuongTrinh(item.value)

                    }}

                  />

                  <Text fontSize={15} style={{ color: "#0B5181", marginTop: 10 }} bold>
                    Thể loại: </Text>

                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyleDrop}
                    data={TheLoai}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Chọn thể loại"
                    value={selectedTheLoai}
                    onChange={(item) => {
                      setSelectedTheLoai(item.value)

                    }}

                  />
                </FormControl>

              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button variant="solid" colorScheme="red" onPress={() => {
                    setOpen(false);
                  }}>
                    Đóng
                  </Button>
                  <Button colorScheme="darkBlue" 
                  onPress={() => {
                    _fetchData();
                    setOpen(false);
                  }}>
                    Tìm
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    backgroundColor: "#23A7E4",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",


  },
  iconStyle: {
    marginTop: 12,
    marginHorizontal: 9,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    margin: 0,
    color: "white",
  },
  chuongtrinhStyle: {
    paddingHorizontal: 3,
    paddingTop: 2,
    paddingBottom: 7,
    color: "#0B5181",
    fontSize: 14,
    fontWeight: "500"
  },
  theloaiStyle: {
    paddingHorizontal: 15,
    paddingTop: 15,
    color: "#0B5181",
    fontSize: 14,
    fontWeight: "500",


  },
  selectStyle: {
    width: 320,
    paddingTop: 10,
    marginLeft: 20,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: '#ADADAD',
    borderBottomWidth: 0.5,

  },

  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,

  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,

  },
  iconStyleDrop: {
    width: 20,
    height: 20,
  },
  selectedTextStyle: {
    fontSize: 15,

  },

});


