import React, { useState } from 'react';
import { StyleSheet, Text,View,Image,TouchableOpacity, ScrollView, Modal, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const originalData=[ { id:"1",name: 'Mathew Sampson', amount: 1555, imageUrl: 'https://picsum.photos/id/100/200/200' },
{ id:"2", name: 'John Doe', amount: 200, imageUrl: 'https://picsum.photos/id/101/200/200' },
{id:"3", name: 'Jane Smith', amount: 500, imageUrl: 'https://picsum.photos/id/102/200/200' },]

const AddFriend = ({ navigation }) => {
  
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    // Perform search logic here using the search text
    const filteredData = originalData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredData);
  };

  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleDelete = () => {
    // Perform the deletion logic here
    if (selectedFriend) {
      // Delete the friend
      console.log('Deleting friend:', selectedFriend);
      setSelectedFriend(null);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bottomSheet}>
        
        <View style={styles.searchFriend}>
          <SearchBar
            placeholder="Search"
            onChangeText={handleSearch}
            value={searchText}
            containerStyle={{ backgroundColor:"#F2F2F2" ,border:0, height:0 ,borderBottomWidth: 0,borderTopWidth: 0}} //there is odd thing prevail
            inputContainerStyle={{ backgroundColor: '#D9D9D9', height: 40, borderRadius:10 }}
            inputStyle={{ color: '#9B9B9B' }}
          />
        </View>
        <View><Text style={styles.titleOfFriendList} >Members on GroupName</Text></View>

        <View style={{height: 500}}>
        <ScrollView>
        {searchText !== '' 
              ? searchResults.map((item) => (
            <View style={styles.friendContainer} key={item.id}>
              <Image source={ {uri: item.imageUrl }} style={styles.freindImage} />
              <View style={styles.friendName}>
                <Text>{item.name}</Text>
              </View>
              
            </View>
              ))
        : originalData.map((item) => (
          <View style={styles.friendContainer} key={item.id}>
              <Image source={ {uri: item.imageUrl }} style={styles.freindImage} />
              <View style={styles.friendName}>
                <Text>{item.name}</Text>
              </View>
              <TouchableOpacity style={styles.removeFriendIcon} onPress={() => setSelectedFriend(item)}><AntDesign name="delete" size={24} color="red" /></TouchableOpacity>
            </View>
            
          ))}

<Modal visible={selectedFriend !== null} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to Remove this MemberNamee?</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setSelectedFriend(null)} />
              <Button title="OK" onPress={handleDelete} color="red" />
            </View>
          </View>
        </View>
      </Modal>
        </ScrollView>
        </View>    
            
        

      </View>
    </View>
  );
};





export default AddFriend;

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

//###Specific styles for screen### 

  searchFriend:{
    marginTop:10,
    marginHorizontal:20,
    borderRadius:20,
    border:1,
    height:80
  },

  friendContainer: {
    flexDirection: 'row',
    margin: 10,
  },

  friendName: {
    paddingTop:17,
    marginLeft: 10,
  },

  freindImage:{
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    margin:10,
  },

  buttonAdd: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 100,
    height: 40,
    backgroundColor: '#010b40',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: 20,
  },

  buttonAddText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  removeFriendIcon:{
    marginTop:25,
    position: 'absolute',
    right: 30,

  },

  titleOfFriendList:{
    paddingLeft:20,
    color:'grey'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: 300,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },

})