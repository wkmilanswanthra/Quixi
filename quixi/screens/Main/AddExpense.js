import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { STRINGS } from "../../assets/constants/strings";
import { COLORS } from "../../assets/constants/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { EXPENSE_ROUTES, USER_ROUTES } from "../../assets/constants/routes";
import Axios from "axios";
import axios from "axios";
import route from "color-convert/route";

export default function AddExpense({ navigation, route }) {
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [splitAmong, setSplitAmong] = useState([]);
  const [paidBy, setPaidBy] = useState([]);
  const [contribution, setContribution] = useState({});
  const [receipt, setReceipt] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [isGroup, setIsGroup] = useState(false);

  const { expenseList = [], setExpenseList = () => {} } = route.params || {};

  useEffect(() => {
    async function fetchData() {
      await getToken();
      await getUserId();
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.groupId) {
      setIsGroup(true);
      console.log("group id = ", route.params.groupId);
      route.params.members = route.params.members.filter(
        (item) => item._id !== userId.replaceAll('"', "")
      );
      setSplitAmong(route.params.members);
      console.log("group members = ", route.params.members);
    }
  }, [userId]);

  useEffect(() => {
    if (token !== "" && userId !== "") {
      getUserInfo();
    }
  }, [token, userId]);

  const getUserId = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    setUserId(userId);
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    setToken(token);
  };

  const getUserInfo = async () => {
    const userInfo = await axios.get(
      USER_ROUTES.FIND_BY_ID(userId.replaceAll('"', "")),
      {
        headers: {
          Authorization: "Bearer " + token.replaceAll('"', ""),
        },
      }
    );
    const { _id, name, profileImgUrl } = userInfo.data;

    const user = { _id, name, profileImgUrl };
    user.isSelected = true;
    setCurrentUser(user);
    setPaidBy([user]);
  };

  function goToAddMembers() {
    if (!isGroup) {
      navigation.navigate("AddMembers", {
        setSplitAmong: setSplitAmong,
        splitAmong: splitAmong,
        token: token,
        userId: userId,
      });
    } else {
      navigation.navigate("SplitAmong", {
        members: route.params.members,
        splitAmong: splitAmong,
        setSplitAmong: setSplitAmong,
      });
    }
  }

  function goToSplitAmong() {
    console.log("split among = ", splitAmong);
    console.log("paid by = ", paidBy);
    navigation.navigate("PaidBy", {
      setPaidBy: setPaidBy,
      paidBy: paidBy,
      splitAmong: splitAmong,
      user: currentUser,
    });
  }

  function pickImage() {
    navigation.navigate("Receipt", {
      setReceipt: setReceipt,
      receipt: receipt,
    });
  }

  function createNonGroupExpense() {
    console.log(receipt);
    let regExp = /[a-zA-Z]/g;
    const members = {};
    if (parseFloat(amount) || !amount) {
      alert("Please enter amount");
      return;
    }
    if (splitAmong.length !== 0) {
      console.log("split among = ", splitAmong);
      splitAmong.map((item) => {
        members[item._id] = 0;
      });
      members[currentUser._id] = 0;
    } else {
      alert("Please add members");
      return;
    }
    console.log("members = ", members);
    if (paidBy.length !== 0) {
      console.log("paid by = ", paidBy);
      const div = paidBy.length;
      paidBy.forEach((item) => {
        members[item._id] = (parseFloat(amount) / div).toFixed(2);
      });
    }
    console.log("members = ", members);
    setContribution(members);
    if (contribution) {
      const url = EXPENSE_ROUTES.CREATE;
      const config = {
        method: "post",
        url: url,
        headers: {
          Authorization: "Bearer " + token.replaceAll('"', ""),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          contribution: JSON.stringify(members),
          name: name,
          amount: parseFloat(amount),
          createdBy: userId.replaceAll('"', ""),
          splitMethod: "equal",
          groupExpense: false,
          summary: members,
        },
      };
      console.log(config);
      Axios(config)
        .then((response) => {
          console.log("created Expense = ", response.data);
          Alert.alert("Expense created");

          navigation.goBack();
        })
        .catch((error) => {
          console.log("create Expense error = ", error);
          alert("Error creating expense");
          navigation.goBack();
        });
    }
  }

  const createGroupExpense = () => {
    console.log("group expense");
    console.log("split among = ", splitAmong);
    console.log("paid by = ", paidBy);
    const members = {};
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter amount");
      return;
    }
    if (splitAmong.length !== 0) {
      console.log("split among = ", splitAmong);
      splitAmong.map((item) => {
        members[item._id] = 0;
      });
      members[currentUser._id] = 0;
    } else {
      alert("Please add members");
      return;
    }
    console.log("members = ", members);
    if (paidBy.length !== 0) {
      console.log("paid by = ", paidBy);
      const div = paidBy.length;
      paidBy.forEach((item) => {
        members[item._id] = (parseFloat(amount) / div).toFixed(2);
      });
    }
    console.log("members = ", members);
    setContribution(members);
    if (contribution) {
      const url = EXPENSE_ROUTES.CREATE;
      const config = {
        method: "post",
        url: url,
        headers: {
          Authorization: "Bearer " + token.replaceAll('"', ""),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          contribution: JSON.stringify(members),
          name: name,
          amount: parseFloat(amount),
          createdBy: userId.replaceAll('"', ""),
          splitMethod: "equal",
          group: route.params.groupId,
          groupExpense: true,
        },
      };
      console.log(config);
      Axios(config)
        .then((response) => {
          console.log("created Expense = ", response.data);
          expenseList.push(response.data.expense);
          setExpenseList(expenseList);
          Alert.alert("Expense created");

          navigation.goBack();
        })
        .catch((error) => {
          console.log("create Expense error = ", error);
          alert("Error creating expense");
          navigation.goBack();
        });
    }
  };

  const handleSubmit = () => {
    if (token && userId) {
      if (!isGroup) createNonGroupExpense();
      else createGroupExpense();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.compTitle}>
          <Text style={styles.compTitleStyle}>{STRINGS.ADD_EXPENSE}</Text>
        </View>
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.firstContainer}>
            <View style={styles.view2}>
              <Text style={styles.text2}>Members</Text>
              <View style={[styles.view4, { marginTop: 30 }]}>
                <ScrollView style={styles.view3} horizontal={true}>
                  {splitAmong &&
                    splitAmong.map((item, index) => {
                      return (
                        <Image
                          key={index}
                          style={styles.img}
                          source={{
                            uri:
                              item.profileImgUrl ||
                              "https://picsum.photos/200/200",
                          }}
                        ></Image>
                      );
                    })}
                </ScrollView>

                <TouchableOpacity style={styles.view1} onPress={goToAddMembers}>
                  <Ionicons name="add-circle" size={40} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.view2, { marginTop: 30 }]}>
              <Text style={styles.text2}>Expense Details</Text>
              <View style={styles.des1}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name for the expense"
                  name="desc"
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={styles.des1}>
                <TextInput
                  style={styles.input}
                  placeholder="Amount"
                  name="amt"
                  onChangeText={(text) => setAmount(text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={[styles.view2, { marginTop: 30 }]}>
              <Text style={styles.text2}>Paid by</Text>
              <View style={[styles.view4, { marginTop: 30 }]}>
                <ScrollView style={styles.view3} horizontal={true}>
                  {paidBy.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        style={styles.img}
                        source={{
                          uri:
                            item.profileImgUrl ||
                            "https://picsum.photos/200/200",
                        }}
                      ></Image>
                    );
                  })}
                </ScrollView>
                <TouchableOpacity style={styles.view1} onPress={goToSplitAmong}>
                  <Ionicons name="add-circle" size={40} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.desre, { marginTop: 40 }]}>
              <TouchableOpacity style={styles.view5} onPress={pickImage}>
                <Text style={styles.textRe}>
                  {receipt !== "" ? "Receipt added" : "Add a receipt"}
                </Text>
                <Ionicons name="add-circle" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.btn1}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginTop: 10,
  },
  container: {
    paddingTop: 40,
    backgroundColor: COLORS.PRIMARY,
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
  firstContainer: {
    width: "90%",
    borderRadius: 20,
    marginHorizontal: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "column",
  },
  view1: {
    marginLeft: 20,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  text2: {
    marginLeft: 10,
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  view2: {
    width: "100%",
    flexDirection: "column",
  },
  view3: {
    width: "80%",
    flexDirection: "row",
  },
  view4: {
    width: "100%",
    flexDirection: "row",
  },
  elevation: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    elevation: 1,
    shadowOpacity: 0.4,
  },
  firstContainer2: {
    height: 100,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 18,
    marginTop: 20,
  },
  des1: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  input: {
    marginTop: 10,
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  desre: {
    flexDirection: "row",
    marginLeft: 15,
    justifyContent: "flex-end",
  },
  textRe: {
    //textAlign:'center',
    fontSize: 16,
    marginRight: 15,
  },
  con: {
    paddingLeft: "50%",
  },
  view5: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btn1: {
    borderWidth: 2,
    padding: 15,
    borderColor: "black",
    color: "white",
    backgroundColor: "#010B40",
  },
  btn: {
    alignItems: "flex-end",
    marginTop: 50,
    marginRight: 20,
    height: 50,
    marginBottom: 100,
  },
});
