import React from "react";
import { Text , View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const LibraryScreen = (props) => {
    const { navigation } = props;
     
    return (
        <SafeAreaView style={{ flex : 1}}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Library</Text>
            </View>
        </SafeAreaView>
    )
}

export default LibraryScreen;
