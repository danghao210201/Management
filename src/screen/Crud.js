import React, { useState } from "react";
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
  Select,
  CheckIcon,
  Entypo,
  TextArea,
  Pressable,
  Icon,
  MaterialIcons,
} from "native-base";
import { Platform, StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function PostPage() {
  const [showModal, setShowModal] = useState(false);
  const [taiKhoan, setTaiKhoan] = useState(null);
  const [matKhau, setMatKhau] = useState(null);
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [service, setService] = React.useState("");

  const _handleChangeTaiKhoan = (text) => setTaiKhoan(text);
  const _handleChangeMatKhau = (text) => setMatKhau(text);

  const _dangNhap = async () => {
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
        if (result.code === "1") {
          setShow(true);
        } else {
        }
      })
      .catch((error) => console.log("error", error));
  };

  const _CreateSanPham = async () => {

    var raw = "";
    return fetch(
      `https://testsoft.tayninh.gov.vn/api/BanTin/CreateBanTin`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIwMDE1IiwidW5pcXVlX25hbWUiOiJOZ3V54buFbiBWxINuIFZpw6puIiwicm9sZSI6InBob25ndmllbiIsIm5iZiI6MTY4MTQzNjAyMSwiZXhwIjoxNjgxNjA4ODIxLCJpYXQiOjE2ODE0MzYwMjF9.-uva2eXbNyoxQwHwdMh3SBqg2kvRXWAjpDEok-wGAEQ",
        },
        body: raw,
        redirect: 'follow'
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setDataList(result.data);
        // setIsCallApi(true);
        // setKetqua(ketqua);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tạo mới sản phẩm</Text>
        {/* <Ionicons name="add-circle-outline" size={25} color="white" /> */}
        <IconButton
          icon={<Icon as={Ionicons} name="add-circle-outline" color="white" />}
          borderRadius="50"
          _icon={{
            size: "xl",
          }}
        />
      </View>
      <Text style={styles.headerTitle}>Thông báo</Text>
      <Box flex="1" backgroundColor="white">
        <Stack space={4} w="100%" mx="auto" marginTop={-25} style={{ padding: 8 }}>
          <Input variant="underlined" fontSize={14} placeholder="Tiêu đề sản phẩm" />

          {/* <Select
          variant="underlined"
          fontSize={14}
          // selectedValue={service}
          minWidth="100"
          accessibilityLabel="VuiLongChon"
          placeholder="Chọn thể loại"
          _selectedItem={{
            bg:"#005DB4",
          }}
          onValueChange={(itemValue) => setService(itemValue)}
        >
           <Select.Item label="Tin phát biểu" value="1" />
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
        </Select> */}

          <Input
            variant="underlined"
            fontSize={14}
            placeholder="Đường dẫn media"
          />
          <TextArea
            h={800}
            variant="underlined"
            fontSize={14.5}
            placeholder="Soạn nội dung..."
          />
        </Stack>
      </Box>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#22A7E4",
    padding: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ffffff",
    // marginLeft: 99,
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
  TitleSeen: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#22A7E4",
    width: 100,
    marginTop: -40,
    marginLeft: 10,
    borderRadius: 50,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#666",
  },
});
