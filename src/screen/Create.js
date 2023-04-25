import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Toast } from 'native-base';
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
  Icon, Menu
} from "native-base";
import { Platform, StyleSheet, View, SafeAreaView, FlatList, TextInput } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { TouchableOpacity } from "react-native-gesture-handler";
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function PostPage({ route, navigation }) {
  const { id } = route.params;
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

  const dataNguoiThucHien = [
    { label: "Lê Nguyễn Như Ái - Biên dịch", value: "20020" },
    { label: "Nguyễn Việt Anh - Phát thanh viên", value: "20021", key: 20021 },
    { label: "Lê Thị Ngự Bình - Phát thanh viên", value: "20026", key: 20026 },
    { label: "Nguyễn Hải Đăng - Phát thanh viên", value: "20031", key: 20031 },
    { label: "Nguyễn Tấn Đạt - Biên dịch", value: "20032", key: 20032 },
    { label: "Trần Hoài Dũng - Biên dịch", value: "20038", key: 20038 },
    { label: "Mai Quang Hiền - Phó Trưởng phòng Chuyên đề khoa giáo", value: "20049", key: 20049 },
    { label: "Nguyễn Thị Phú Khánh - Phát thanh viên", value: "20057", key: 20057 },
    { label: "Nguyễn Lữ Minh Lam - Phát thanh viên", value: "20061", key: 20061 },
    { label: "Nách Chan Nên - Biên dịch", value: "20071", key: 20071 },
    { label: "Bùi Lê Nguyên - Phát thanh viên", value: "20076", key: 20076 },
    { label: "Thạch Thị Nhơne - Biên dịch", value: "20084", key: 20084 },
    { label: "Đào Thị Thu Thảo - Biên dịch", value: "20101", key: 20101 },
    { label: "Nguyễn Thị Thanh Thảo - Phó Trưởng phòng Chuyên đề khoa giáo", value: "20105", key: 20105 },
    { label: "Trần Lê Như Thảo - Phát thanh viên", value: "20107", key: 20107 },
    { label: "Nguyễn Thị Ngọc Thật - Phát thanh viên", value: "20108", key: 20108 },
    { label: "Kim Thay - Biên dịch", value: "20109", key: 20109 },
    { label: "Nguyễn Mạnh Tiếng - Phát thanh viên", value: "20112", key: 20112 },
    { label: "Nguyễn Thị Kiều Tiên - Phát thanh viên", value: "20114", key: 20114 },
    { label: "Nguyễn Văn Viên - Phóng viên", value: "20015", key: 20015 },
    { label: "Nguyễn Thị Mỹ Trang - Chuyên viên", value: "20116", key: 20116 },
    { label: "Lê Thị Cẩm Tú - Phát thanh viên", value: "20122", key: 20122 },
    { label: "Nguyễn Tuyết Vân - Chuyên viên", value: "20125", key: 20125 },
    { label: "Cộng tác viên", value: "3009", key: 3009 },
    { label: "Admin - Chuyên viên", value: "1", key: 1 },
    { label: "Phạm Hoàng Ân - Kỹ thuật viên", value: "20022", key: 20022 },
    { label: "Đặng Long Biển - Kỹ thuật viên", value: "20024", key: 20024 },
    { label: "Trần Tú Bình - Kỹ thuật viên", value: "20027", key: 20027 },
    { label: "Hồ Minh Châu - Kỹ thuật viên", value: "20028", key: 20028 },
    { label: "Nguyễn Thị Kim Chi - Kỹ thuật viên", value: "20029", key: 20029 },
    { label: "Trần Quang Điện - Kỹ thuật viên", value: "20033", key: 20033 },
    { label: "Đặng Hồng Điệp - Kỹ thuật viên", value: "20034", key: 20034 },
    { label: "Nguyễn Hoàng Duy - Kỹ thuật viên", value: "20041", key: 20041 },
    { label: "Lâm Châu Bảo Hân - Kỹ thuật viên", value: "20045", key: 20045 },
    { label: "Đỗ Văn Hiền - Kỹ thuật viên", value: "20048", key: 20048 },
    { label: "Huỳnh Lê Trung Hiếu - Kỹ thuật viên", value: "20050", key: 20050 },
    { label: "Đào Thị Như Hòa - Kỹ thuật viên", value: "20051", key: 20051 },
    { label: "Trần Bảo Hoàng - Kỹ thuật viên", value: "20052", key: 20052 },
    { label: "Nguyễn Hoàng Huân - Kỹ thuật viên", value: "20053", key: 20053 },
    { label: "Lâm Minh Hưng - Kỹ thuật viên", value: "20054", key: 20054 },
    { label: "Kiều Tấn Anh Kiệt - Kỹ thuật viên", value: "20059", key: 20059 },
    { label: "Vũ Thành Luân - Kỹ thuật viên", value: "20064", key: 20064 },
    { label: "Nguyễn Ngọc Minh - Kỹ thuật viên", value: "20066", key: 20066 },
    { label: "Vương Bá Nguyên - Kỹ thuật viên", value: "20078", key: 20078 },
    { label: "Dương Văn Nhân - Kỹ thuật viên", value: "20081", key: 20081 },
    { label: "Trần Vũ Yến Nhi - Kỹ thuật viên", value: "20082", key: 20082 },
    { label: "Trần Cao Phong - Kỹ thuật viên", value: "20085", key: 20085 },
    { label: "Trần Minh Phụng - Kỹ thuật viên", value: "20086", key: 20086 },
    { label: "Huỳnh Kiều Phương - Kỹ thuật viên", value: "20088", key: 20088 },
    { label: "Ngô Hồng Quân - Kỹ thuật viên", value: "20092", key: 20092 },
    { label: "Lâm Đức Thanh - Kỹ thuật viên", value: "20099", key: 20099 },
    { label: "Trần Hồng Thạnh - Kỹ thuật viên", value: "20100", key: 20100 },
    { label: "Mai Xuân Thủy - Trưởng phòng KT-SXCT", value: "20111", key: 20111 },
    { label: "Nguyễn Minh Tiến - Kỹ thuật viên", value: "20113", key: 20113 },
    { label: "Phạm Văn Tình - Kỹ thuật viên", value: "20115", key: 20115 },
    { label: "Phan Thị Thùy Trang - Kỹ thuật viên", value: "20117", key: 20117 },
    { label: "Nguyễn Thị Tú Trinh - Kỹ thuật viên", value: "20120", key: 20120 },
    { label: "Đoàn Thị Tươi - Kỹ thuật viên", value: "20123", key: 20123 },
    { label: "Nguyễn Thanh Vũ - Kỹ thuật viên", value: "20127", key: 20127 },
    { label: "Trần Thành Vũ - Kỹ thuật viên", value: "20129", key: 20129 },
    { label: "Nguyễn Bình Yên - Kỹ thuật viên", value: "20132", key: 20132 },
    { label: "Phan Thanh Á - Chuyên viên", value: "20023", key: 20023 },
    { label: "Trần Phù Du - Chuyên viên", value: "20039", key: 20039 },
    { label: "Nguyễn Thị Trúc Linh - Chuyên viên", value: "20062", key: 20062 },
    { label: "Nguyễn Thị Ngân - Chuyên viên", value: "20072", key: 20072 },
    { label: "Phạm Công Nguyên - Chuyên viên", value: "20077", key: 20077 },
    { label: "Nguyễn Thị Nam Phương - Kế toán trưởng", value: "20089", key: 20089 },
    { label: "Trần Thị Bích Phượng - Kế toán viên", value: "20090", key: 20090 },
    { label: "Võ Hữu Quang - Tài xế", value: "20091", key: 20091 },
    { label: "Lê Bá Thành - Phó Trưởng phòng TCHC", value: "20098", key: 20098 },
    { label: "Lâm Thạch Thảo - Chuyên viên", value: "20102", key: 20102 },
    { label: "Lê Thị Hồng Ký - Thư ký biên tập", value: "20016", key: 20016 },
    { label: "Nguyễn Hoàng Lãnh Đạo - Trưởng phòng Thời sự", value: "20017", key: 20017 },
    { label: "Đỗ Thanh Bình - Thư ký biên tập", value: "20025", key: 20025 },
    { label: "Hồ Sỹ Công - Phóng viên", value: "20030", key: 20030 },
    { label: "Bùi Công Điều - Phóng viên", value: "20035", key: 20035 },
    { label: "Lê Vũ Đông - Quay phim", value: "20036", key: 20036 },
    { label: "Bùi Văn Dũng - Quay phim", value: "20037", key: 20037 },
    { label: "Hà Ngọc Duy Hiển - Quay phim", value: "20040", key: 20040 },
    { label: "Dương Nguyễn Vũ Hải - Trưởng phòng Thời sự", value: "20042", key: 20042 },
    { label: "Lê Văn Hà - Phóng viên", value: "20044", key: 20044 },
    { label: "Đinh Thị Hậu - Phóng viên", value: "20047", key: 20047 },
    { label: "Nguyễn Dân Hùng - Phóng viên", value: "20055", key: 20055 },
    { label: "Triệu Quang Khải - Phóng viên", value: "20056", key: 20056 },
    { label: "Vũ Việt Khoa - Phóng viên", value: "20058", key: 20058 },
    { label: "Mai Nhật Phương Lâm - Quay phim", value: "20060", key: 20060 },
    { label: "Phan Công Luận - Phóng viên", value: "20063", key: 20063 },
    { label: "Ngô Thị Hồng Minh - Phóng viên", value: "20067", key: 20067 },
    { label: "Dương Mỹ Tuyền - Thư ký biên tập", value: "20068", key: 20068 },
    { label: "Bùi Hoàng Nam - Chuyên viên", value: "20069", key: 20069 },
    { label: "Nguyễn Cẩm Nam - Phó phòng Thời sự", value: "20070", key: 20070 },
    { label: "Huỳnh Tấn Nghĩa - Quay phim", value: "20073", key: 20073 },
    { label: "Vương Ngọc Nghĩa - Phó phòng Thời sự", value: "20074", key: 20074 },
    { label: "Nguyễn Thị Yến Ngọc - Phóng viên", value: "20075", key: 20075 },
    { label: "Hồ Minh Nguyệt - Phó Trưởng phòng Thời sự", value: "20079", key: 20079 },
    { label: "Nguyễn Thị Phương Nguyệt - Phóng viên", value: "20080", key: 20080 },
    { label: "Lê Thị Việt Nho - Phóng viên", value: "20083", key: 20083 },
    { label: "Phan Thanh Quân - Phóng viên", value: "20093", key: 20093 },
    { label: "Lưu Thị Thanh Thảo - Phóng viên", value: "20103", key: 20103 },
    { label: "Nguyễn Hoàng Phương Thảo - Phóng viên", value: "20104", key: 20104 },
    { label: "Nguyễn Thị Minh Thư - Thư ký biên tập", value: "20110", key: 20110 },
    { label: "Lâm Hữu Tri - Phóng viên", value: "20118", key: 20118 },
    { label: "Lâm Sơn Vương - Thư ký biên tập", value: "20128", key: 20128 },
    { label: "Trần Thị Xuân Vũ - Phóng viên", value: "20130", key: 20130 },
    { label: "Võ Nguyên Vũ - Phóng viên", value: "20131", key: 20131 },
    { label: "Vũ Đức Hải - Trưởng phòng Văn nghệ giải trí", value: "20043", key: 20043 },
    { label: "Vương Thị Trà Lý - Chuyên viên", value: "20065", key: 20065 },
    { label: "Đỗ Thành Phương - Chuyên viên", value: "20087", key: 20087 },
    { label: "Nguyễn Hoàng Sơn - Chuyên viên", value: "20097", key: 20097 },
    { label: "Phạm Văn Thảo - Đạo diễn", value: "20106", key: 20106 },
    { label: "Bùi Công Trinh - Chuyên viên", value: "20119", key: 20119 },
    { label: "Trần Minh Hảo - Chuyên viên", value: "20046", key: 20046 },
    { label: "Nguyễn Thị Thùy Quyên - Chuyên viên", value: "20094", key: 20094 },
    { label: "Lê Văn Sĩ - Phó phòng DVQC", value: "20096", key: 20096 },
    { label: "Đặng Thị Cẩm Tú - Chuyên viên", value: "20121", key: 20121 },
    { label: "Lê Kim Tuyền - Chuyên viên", value: "20124", key: 20124 },
    { label: "Võ Văn Quý - Phó Giám đốc", value: "20095", key: 20095 },
    { label: "Vũ Xuân Trường - Giám đốc", value: "20126", key: 20126 },
  ]
  const richText = useRef();
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };
  const [TieuDe, setTieuDeTin] = useState('');
  const [NoiDung, setNoiDungTin] = useState('');
  const [trangThai, settrangThai] = useState('');
  const [chuongTrinh, setchuongTrinh] = useState('');
  const [tacGia, settacGia] = useState('');
  const [theLoai, settheLoai] = useState('');
  const [maLV, setmaLV] = useState('');
  const [quayPhim, setquayPhim] = useState('');
  const [DuongDan, setDuongDan] = useState('');
  const [FileUp, setfileUpload] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState("auto");
  const [createData, setcreateData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const page = 20;
  const current = 1;
  const idUser = 20015;

  const onRefresh = () => {
    _fetchData();
  };

  useEffect(() => {
    _fetchData();
  }, [])

  const _fetchData = async () => {
    return fetch(
      `https://testsoft.tayninh.gov.vn/api/BanTin/GetBanTin?current=${current}&pageSize=${page}&Menu=DANGSOAN&IDUser=${idUser}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIwMDE1IiwidW5pcXVlX25hbWUiOiJOZ3V54buFbiBWxINuIFZpw6puIiwicm9sZSI6InBob25ndmllbiIsIm5iZiI6MTY4MjI2MDgwNCwiZXhwIjoxNjgyNDMzNjA0LCJpYXQiOjE2ODIyNjA4MDR9.EUpAl2aCT8J_2wtyQxxCXMPtYlhNVrYCT9SisRl0Y_Q",
        },
      }
    )


      .then((response) => response.json())
      .then((result) => {
        setDataList(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const _CreateData = async () => {
    console.log("=========run")
    const raw = JSON.stringify({
      IDNguoiTao: 20015,
      IDUser: 20015,
      NoiDungTin: NoiDung,
      TrangThai: "TGKHOITAO",
      duongDan: DuongDan,
      fileUpload: FileUp,
      idChuongTrinh: chuongTrinh,
      idNguoiXuLy: 20015,
      idTacGia: tacGia.toString(), 
      idTheLoai: theLoai,
      maLinhVuc: maLV.toString(),
      quayPhim: quayPhim.toString(),
      tieuDeTin: TieuDe
    });
    console.log(raw)
    return fetch(
      `https://testsoft.tayninh.gov.vn/api/BanTin/CreateBanTin`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIwMDE1IiwidW5pcXVlX25hbWUiOiJOZ3V54buFbiBWxINuIFZpw6puIiwicm9sZSI6InBob25ndmllbiIsIm5iZiI6MTY4MjI2MDgwNCwiZXhwIjoxNjgyNDMzNjA0LCJpYXQiOjE2ODIyNjA4MDR9.EUpAl2aCT8J_2wtyQxxCXMPtYlhNVrYCT9SisRl0Y_Q",
        },
        body: raw
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setDataList(result.data);
        console.log(result);
        if (result.success) {
          setDataList(result.data);
          Toast.show({
            color: "#ffffff",
            backgroundColor: "#0B5181",
            fontWeight: "800",
            description: 'Thêm sản phẩm thành công!',
            marginBottom: "10"
          });
        } else {
          Toast.show({
            color: "#ffffff",
            backgroundColor: "#FF0000",
            fontWeight: "800",
            description: 'Thêm sản phẩm không thành công!',
            marginBottom: "10"
          });
        }



      })
      .catch((error) => console.log("error", error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={<Icon as={AntDesign} name="arrowleft" size={7} color="white" />}
          style={{ marginLeft: -13 }}
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
            navigation.navigate("List")
          }}

        />
        <Text style={styles.headerTitle}>Tạo mới sản phẩm</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Menu w="160" shouldOverlapWithTrigger={shouldOverlapWithTrigger}
            placement={position == "auto" ? undefined : position} trigger={triggerProps => {
              return <IconButton icon={<Icon as={AntDesign} name="addfile" size={5} color="white" />}
                borderRadius="50"
                _icon={{
                  size: "xl",
                }}
                _hover={{
                  bg: 'coolGray.800:alpha.20'
                }} _pressed={{
                  bg: 'coolGray.800:alpha.20',
                }} {...triggerProps}>
              </IconButton>;
            }}>
            <Menu.Item>Đính kèm tệp</Menu.Item>
          </Menu>

          <IconButton
            icon={<Icon as={Ionicons} name="add-circle-outline" size={6} color="white" />}
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
              _CreateData();
              navigation.navigate('List');
            }}
          />
        </View>
      </View>

      <ScrollView>
        <Box marginTop={2} marginLeft={1} width="100%" height="100%">
          <VStack width="350">
            <Text fontSize={16} bold>
              <Text color="red.500">*</Text> Tiêu đề tin:
            </Text>
            <TextArea
              h={60}
              mb="3"
              w="100%"
              fontSize="15"
              marginLeft="2"
              variant="underlined"
              placeholder="Nhập tiêu đề tin..."
              style={{ marginLeft: 5 }}
              // defaultValue={dataList[0].tieuDeTin}
              value={TieuDe}
              onChangeText={setTieuDeTin}

            />
            <Text fontSize={16} bold>
              <Text color="red.500">*</Text> Chương trình:
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={dataChuongTrinh}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Chọn chương trình"
              value={chuongTrinh}
              onChange={(item) => {
                setchuongTrinh(item.value)

              }}

            />
            <Text fontSize={16} bold marginTop={3}>
              <Text color="red.500">*</Text> Thể loại:
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={dataTheLoai}
              search
              searchPlaceholder="Tìm kiếm..."
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Chọn thể loại"
              value={theLoai}
              onChange={(item) => {
                settheLoai(item.value)

              }}
            />

            <Text fontSize={16} bold marginTop={3}>
              <Text color="red.500">*</Text> Lĩnh vực:
            </Text>
            <MultiSelect
              style={styles.dropdownLV}
              placeholderStyle={styles.placeholderStyleLV}
              selectedTextStyle={styles.selectedTextStyleLV}
              inputSearchStyle={styles.inputSearchStyleLV}
              iconStyle={styles.iconStyleLV}
              search
              data={LinhVuc}
              labelField="label"
              valueField="value"
              placeholder="Chọn lĩnh vực"
              searchPlaceholder="Tìm kiếm..."
              value={maLV}
              onChange={(item) => {
                setmaLV(item);
                setcreateData({ ...createData, maLinhVuc: item });

              }}
              selectedStyle={styles.selectedStyleLV}
            />


            <Text fontSize={16} marginLeft={3} marginTop={3} bold>
              Người thực hiện:
            </Text>
            <MultiSelect
              style={styles.dropdownLV}
              placeholderStyle={styles.placeholderStyleLV}
              selectedTextStyle={styles.selectedTextStyleLV}
              inputSearchStyle={styles.inputSearchStyleLV}
              iconStyle={styles.iconStyleLV}
              search
              data={dataNguoiThucHien}
              labelField="label"
              valueField="value"
              placeholder="Chọn người thực hiện"
              searchPlaceholder="Tìm kiếm..."
              value={tacGia}
              onChange={(item) => {
                settacGia(item)
                setcreateData({ ...createData, idTacGia: item });

              }}
              selectedStyle={styles.selectedStyleLV}
            />

            <Text fontSize={16} marginLeft={3} bold marginTop={3}>
              Quay phim:
            </Text>
            <MultiSelect
              style={styles.dropdownLV}
              placeholderStyle={styles.placeholderStyleLV}
              selectedTextStyle={styles.selectedTextStyleLV}
              inputSearchStyle={styles.inputSearchStyleLV}
              iconStyle={styles.iconStyleLV}
              search
              data={dataNguoiThucHien}
              labelField="label"
              valueField="value"
              placeholder="Chọn quay phim"
              searchPlaceholder="Tìm kiếm..."
              value={quayPhim}
              onChange={(item) => {
                setquayPhim(item)
                setcreateData({ ...createData, quayPhim: item });
              }}
              selectedStyle={styles.selectedStyleLV}
            />
            <Text fontSize={16} marginLeft={2} marginTop={3} bold>
              {" "}
              Đường dẫn media:
            </Text>

            <Input
              mb="3"
              w="100%"
              // mt={0}
              fontSize="15"
              marginLeft="2"
              variant="underlined"
              placeholder="Nhập đường dẫn..."
              style={{ marginLeft: 5 }}
              value={DuongDan} onChangeText={setDuongDan}

            />

            <Text fontSize={16} marginLeft={2} marginTop={1} bold>
              <Text color="red.500"></Text> Tệp đính kèm:
            </Text>
            <TextArea
              h={50}
              mb="3"
              w="100%"
              // mt={0}
              fontSize="15"
              marginLeft="2"
              variant="underlined"
              placeholder="Tệp đính kèm.."
              style={{ marginLeft: 5 }}
              value={FileUp}
              onChangeText={setfileUpload}
            />


            <Text fontSize={16} marginLeft={4} bold marginTop={1}>
              Nội dung tin:
            </Text>
            <TextArea
              h={60}
              mb="3"
              w="100%"
              fontSize="15"
              marginLeft="2"
              variant="underlined"
              placeholder="Nhập tiêu đề tin..."
              style={{ marginLeft: 5 }}
              value={NoiDung}
              onChangeText={setNoiDungTin}

            />
            {/* <View style={styles.richTextContainer}>
              <RichEditor
                ref={richText}
                onChange={richTextHandle}
                placeholder="Nhập nội dung..."
                androidHardwareAccelerationDisabled={true}
                style={styles.richTextEditorStyle}
                initialHeight={250}
                renderItem={({ item }) => (
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: dataList[0].noiDungTin }}
                  />
                )}
              />

              <RichToolbar
                editor={richText}
                selectedIconTint="#873c1e"
                iconTint="#312921"
                actions={[
                  actions.undo,
                  actions.redo,
                  actions.setBold,
                  actions.setUnderline,
                  actions.setItalic,
                  actions.alignLeft,
                  actions.alignCenter,
                  actions.alignRight,
                  actions.alignFull,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.outdent,
                  actions.indent,
                  actions.insertLink,
                  actions.removeFormat,
                ]}
                style={styles.richTextToolbarStyle}
              />
            </View> */}




          </VStack>
        </Box>
      </ScrollView>
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
    height: 64
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ffffff",
    marginRight: 50,
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
  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginLeft: 2,
    marginBottom: 10,
    marginTop: 20,
  },

  richTextEditorStyle: {
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: "#f2f2f2",
    borderColor: "#f2f2f2",

    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderWidth: 1,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: '#ADADAD',
    borderBottomWidth: 0.5,
    marginLeft: 7
  },

  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    marginLeft: 5
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedTextStyle: {
    fontSize: 15,
    marginLeft:10
  },

  ////
  containerCT: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  dropdownCT: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownContainer: {
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  //multiply
  containerLV: { paddingTop: 1, paddingBottom: 10 },
  dropdownLV: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    marginLeft: 7
  },
  placeholderStyleLV: {
    fontSize: 15,
    marginLeft: 6,
  },
  selectedTextStyleLV: {
    fontSize: 13,
    marginHorizontal: 5,
    color: "#ffffff",



  },
  iconStyleLV: {
    width: 20,
    height: 20,
  },
  inputSearchStyleLV: {
    height: 40,
    fontSize: 15,
    marginLeft: 3

  },

  selectedStyleLV: {
    borderRadius: 15,
    backgroundColor: "#22A7E4",
    borderColor: "#ffffff",
  },
});
