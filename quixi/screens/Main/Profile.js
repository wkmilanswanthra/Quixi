import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import Axios from "axios";
import { useEffect, useState } from "react";
import { COLORS } from "../../assets/constants/colors";
import { StatusBar } from "react-native";
import { STRINGS } from "../../assets/constants/strings";
import { USER_ROUTES, DOMAIN_URL } from "../../assets/constants/routes";

export default function Profile({ navigation, route }) {
  const { setUserToken } = route.params;

  let [isLoggingOut, setIsLoggingOut] = useState(false);

  let [userId, setUserId] = useState("");
  let [token, setToken] = useState("");
  let [user, setUser] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getUserId();
      await getToken();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userId && token) {
      getUserData();
    }
  }, [userId, token]);

  function onRefresh() {
    if (userId && token) {
      getUserData();
    }
  }

  async function getUserData() {
    const url = USER_ROUTES.FIND_BY_ID(userId.replaceAll('"', ""));
    console.log(url);
    let config = {
      method: "get",
      url: url,
      headers: {
        authorization: "Bearer " + token.replaceAll('"', ""),
      },
    };

    Axios(config)
      .then((response) => {
        setUser({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getUserId = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    setUserId(userId);
  };
  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    setToken(token);
  };

  async function logout() {
    // Remove the JWT token from secure store
    await SecureStore.deleteItemAsync("token");
    // Remove the JWT token from Axios headers
    delete Axios.defaults.headers.common["Authorization"];
  }

  function handlePress(action) {
    switch (action) {
      case "editAccount":
        navigation.navigate("EditAccount");
        break;
      case "settings":
        navigation.navigate("SettingsNavigator", {
          screen: "Settings",
          params: { user: user },
        });
        break;
      case "requestAssistance":
        navigation.navigate("RequestAssistance");
        break;
      case "logout":
        setIsLoggingOut = true;
        logout()
          .then(() => {
            setIsLoggingOut = false;
            console.log("Logged out successfully");
            setUserToken(null);
          })
          .catch((e) => {
            alert("Failed to logout.");
            setIsLoggingOut = false;
            console.log(e);
          });
        break;
      default:
        break;
    }
  }
  console.log(user);
  // Alert.alert("Success", user.profileImgUrl);
  console.log(user.profileImgUrl);

  useEffect(() => {
    if (user && user.profileImgUrl) {
      if (user.profileImgUrl.startsWith("https://robohash.org/")) {
        setImageUrl(user.profileImgUrl);
      } else if (user.profileImgUrl.startsWith("uploads/")) {
        setImageUrl(`${DOMAIN_URL}/${user.profileImgUrl}`);
      } else {
        setImageUrl(null);
      }
    } else {
      setImageUrl(null);
    }
  }, [user]);

  // Alert.alert("Success", imageUrl);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomSheet}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.compTitle}>
            <Text style={styles.compTitleStyle}>{STRINGS.PROFILE}</Text>
          </View>
          <View style={styles.header}>
            <Image source={{ uri: imageUrl }} style={styles.profilePic} />
            <TouchableOpacity
              style={styles.title}
              onPress={() => handlePress("editAccount")}
            >
              <Text style={styles.username}>{user.name}</Text>
              <Icon name="create-outline" size={15} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress("editAccount")}
            >
              <View style={styles.btnBg}>
                <Icon name="person-circle-outline" size={24} color="#333" />
              </View>
              <Text style={styles.buttonText}>Account Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress("settings")}
            >
              <View style={styles.btnBg}>
                <Icon name="settings-outline" size={24} color="#333" />
              </View>
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress("requestAssistance")}
            >
              <View style={styles.btnBg}>
                <Icon name="help-circle-outline" size={24} color="#333" />
              </View>
              <Text style={styles.buttonText}>Get Assistance</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => handlePress("logout")}
          >
            <View style={styles.btnBgLo}>
              <Icon name="log-out-outline" size={24} color="#333" />
            </View>
            {isLoggingOut ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.logoutButtonText}>Logout</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    height: "100%", //change this after design it
    backgroundColor: COLORS.BG,
    width: "100%",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop: Platform.OS === "android" ? 70 : 10, // adjust for Android status bar
  },
  container: {
    paddingTop: 10,
    backgroundColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  compTitle: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 30,
  },
  compTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
  },
  profilePic: {
    width: 80,
    height: 80,
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
});
