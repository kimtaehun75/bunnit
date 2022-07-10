import React from "react";
import { Text , View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import S from "@styles";

const HomeScreen = (props) => {
    const { navigation } = props;
     
    return (
        <SafeAreaView style={{ flex : 1, backgroundColor : '#ffffff'}}>
            <View
                style={{
                    flex : 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{color : S.COLOR.BASIC}}>HOME</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;
