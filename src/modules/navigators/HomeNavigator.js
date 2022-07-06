import * as React from "react";
import TabNavigator from '@navigators/TabNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="main">
            <Stack.Screen
                name="main"
                options={{
                    headerShown: false,
                }}
                component={TabNavigator}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};
