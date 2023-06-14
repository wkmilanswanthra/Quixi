import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { COLORS } from "../../../assets/constants/colors";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { GROUP_ROUTES } from "../../../assets/constants/routes";
import Axios from "axios";

const Group = ({ navigation, route }) => {
  const { groupId, list, setList, toke } = route.params;

  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [group, setGroup] = useState({});
  const [members, setMembers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getToken();
      await getUserId();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userId && token) {
      getGroupData();
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

  function getGroupData() {
    const url = GROUP_ROUTES.FIND + "?id=" + groupId;
    let config = {
      method: "get",
      url: url,
      headers: {
        authorization: "Bearer " + toke.replaceAll('"', ""),
      },
    };
    Axios(config)
      .then(function (response) {
        setGroup({ ...response.data });
        response.data.group.members = response.data.group.members.map(
          ({ _id, name, isGroupChecked, profileImgUrl }) => ({
            _id,
            name,
            isGroupChecked,
            profileImgUrl,
          })
        );
        setMembers(response.data.group.members);
        console.log("Here");
        if (response.data.group.expenses) {
          setExpenseList(response.data.group.expenses);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 404) {
          alert("Group not found");
          navigation.goBack();
        } else {
          console.log(error);
        }
      });
  }

  const goToAddExpense = () => {
    if (members.length == 0) {
      alert("Please add members first");
      return;
    }
    navigation.navigate("AddExpense", {
      groupId: groupId,
      members: members,
      expenseList: expenseList,
      setExpenseList: setExpenseList,
    });
  };

  const goToAddMembers = () => {
    navigation.navigate("AddMembers", {
      groupId: groupId,
      members: members,
      setMembers: setMembers,
    });
  };

  const goToUpdateGroup = () => {
    navigation.navigate("UpdateGroup", {
      groupId: groupId,
      token: token,
      userId: userId,
      group: group,
    });
  };


  const deleteGroup = () => {
    const confirmDelete = () => {
      const url = GROUP_ROUTES.DELETE(groupId);
      let config = {
        method: "delete",
        url: url,
        headers: {
          authorization: "Bearer " + token.replaceAll('"', ""),
        },
      };

      Axios(config)
        .then(function (response) {
          console.log(list.groups.length);
          list.groups = list.groups.filter(
            (item) =>
              item._id.replaceAll('"', "") !== groupId.replaceAll('"', "")
          );
          console.log(list.groups.length);

          setList(list);
          navigation.goBack();
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: confirmDelete,
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const goToExpense = (expense) => {
    navigation.navigate("ViewExpense", {
      expense: expense,
      groupId: groupId,
      token: token,
      userId: userId,
      expenseList: expenseList,
      setExpenseList: setExpenseList,
    });
  };

  const viewCharts = () => {
    navigation.navigate("ViewCharts", {
      expenseList: expenseList,
      group: group,
      token: token,
      userId: userId,
    });
  };

  const settleUp = () => {
    navigation.navigate("SettleUp", {
      expenseList: expenseList,
      group: group,
      token: token,
      userId: userId,
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getGroupData();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.compTitle}>
          <Text style={styles.compTitleStyle}>{group.group?.name}</Text>
          <Text>{group.group?.category}</Text>
        </View>
        <TouchableOpacity
          style={styles.addMembersSign}
          onPress={goToAddMembers}
        >
          <Ionicons name="add-circle-outline" size={24} color="black" />
          <Text> Add members</Text>
        </TouchableOpacity>
        {!(members === []) && (
          <ScrollView style={styles.view3} horizontal={true}>
            {members.map((item, index) => {
              return (
                <Image
                  key={index}
                  style={styles.img}
                  source={{
                    uri: item.profileImgUrl || "https://picsum.photos/200/200",
                  }}
                />
              );
            })}
          </ScrollView>
        )}
        <View style={styles.btnSet} horizontal={true}>
          <TouchableOpacity onPress={goToAddExpense}>
            <Text style={styles.btnSetText}>Add Expense</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={settleUp}>
            <Text style={styles.btnSetText}>Settle Up</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Text style={styles.btnSetText}>Balance</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={viewCharts}>
            <Text style={styles.btnSetText}>View Charts</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: 10, maxHeight: "100%" }}>
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {!(expenseList === []) &&
              expenseList.map((expense, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.groupSlot}
                  onPress={() => goToExpense(expense)}
                >
                  <View style={styles.groupRowDetail}>
                    <Text style={styles.groupName}>{expense.name}</Text>
                    <Text style={styles.groupOwe}>{expense.category}</Text>
                  </View>
                  <View style={styles.groupRowDetail}>
                    <Text style={styles.groupCreatedBy} numberOfLines={1}>
                      {group.description}
                    </Text>
                    <Text style={styles.groupBalance}> {expense.amount}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            <View style={styles.endTextContainer}>
              <Text style={styles.endText}> End of Expenses list </Text>
            </View>
          </ScrollView>
          <ScrollView style={{ marginTop: 10, maxHeight: 100 }}>
            <TouchableOpacity
              style={styles.groupPageIconLine}
              onPress={goToUpdateGroup}
            >
              <Ionicons name="create" size={24} color="black" />
              <Text style={[styles.groupIconText, { color: "black" }]}>
                Edit Group
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.groupPageIconLine}
              onPress={deleteGroup}
            >
              <Ionicons name="trash-outline" size={24} color="red" />
              <Text style={[styles.groupIconText, { color: "red" }]}>
                Delete Group
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.groupPageIconLine}>
              <Ionicons name="copy" size={24} color="black" />
              <Text style={[styles.groupIconText, { color: "black" }]}>
                Copy Group Link
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
  addMembersSign: {
    marginTop: 20,
    paddingLeft: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  btnSet: {
    maxHeight: 50,
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btnSetText: {
    fontSize: 13,
    color: "#000000",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    width: 100,
    height: 39,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginLeft: 10,
  },
  groupPageIconLine: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: "center",
  },
  groupIconText: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  view3: {
    width: "80%",
    flexDirection: "row",
    maxHeight: 70,
    marginHorizontal: 30,
    marginTop: 20,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 25,
    margin: 10,
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
    justifyContent: "space-between",
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
    maxHeight: 250,
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
  compTitle: {
    marginTop: 30,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  compTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
export default Group;
