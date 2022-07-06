import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "@navigators/HomeNavigator";
import React from "react";

const Setup = () => {
    return (
        <>
            <NavigationContainer onStateChange={() => {}}>
                <HomeNavigator />
            </NavigationContainer>
        </>
    );
}

export default Setup;
