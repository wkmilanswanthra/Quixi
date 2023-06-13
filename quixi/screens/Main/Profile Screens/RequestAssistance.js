import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { COLORS } from "../../../assets/constants/colors";
import { StatsBar } from "react-native";
import { WebView } from "react-native-webview";

export default function Profile({ navigation, route }) {
  let [userId, setUserId] = useState("");

  useEffect(() => {
    async function fetchData() {
      await getUserId();
    }
    fetchData();
  }, []);

  const getUserId = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    setUserId(userId);
  };

  let user = {
    userId: userId, //.Replace it with the userId of the logged in user
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.notificationIcon}>
        <Icon name="notifications" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={styles.bottomSheet}>
        <WebView
          source={{
            uri: "https://tawk.to/chat/6422a62531ebfa0fe7f514c5/1gsjli12h",
          }}
        ></WebView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    height: "100%", //change this after design it
    backgroundColor: COLORS.BG,
    width: "98%",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop: Platform.OS === "android" ? 60 : 10, // adjust for Android status bar
    paddingBottom: 130,
  },
  container: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationIcon: {
    position: "absolute",
    top: 35,
    right: 10,
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 20,
  },
});
