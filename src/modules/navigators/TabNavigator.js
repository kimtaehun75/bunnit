import * as React from "react";
import { Platform , Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeMainScreen from '@screens/Home';
import CalendarScreen from '@screens/Calendar';
import LibraryScreen from '@screens/Library';
import MyPageScreen from '@screens/Mypage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const tabBarListeners = ({ navigation, route }) => ({
    tabPress: () => navigation.navigate(route.name),
});

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name={`home1`} options={{headerShown : false}} component={HomeMainScreen} />
        </HomeStack.Navigator>
     );
}

const CalendarStack = createNativeStackNavigator();
function CalendarStackScreen() {
    return (
        <CalendarStack.Navigator>
            <CalendarStack.Screen name={`calendar1`} options={{headerShown : false}} component={CalendarScreen} />
        </CalendarStack.Navigator>
     );
}

const LibraryStack = createNativeStackNavigator();
function LibraryStackScreen() {
    return (
        <LibraryStack.Navigator>
            <LibraryStack.Screen name={`library1`} options={{headerShown : false}} component={LibraryScreen} />
        </LibraryStack.Navigator>
     );
}

const MyPageStack = createNativeStackNavigator();
function MyPageStackScreen() {
    return (
        <MyPageStack.Navigator>
            <MyPageStack.Screen name={`mypage1`} options={{headerShown : false}} component={MyPageScreen} />
        </MyPageStack.Navigator>
     );
}

export default TabNavigator = () => {
    // const height = Platform.OS === 'android' ? 70 : 95
    return (
        <Tab.Navigator 
            initialRouteName='home'
            // screenOptions={{
            //     tabBarStyle : {
            //         height: height
            //     }
            // }}
        >
            <Tab.Screen
                name="home"
                component={HomeStackScreen}
                options={{
                    headerShown : false,
                    tabBarLabel : ({color , focused}) => <Text style={{fontWeight : focused ? 'bold' : 'normal' , fontSize : 12}}>HOME</Text>,
                    tabBarIcon : ({color , focused}) => <MaterialCommunityIcons name={focused ? `home` : `home-outline`} size={30} />
                }}
                listeners={tabBarListeners}
            ></Tab.Screen>
            <Tab.Screen
                name='calendar'
                component={CalendarStackScreen}
                options={{
                    headerShown : false,
                    tabBarLabel : ({color , focused}) => <Text style={{fontWeight : focused ? 'bold' : 'normal', fontSize : 12}}>CALENDAR</Text>,
                    tabBarIcon : ({color , focused}) => <FontAwesomeIcon5 name={`calendar`} solid={focused ? true : false} size={20} />
                }} 
                listeners={tabBarListeners}
            />
            <Tab.Screen
                name='library'
                component={LibraryStackScreen}
                options={{
                    headerShown : false,
                    tabBarLabel : ({color , focused}) => <Text style={{fontWeight : focused ? 'bold' : 'normal', fontSize : 12}}>LIBRARY</Text>,
                    tabBarIcon : ({color , focused}) => <FontAwesomeIcon5 name={`dumbbell`} size={20} />
                }}
                listeners={tabBarListeners} 
            />
            <Tab.Screen
                name='myPage'
                component={MyPageStackScreen}
                options={{
                    headerShown : false,
                    tabBarLabel : ({color , focused}) => <Text style={{fontWeight : focused ? 'bold' : 'normal', fontSize : 12}}>MY PAGE</Text>,
                    tabBarIcon : ({color , focused}) => <MaterialCommunityIcons name={focused ? `account` : `account-outline`} size={30} />
                }}
                listeners={tabBarListeners} 
            />
        </Tab.Navigator>
    );
};
