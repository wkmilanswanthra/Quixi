import React, {useState} from 'react';
import {StyleSheet} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Groups from "../screens/Main/Groups";
import Friends from "../screens/Main/Friends";
import ProfileNavigator from "../Navigation/ProfileNavigator";
import Activity from "../screens/Main/Activity";
import AddExpense from '../screens/Main/AddExpense'
import AddExpenseButton from '../components/Buttons/AddExpenseButton'
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export default function HomeNavigator({route}) {

    const { setUserToken } = route.params;

    const [showBottomNav, setShowBottomNav] = useState(true);
    return (
        <Tab.Navigator screenOptions={({route})=>({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarInactiveTintColor: '#333',
            tabBarIcon: ({color, size, focused}) =>{
                let iconName;
                if (route.name==="Groups"){
                    iconName = focused? 'ios-home-sharp':'ios-home-outline';
                }else if(route.name==="Friends"){
                    iconName = focused? 'ios-people-sharp':'ios-people-outline';
                }else if(route.name==="Activity"){
                    iconName = focused? 'ios-timer-sharp':'ios-timer-outline';
                }else if(route.name==="AddExpense"){
                    iconName = focused? 'ios-add-circle-sharp':'ios-add-outline';
                }else if(route.name==="ProfileNavigator"){
                    iconName = focused? 'ios-person-sharp':'ios-person-outline';
                }
                return <Icon name={iconName} size={(route.name==="AddExpense") ? 45 : 25} />
            }
        })}>
            <Tab.Screen name="Groups" component={Groups}/>
            <Tab.Screen name="Friends" component={Friends}/>
            <Tab.Screen name="AddExpense" component={AddExpense} options={{
                tabBarButton: props => <AddExpenseButton {...props}/>
            }} />
            <Tab.Screen name="Activity" component={Activity}/>
            <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} initialParams={{setUserToken}}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle:{
        position: 'absolute',
        borderTopWidth: 0,
        bottom: 0,
        backgroundColor: '#fff',
        paddingTop: 10,
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: -1, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1
    }
})