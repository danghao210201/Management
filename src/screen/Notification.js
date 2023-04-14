import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import {Button} from 'native-base';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Thông báo 1", content: "Nội dung thông báo 1" },
    { id: 2, title: "Thông báo 2", content: "Nội dung thông báo 2" },
    { id: 3, title: "Thông báo 3", content: "Nội dung thông báo 3" },
    { id: 4, title: "Thông báo 4", content: "Nội dung thông báo 4" },
  ]);

  const handleClearAll = () => {
    setNotifications([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
       
      </View>
      {/* <TouchableOpacity onPress={handleClearAll}> */}
        <Button style={styles.Title} colorScheme="red">Xoá tất cả</Button>
        <View>
        <Button style={styles.TitleSeen} colorScheme="blue">Xem tất cả</Button>
        </View>
        {/* </TouchableOpacity> */}
      {notifications.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Không có thông báo</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

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
    marginLeft: 121,
  },
  Title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#22A7E4",
    width:90,
    marginTop: 10,
    marginLeft:260,
    borderRadius: 50,
  },
  TitleSeen: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#22A7E4",
    width:100,
    marginTop: -40,
    marginLeft:10,
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

export default NotificationScreen;
