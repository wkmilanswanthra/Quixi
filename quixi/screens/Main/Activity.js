import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { STRINGS } from "../../assets/constants/strings";
import { COLORS } from "../../assets/constants/colors";
import * as SecureStore from "expo-secure-store";
import Axios from "axios";
import { PAYMENT_ROUTES } from "../../assets/constants/routes";

export default function Activity({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [activity, setActivity] = useState([]);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchData() {
      await getToken();
      await getUserId();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userId && token) {
      getActivity();
    }
  }, [userId, token]);
  const getUserId = async () => {
    const userID = await SecureStore.getItemAsync("userId");
    setUserId(userID);
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    setToken(token);
  };

  console.log(activity);

  const getActivity = async () => {
    const url = PAYMENT_ROUTES.FIND_ALL_BY_USER_ID(userId.replaceAll('"', ""));
    let config = {
      method: "get",
      url: url,
      headers: {
        authorization: "Bearer " + token.replaceAll('"', ""),
      },
    };
    Axios(config)
      .then((response) => {
        console.log(response.data);
        setActivity(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getActivity();
    setRefreshing(false);
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.compTitle}>
          <Text style={styles.compTitleStyle}>{STRINGS.ACTIVITY}</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!(activity === []) &&
            activity &&
            activity.map((act, index) => (
              <TouchableOpacity
                key={index}
                style={styles.groupSlot}
                // onPress={() => goToExpense(expense)}
              >
                <View style={styles.groupRowDetail}>
                  <Text style={styles.groupName}>
                    {act?.paidBy._id.replaceAll('"', "") ===
                    userId.replaceAll('"', "")
                      ? "You"
                      : act.paidBy.name}
                  </Text>
                  <Text style={styles.groupOwe}> paid </Text>
                  <Text style={styles.groupName}>
                    {act.paidTo._id.replaceAll('"', "") ===
                    userId.replaceAll('"', "")
                      ? "You"
                      : act.paidTo.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.groupBalance}>
                    Rs. {act.amount.toFixed(2)}
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    On {new Date(act.createdOn).toLocaleDateString()} at{" "}
                    {new Date(act.createdOn).toLocaleTimeString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          <View style={styles.endTextContainer}>
            <Text style={styles.endText}> End of Activity list </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    height: "100%",
    backgroundColor: COLORS.BG,
    width: "100%",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop: 40,
  },
  container: {
    paddingTop: 10,
    backgroundColor: COLORS.PRIMARY,
  },
  containerStyle: {
    backgroundColor: "#F2F2F2",
    border: 0,
    height: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
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
  groupSlot: {
    backgroundColor: "white",
    height: 70,
    width: "85%",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    borderRadius: 20,
    flexDirection: "column",
  },
  groupRowDetail: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  groupName: {
    fontWeight: "bold",
    overflow: "hidden",
  },
  groupOwe: {},
  groupCreatedBy: {
    width: 200,
    overflow: "hidden",
  },
  groupBalance: {
    fontWeight: "bold",
  },
  scrollView: {
    maxHeight: "70%",
    marginTop: 10,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginBottom: 0,
  },
  endTextContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  endText: {
    color: COLORS.GREY,
  },
});
