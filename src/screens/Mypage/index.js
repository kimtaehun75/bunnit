import React from "react";
import { Text , View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const MyPagecreen = (props) => {
    const { navigation } = props;
     
    return (
        <SafeAreaView style={{ flexGrow : 1 , backgroundColor : '#ffffff'}}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Mypage</Text>
            </View>
        </SafeAreaView>
    )
}

export default MyPagecreen;
