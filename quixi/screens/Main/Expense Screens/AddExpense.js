import React, { useState, useRef, useEffect} from "react";
import { Button, StyleSheet, Text, TextInput, View,Alert, Pressable, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {elevation} from './styles';
//import { useNavigation } from 'react-navigation-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { RNCamera } from 'react-native-camera';
import { Camera, CameraType } from 'expo-camera';
import CurrencyType from "./CurrencyType";

//const Stack=createStackNavigator();

 const AddExpense=()=>{

    // const handleSplitAmount=()=>{
    //     navigation.navigate("CurrencyType");
    // };

        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

        const showDatePicker = () => {
            setDatePickerVisibility(true);
        };

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        const handleConfirm = (date) => {
            console.warn("A date has been picked: ", date);
            hideDatePicker();
        };
       

        useEffect(() =>{
            (async() => {
                const {status} = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status ==='granted');
            })();
        }, []);



        if(hasPermission === null){
            return <View />
        }
        if(hasPermission === false){
            return <Text>No access to camera</Text>
        }
    

    const cameraRef=useRef();
    const [hasPermission, setHasPermission] = useState(null);

    const snap = async () => {
        if (camerasRef){
            const photo =  await cameraRef.current.takePictureAsync();
            console.log(photo); 
        }
    };

    return(
        <View style={styles.container}>
            {/* <View style= {styles.arr1}>
                <FontAwesome name='arrow-left' size={25} color='white'  />
            </View> */}
            <Text style= {styles.text}>Add Expense</Text>
            <View style={styles.tray}>
                <View style={[styles.firstcontainer,styles.elevation]}>
                    <View style={styles.view2} >
                        <Text style={styles.text2}>Split Among</Text>
                        <View style={styles.view3}>
                            <Image style={styles.img} source={require('../assets/person.jpg')} ></Image>
                            <Image style={styles.img} source={require('../assets/person.jpg')} ></Image>
                            <Image style={styles.img} source={require('../assets/person.jpg')} ></Image>
                            <Image style={styles.img} source={require('../assets/person.jpg')} ></Image>
                                {/* <TouchableOpacity onPress={CurrencyType}> */}
                                <View style={styles.view1} ><FontAwesome  name='plus' size={25} color='black'   /></View>
                                {/* </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
        
            <View style={[styles.firstcontainer2, styles.elevation]}>
            <Text style={styles.text2}>Expense Details</Text>
            <View style={styles.des1}>
                <FontAwesome name='pencil' size={18} color='black'  />
            
                <TextInput style={styles.input}
                placeholder='Enter a description' name="desc" />
                {/* onChangeText={(text) => setDesc(text)} */}
            </View>
            <View style={styles.des1}>
                <FontAwesome name='pencil' size={18} color='black'  />
                <TextInput style={styles.input}
                placeholder='Amount' name="amt" />
                {/* onChangeText={(text) => setAmt(text)} */}
            </View>
            </View>
            <View style={[styles.firstcontainer, styles.elevation]}>
                <View style={styles.view2} >
                    <Text style={styles.text2}>Paid By</Text>
                    <View style={styles.view3}>
                        <Image style={styles.img} source={require('../assets/person.jpg')} ></Image>
                        <Image style={styles.img} source={require('../assets/person.jpg')} ></Image>
                        <Image style={styles.img} source={require('../assets/person.jpg')} ></Image>
                        <Image style={styles.img} source={require('../assets/person.jpg')} ></Image>
                        <View style={styles.view1} ><FontAwesome  name='plus' size={25} color='black'   /></View>
                        
                    </View>
                </View>
            </View>

            <View style={[styles.container4, styles.elevation]}>
                <View style={styles.desre}>
                    <TouchableOpacity onPress={snap}>
                        <FontAwesome name='file-text' size={18} color='black'  />
                    </TouchableOpacity>
                <TouchableOpacity onPress={snap} >
                    <Camera 
                    ref={(camera) => (cameraRef.current = camera)}
                    type={Camera.Constants.Type.front}
                    >
                    </Camera>
                </TouchableOpacity>
              
                    <Text style={styles.textre}>Add a receipt</Text>
                    <View style={styles.con}>
                                <FontAwesome name='plus' size={25} color='black'   />
                           
                    </View>
                </View>
            </View>

            <View style={[styles.container4, styles.elevation]}>
                <View style={styles.desre}>
                    
                    <FontAwesome name='calendar' size={18} color='black'  />
                    <Text style={styles.textre}>Add a date</Text>
                    <View style={styles.con}>
                        <TouchableOpacity onPress={showDatePicker}>
                            <FontAwesome name='plus' size={25} color='black'  />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                </View>
            </View>

            <View style={[styles.container4, styles.elevation]}>
                <View style={styles.desre}>
                    <FontAwesome name='comments' size={18} color='black'  />
                    <TextInput style={styles.input} 
                    placeholder = 'Add comment'/>
                </View>
            </View>
            
        <View style={styles.btn}>
        <TouchableHighlight>
            <Text style = {styles.btn1}>
               Add
            </Text>
         </TouchableHighlight>
        </View>
        

        </View>
        
        
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#010B40',
      alignItems: 'center',
      width: '100%',
      height: '100%',
   },
    text:{
      color: 'white',
      alignItems: 'center',
      marginTop: 50,
      fontSize:24,
    },
    
    tray: {
      flex:1,
      marginTop: 50,
      width: '100%',
      //height: '75%',
      backgroundColor: 'white',
      //justifyContent: 'center',
      borderTopStartRadius:30,
      borderTopEndRadius: 30,
      
    },
    elevation,
    firstcontainer:{
      flexDirection:'row',
      height: 100,  
    },
    firstcontainer2:{
      height: 100,  
    },
    con:{
        paddingLeft:'50%',
        justifyContent:'center',
        alignItems:'center',
    },
    container4:{
        height: 50,
        justifyContent:'center',
    },
    des1:{
      flexDirection:'row',
      marginTop: 4,
      marginLeft:15,
      justifyContent:'flex-start'
    },
    desre:{
      flexDirection:'row',
      marginLeft:15,
    
    },
    view1:{
      width: 50,
      height:50,
      resizeMode: 'contain',
      borderWidth: 2,
      borderRadius: 15,
      margin: 10,
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    img:{
      width: 50,
      height:50,
      resizeMode: 'contain',
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 15,
      margin: 10,
    },
    text2:{
      marginLeft: 10,
      color: 'black',
      marginTop:10,
      fontSize:16,
    },
    textre:{
        justifyContent: 'flex-end',
        
        //textAlign:'center',
        fontSize:16,
        marginLeft: 10

    },
    input: {
      textAlign: 'left',
      fontSize: 15,
      width: '80%',
      marginLeft:10,
      textColor: 'black',  
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    view2:{
        flexDirection:'column',
    },
    view3:{
        flexDirection: 'row',
    },
    
    btn1: {
        borderWidth: 2,
        padding: 15,
        borderColor: 'black',
        color: 'white',
        backgroundColor: '#010B40',
        
    },
    btn:{
        alignItems:'flex-end',
        marginTop:20,
        marginRight:20,
        height:50,
    },
    
  });

  export default AddExpense;