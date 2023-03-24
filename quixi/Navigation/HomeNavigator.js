import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Groups from "../screens/Main/Groups";
import Friends from "../screens/Main/Friends";
import Profile from "../screens/Main/Profile";
import Activity from "../screens/Main/Activity";
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
    return (
        <Tab.Navigator screenOptions={({route})=>({
            headerShown: false,
            tabBarIcon: ({color, size, focused}) =>{
                let iconName;
                if (route.name==="Groups"){
                    iconName = focused? 'ios-home-sharp':'ios-home-outline';
                }else if(route.name==="Friends"){
                    iconName = focused? 'ios-people-sharp':'ios-people-outline';
                }else if(route.name==="Activity"){
                    iconName = focused? 'ios-timer-sharp':'ios-timer-outline';
                }else if(route.name==="Profile"){
                    iconName = focused? 'ios-person-sharp':'ios-person-outline';
                }
                return <Icon name={iconName} size={22} color={color}/>
            }
        })}>
            <Tab.Screen name="Groups" component={Groups} />
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name="Activity" component={Activity} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}