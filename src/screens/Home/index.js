import React from "react";
import { Text , View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = (props) => {
    const { navigation } = props;
     
    return (
        <SafeAreaView style={{ flex : 1}}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;
