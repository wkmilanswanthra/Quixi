import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
} from "react-native";
// import CustomCheckbox from './CheckBox';
import Checkbox from "expo-checkbox";
import { FontAwesome } from "@expo/vector-icons";
import PaidAmount from "./PaidAmount";
import AddExpense from "../../Main/AddExpense";

const SplitAmount = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const setPaidBy = route.params?.setPaidBy;
  const paidBy = route.params?.paidBy;
  const splitAmong = route.params?.splitAmong;
  const user = route.params?.user;

  console.log("paidBy", paidBy);

  useEffect(() => {
    const combinedData = [...splitAmong, user];
    console.log("combinedData", combinedData);
    combinedData.forEach((element) => {
      element.isSelected = false;
    });
    combinedData.forEach((element) => {
      paidBy.forEach((item) => {
        if (element._id === item._id) {
          element.isSelected = true;
        }
      });
    });
    setData(combinedData);
  }, []);

  const setList = () => {
    const selected = data.filter((item) => item.isSelected);
    if (selected.length === 0) {
      alert("Please select atleast one person");
      return;
    }
    setPaidBy(selected);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.header}>
            <FontAwesome name="arrow-left" size={25} color="black" />
            <Text style={styles.text1}>Paid By</Text>
          </View>
          <FlatList
            style={styles.flatlist}
            data={data}
            keyExtractor={({ _id }) => _id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image
                  style={styles.view1}
                  source={require("../../../assets/images/person.jpg")}
                />
                <Text>{item.name}</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isSelected}
                  onValueChange={(newValue) => {
                    const updatedData = data.map((dataItem) => {
                      if (dataItem._id === item._id) {
                        return { ...dataItem, isSelected: newValue };
                      }
                      return dataItem;
                    });
                    setData(updatedData);
                  }}
                  color="#000"
                />
              </View>
            )}
          />

          <View style={styles.more}>
            <Text>More people</Text>
          </View>
          <View style={styles.btn}>
            <TouchableHighlight onPress={setList}>
              <Text style={styles.btn1}>Ok</Text>
            </TouchableHighlight>
          </View>
        </>
      )}
    </View>
  );
};

export default SplitAmount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    //marginBottom: 100
    paddingTop: "10%",
    //height:20,
    //width:'100%',
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  text1: {
    fontSize: 25,
    alignItems: "center",
    //marginTop:20,
    marginLeft: "25%",
  },
  flatlist: {
    marginTop: 40,
    marginLeft: 20,
  },
  item: {
    flexDirection: "row",
    marginLeft: 10,
    //alignSelf:'flex-start',
    paddingLeft: 2,
    paddingTop: 40,
    alignItems: "center",
  },

  view1: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    marginRight: 40,
  },
  checkbox: {
    marginLeft: "auto",
    marginRight: "20%",
  },
  more: {
    marginLeft: 50,
  },
  btn1: {
    borderWidth: 2,
    padding: 15,
    //paddingHorizontal:50,
    borderColor: "black",
    color: "white",
    backgroundColor: "#010B40",
    fontSize: 18,
  },
  btn: {
    //alignItems:'flex-end',
    marginTop: 20,
    marginRight: 20,
    marginLeft: "75%",
    height: 50,
    marginBottom: 50,
  },
});
