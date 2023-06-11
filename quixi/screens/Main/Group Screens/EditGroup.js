import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text,  View, TextInput,TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';



const GroupCreation=({navigation})=>{
  
  const [selectValue, setSelectValue] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handlePickerChange = (value) => {
    setSelectValue(value);
  }
  
  const createGroup = async () => {
    try {
        const response = await axios.post('http://192.168.8.157:5000/creategroup', {
        groupName,
        groupDescription,
        selectType: selectValue,
        
      });
       console.log(response.data);
       const groupID = response.data._id;
       navigation.navigate('group');
       setGroupName(''); // clear the input fields
       setGroupDescription('');
       setSelectValue('');

    }catch (err) {
       console.log(err);
    }
  };

    return(
      
        <View style={styles.container}>
        <StatusBar style="light" />
         
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetLine} />
          
          <View style={styles.groupDetails}>
            <Text style={styles.groupDetailsText} >Group Name</Text>
            <TextInput style={styles.input} onChangeText={setGroupName} value={groupName}/>
            <Text style={styles.groupDetailsText} >Group Description</Text>
            <TextInput style={styles.input} onChangeText={setGroupDescription} value={groupDescription}/>
          </View>
          
        <View style={styles.labelContainer}>
              
              
          <Picker selectedValue={selectValue} onValueChange={handlePickerChange} >
            <Picker.Item label="Select a type" value="" enabled={false}  />
            <Picker.Item label="Home" value="Home" />
            <Picker.Item label="Trip" value="Trip" />
            <Picker.Item label="Couple" value="Couple" />
            <Picker.Item label="Other" value="Other" />
            
          </Picker>
          <TouchableOpacity  onPress={() => navigation.navigate('RemoveFriend')}>
            <View style={styles.viewGroupMembers}>
                <FontAwesome5 name="user-friends" size={20} color="black" />
                <Text>Group Members</Text>
            </View>
          </TouchableOpacity>

          
        </View>
          <TouchableOpacity style={styles. buttonSave} onPress={createGroup}>
            <Text style={styles.buttonText}  >Save</Text>
            
          </TouchableOpacity>
          
          </View>
          
         
          </View>
              
              
            
         
    )
}
export default GroupCreation

export const styles = StyleSheet.create({

//   ###############Styles for page layout################

  container: {
    flex: 1,
    backgroundColor: '#010b40',
  },

  bottomSheet:{
    height:'100%',
    backgroundColor:'#F2F2F2',
    width:'100%',
    borderTopEndRadius:50,
    borderTopStartRadius:50,
    marginTop:60
  },

  bottomSheetLine:{
    height:4,
    width:75,
    backgroundColor:'#D0D0D0',
    alignSelf:'center',
    marginVertical:15,
    borderRadius:5
  },

//###Specific styles for screen### 

  input: {
    height: 40,
    margin: 20,
    borderBottomWidth:1,
    width:200,
    padding: 10,
  },

  groupDetails:{
    marginTop:20,
    alignSelf:'center',
  },

  groupDetailsText:{
    marginTop:40
  },

  labelContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginTop:40,
    marginHorizontal:75,
  },

  buttonSave: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    width: 100,
    height: 40,
    backgroundColor: '#010b40',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: 20,
    alignSelf:'center'
  },
  
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  viewGroupMembers:{
    flexDirection:'row',
    marginTop:30,
    marginHorizontal: 45,
  },
  

})