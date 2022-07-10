import React from "react";
import { Text, View, TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CalendarL2 from "@components/CalendarL2";
import CalendarL3 from "@components/CalendarL3";

const CalendarScreen = (props) => {
    const { navigation } = props;

    const [currentDate , setCurrentDate] = React.useState(new Date());
    const [tabIndex , setTabIndex] = React.useState(0);

    return (
        <SafeAreaView style={{ flex : 1, backgroundColor : '#ffffff'}}>
            <View 
                style={{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    backgroundColor : '#ffffff',
                }}
            >
                <TouchableOpacity
                    style={{
                        flex : 1,
                        padding : 15,
                        alignItems : 'center',
                        justifyContent : 'center',
                        backgroundColor : tabIndex === 0 ? '#ffffff' : '#f5f5f5',
                        borderRightWidth : 1,
                        borderRightColor : '#e5e5e5',
                    }}
                    onPress={() => {
                        setTabIndex(0);
                    }}
                >
                    <Text style={{
                        fontSize : 14,
                        color : tabIndex === 0 ? '#000000' : '#9b9b9b',
                    }}>L2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex : 1,
                        padding : 15,
                        alignItems : 'center',
                        justifyContent : 'center',
                        backgroundColor : tabIndex === 1 ? '#ffffff' : '#f5f5f5',
                    }}
                    onPress={() => {
                        setTabIndex(1);
                    }}
                >
                    <Text style={{
                        fontSize : 14,
                        color : tabIndex === 1 ? '#000000' : '#9b9b9b',
                    }}>L3</Text>
                </TouchableOpacity>
            </View>
            {/* Level 2 Calendar */}
            {tabIndex === 0 && <CalendarL2/>}
            {/* Level 3 Calendar */}
            {tabIndex === 1 && <CalendarL3/>}
        </SafeAreaView>
    )
}

export default CalendarScreen;
