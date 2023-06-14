import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import Axios from "axios";
import { useState, useEffect } from "react";
import { COLORS } from "../../../assets/constants/colors";
import { StatusBar } from "react-native";
import { TextInput, Divider, Button } from "react-native-paper";
import { USER_ROUTES } from "../../../assets/constants/routes";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUri, setProfileImageUri] = useState(null);

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
      name: username,
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

    console.log(config);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImageUri(result.assets[0].uri);
      updateProfileImage(result.assets[0].uri);
    }
  };

  const updateProfileImage = async (uri) => {
    const formData = new FormData();
    formData.append("profileImage", {
      uri: uri,
      type: "image/jpeg",
      name: "profileImage.jpg",
    });

    let url = USER_ROUTES.UPDATE_PROFILE_IMAGE(userId.replaceAll('"', ""));

    const config = {
      method: "patch",
      url: url,
      headers: {
        authorization: "Bearer " + token.replaceAll('"', ""),
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    console.log(config);

    Axios(config)
      .then((response) => {
        console.log(response.data);
        Alert.alert("Success", "Profile image changed successfully");
      })
      .then(data => console.log(data))
      .catch((error) => {
        console.log(error);
        Alert.alert("Failed", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.head}>Account</Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.imagePicker}>
          {profileImageUri ? (
            <Image
              source={{ uri: profileImageUri }}
              style={styles.profileImage}
            />
          ) : (
            <Icon name="person-circle" size={100} color={COLORS.GRAY} />
          )}
          <Button mode="outlined" onPress={pickImage}>
            Change Profile Image
          </Button>
        </View>

        <View style={styles.bottomSheet}>
          <TextInput
            style={styles.txt}
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

          <Divider style={styles.divider} />

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
            value={confirmPassword}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.PRIMARY,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  head: {
    color: COLORS.BG,
    fontSize: 30,
  },
  notificationIcon: {
    padding: 10,
    borderRadius: 50,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  bottomSheet: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.BG,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  txt: {
    marginBottom: 20,
    backgroundColor: COLORS.WHITE,
  },
  btn: {
    marginBottom: 20,
  },
  divider: {
    marginVertical: 20,
  },
});
