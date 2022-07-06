import React from "react";
import { Text , View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarScreen = (props) => {
    const { navigation } = props;
     
    return (
        <SafeAreaView style={{ flex : 1}}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Calendar</Text>
            </View>
        </SafeAreaView>
    )
}

export default CalendarScreen;
