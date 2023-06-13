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
import { useState } from "react";
import { COLORS } from "../../../assets/constants/colors";
import { StatusBar } from "react-native";
import { TextInput, Divider, Button } from "react-native-paper";

export default function Settings({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = route.params;
  console.log(user.settings);

  const handleChangeUsername = () => {
    // code to handle changing the user's username
    setUsername("");
    Alert.alert("Success", "Username changed successfully");
  };

  const handleChangePassword = () => {
    // code to handle changing the user's password
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    Alert.alert("Success", "Password changed successfully");
  };

  function handlePress(action) {
    switch (action) {
      case "Appearence":
        navigation.navigate("Appearence", {
          settings: user.settings,
          userId: user._id,
        });
        break;
      case "Notifications":
        navigation.navigate("Notifications", {
          settings: user.settings,
          userId: user._id,
        });
        break;
      case "Privacy":
        navigation.navigate("Privacy");
        break;
      case "Payment":
        navigation.navigate("Payment");
        break;
      case "AboutInfo":
        navigation.navigate("AboutInfo");
        break;
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.head}>Settings</Text>
      </View>
      <TouchableOpacity style={styles.notificationIcon}>
        <Icon name="notifications" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={styles.bottomSheet}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Appearence")}
          >
            <View style={styles.btnBg}>
              <Icon name="sunny-outline" size={24} color="#333" />
            </View>
            <Text style={styles.buttonText}>Appearence</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Notifications")}
          >
            <View style={styles.btnBg}>
              <Icon name="notifications-outline" size={24} color="#333" />
            </View>
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Privacy")}
          >
            <View style={styles.btnBg}>
              <Icon name="key-outline" size={24} color="#333" />
            </View>
            <Text style={styles.buttonText}>Privacy & Security</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Payment")}
          >
            <View style={styles.btnBg}>
              <Icon name="card-outline" size={24} color="#333" />
            </View>
            <Text style={styles.buttonText}>Payment Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("AboutInfo")}
          >
            <View style={styles.btnBg}>
              <Icon name="information-circle-outline" size={24} color="#333" />
            </View>
            <Text style={styles.buttonText}>About Info</Text>
          </TouchableOpacity>
        </View>
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
  },
  container: {
    paddingTop: 130,
    backgroundColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 40,
    borderColor: "#203b86",
    borderWidth: 4,
  },
  username: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 25,
  },
  buttons: {
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: "#ff4646",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5,
  },
  logoutButtonText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  btnBg: {
    backgroundColor: "rgb(191,217,250)",
    padding: 10,
    borderRadius: 10,
  },
  btnBgLo: {
    backgroundColor: "rgb(255,196,204)",
    padding: 10,
    borderRadius: 10,
  },
  notificationIcon: {
    position: "absolute",
    top: 35,
    right: 10,
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 20,
  },
  head: {
    justifyContent: "center",
    alignContent: "center",
    color: COLORS.BG,
    fontSize: 40,
  },
});
