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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import Axios from "axios";
import { useState, useEffect } from "react";
import { COLORS } from "../../../assets/constants/colors";
import { StatusBar } from "react-native";
import { TextInput, Divider, Button } from "react-native-paper";
import { USER_ROUTES } from "../../../assets/constants/routes";

export default function EditProfile({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let [userId, setUserId] = useState("");
  let [token, setToken] = useState("");
  let [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      await getUserId();
      await getToken();
    }
    fetchData();
  }, []);

  const getUserId = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    setUserId(userId);
  };
  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    setToken(token);
  };

  const handleChangeUsername = () => {
    let url = USER_ROUTES.UPDATE(userId.replaceAll('"', ""));

    const userData = {
      'name': username,
    };

    const config = {
      method: "patch",
      url: url,
      headers: {
        authorization: "Bearer " + token.replaceAll('"', ""),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: userData,
    };

    console.log(config)

    Axios(config)
      .then((response) => {
        console.log(response.data);
        Alert.alert("Success", "Username changed successfully");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("failed", error);
      });

    // code to handle changing the user's username
    setUsername("");
    
  };

  const handleChangePassword = () => {
    // code to handle changing the user's password
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    Alert.alert("Success", "Password changed successfully");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.head}>Account</Text>
      </View>
      <TouchableOpacity style={styles.notificationIcon}>
        <Icon name="notifications" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={styles.bottomSheet}>
        <TextInput
          style={[styles.txt, styles.txt1]}
          label="User Name"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter new username"
        />

        <Button
          style={styles.btn}
          mode="contained"
          disabled={!username}
          onPress={handleChangeUsername}
        >
          Change Username
        </Button>

        <Divider style={styles.dv} />

        <TextInput
          style={styles.txt}
          label="Current Password"
          value={currentPassword}
          onChangeText={(text) => setCurrentPassword(text)}
          placeholder="Enter current password"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.txt}
          label="New Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          placeholder="Enter new password"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.txt}
          label="Confirm New Password"
          value={newPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Confirm new password"
          secureTextEntry={true}
        />

        <Button
          style={styles.btn}
          mode="contained"
          onPress={handleChangePassword}
          disabled={!currentPassword || !newPassword || !confirmPassword}
        >
          Change Password
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    height: "100%", //change this after design it
    backgroundColor: COLORS.BG,
    width: "98%",
    padding: 10,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop: Platform.OS === "android" ? 60 : 10, // adjust for Android status bar
  },
  container: {
    paddingTop: 130,
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
  txt: {
    marginTop: 20,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 60,
    elevation: 5,
  },
  txt1: {
    marginTop: 50,
  },
  btn: {
    marginTop: 20,
    width: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  dv: {
    marginTop: 20,
  },
  head: {
    justifyContent: "center",
    alignContent: "center",
    color: COLORS.BG,
    fontSize: 40,
  },
});
