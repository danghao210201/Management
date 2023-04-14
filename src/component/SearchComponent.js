import React, { useEffect, useState, useMemo } from "react";
import {
  FlatList, Text, Select, CheckIcon, Button
} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";




const SearchComponent = ({ onSearchEnter }) => {
  const [searchData, setSearchData] = useState([]);
  const [selectedCT, setSelectedCT] = useState("");
  const [isShow, setisShow] = useState(true);

 const _fetchData = async () => {
    return fetch(
      `https://testsoft.tayninh.gov.vn/api/BanTin/GetBanTin?current=${current}&idChuongTrinh=${selectedCT}&pageSize=${page}&Menu=DANGSOAN&tieuDeTin=${searchData}&IDUser=${idUser}`,
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
        setIsCallApi(true);
        setKetqua(ketqua);
      })
      .catch((error) => console.log("error", error));
  };

  const onRefresh = () => {
    _fetchData();
  };

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

        <Icon
          size={19}
          name="close"
          color="white"
          style={styles.iconStyle}
          onPress={() => {
            setSearchData("");
            onSearchEnter("");
          }}
        />

        <AntDesign
          onPress={() => {
            setisShow(!isShow);
          }}
          style={styles.iconStyle} name="filter" size={19} color="white" />


      </View>
      {
        isShow ?
          <View backgroundColor="#ffffff" height={100}>
            <Text style={styles.theloaiStyle}>Chương trình</Text>
            <View style={styles.selectStyle}>
              <Select borderRadius={12} minWidth="200" fontSize="14" placeholder="Chọn chương trình" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
                value={selectedCT}
                onChange={(value) => setSelectedCT(value)}
              >
                <Select.Item label="Phát thanh" value="101"
                />
                <Select.Item label="Truyền hình" value="102" />

              </Select>
            </View>

            {/* <View style={styles.selectStyle}>
              <Text style={styles.chuongtrinhStyle}>Thể loại</Text>

              <Select borderRadius={12} fontSize="14" minWidth="200" accessibilityLabel="Choose Service" placeholder="Chọn thể loại" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}>
                <Select.Item label="Tin không có phát biểu" value="2" />
                <Select.Item label="Tin khai thác lại từ tư liệu có sẵn" value="5" />
                <Select.Item label="Tin khai thác từ văn bản(tuyên truyền chính sách mới) sử dụng chung cho truyền hình" value="6" />
                <Select.Item label="Ghi nhanh, ghi nhận người tốt việc tốt" value="7" />
                <Select.Item label="Bài phản ánh" value="8" />
                <Select.Item label="Trong tỉnh" value="9" />
                <Select.Item label="Ngoài tỉnh" value="10" />
                <Select.Item label="Tin có dẫn hiện trường(Phòng chuyên môn phải có sự thống nhất trước với người có thẩm quyền tại hiện trường)" value="11" />
                <Select.Item label="Tin có hình ảnh mới, âm thanh hiện trường và phỏng vấn " value="12" />
                <Select.Item label="Tin có hình ảnh mới, không có phỏng vấn" value="13" />
                <Select.Item label="Chùm tin (Tổng hợp từ các tin có nội dung tương tự như khai giảng, thăm lực lượng vũ trang,...)" value="12" />
              </Select>

            </View> */}

          </View>
          : null
      }

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




  }
});

export default SearchComponent;
