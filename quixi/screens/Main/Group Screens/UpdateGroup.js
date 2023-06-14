import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../../assets/constants/colors";
import { useEffect, useState } from "react";
import Axios from "axios";
import { GROUP_ROUTES } from "../../../assets/constants/routes";
import * as SecureStore from "expo-secure-store";

export default function UpdateGroup({ navigation, route }) {
  const { groupId, userId, group, token } = route.params; // Get groupId from route params
  const [selectValue, setSelectValue] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handlePickerChange = (value) => {
    setSelectValue(value);
  };

  useEffect(() => {
    if (group) {
      setSelectValue(group.category);
      setGroupName(group.name);
      setGroupDescription(group.description);
    }
  }, [group]);

  // function to updateGroup
  function updateGroup() {
    console.log(selectValue, groupName, groupDescription);
    if (!groupName || !groupDescription || !selectValue) {
      Alert.alert("Failed", "Please fill all fields");
    } else {
      let url = GROUP_ROUTES.UPDATE(groupId);

      const groupData = {
        category: selectValue,
        name: groupName,
        description: groupDescription,
      };

      const config = {
        method: "patch",
        url: url,
        headers: {
          authorization: "Bearer " + token.replaceAll('"', ""),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: groupData,
      };

      Axios(config)
        .then((response) => {
          console.log(response.data);
          Alert.alert("Success", "Group Updated Successfully");
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Failed", error);
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.head}>Update the Group</Text>
      </View>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        <View style={styles.groupDetails}>
          <Text style={styles.groupDetailsText1}>Group Name</Text>
          <TextInput
            defaultValue={group.group.name}
            style={styles.input}
            onChangeText={(text) => setGroupName(text)}
            value={groupName}
          />
          <Text style={styles.groupDetailsText}>Group Description</Text>
          <TextInput
            defaultValue={group.group.description}
            style={styles.input}
            onChangeText={(text) => setGroupDescription(text)}
            value={groupDescription}
          />
        </View>

        <View style={styles.labelContainer}>
          <Picker
            selectedValue={selectValue}
            onValueChange={(item) => handlePickerChange(item)}
          >
            <Picker.Item label="Select a type" value="" enabled={false} />
            <Picker.Item label="Home" value="Home" />
            <Picker.Item label="Trip" value="Trip" />
            <Picker.Item label="Couple" value="Couple" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <TouchableHighlight
          style={{
            backgroundColor: "#010b40",
            borderRadius: 10,
            padding: 10,
            alignItems: "center",
            width: 100,
            height: 40,
            marginTop: 40,
            marginLeft: 120,
          }}
          onPress={updateGroup}
        >
          <Text style={{ color: "white" }}>Update</Text>
        </TouchableHighlight>
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
    marginTop: Platform.OS === "android" ? 40 : 10, // adjust for Android status bar
  },

  container: {
    paddingTop: 130,
    backgroundColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 40,
    margin: 20,
    borderBottomWidth: 1,
    width: 200,
    padding: 10,
  },

  groupDetails: {
    alignSelf: "center",
  },

  groupDetailsText1: {
    marginTop: 30,
  },

  labelContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginTop: 40,
    marginHorizontal: 75,
  },
  head: {
    justifyContent: "center",
    alignContent: "center",
    color: COLORS.BG,
    fontSize: 30,
  },
});
