import React from 'react';
import { GestureHandlerRootView , GestureDetector , Gesture } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Animated , { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const Ball = () => {

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: isPressed.value ? 'yellow' : 'blue',
        };
    });

    const start = useSharedValue({ x: 0, y: 0 });
    const gesture = Gesture.Pan()
        .onBegin((e) => {
            isPressed.value = true;
        })
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        })
        .onFinalize(() => {
            isPressed.value = false;
        });

    return (
        <GestureHandlerRootView style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.ball, animatedStyles]} />
            </GestureDetector>
        </GestureHandlerRootView>
    );
  }

const styles = StyleSheet.create({
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    },
});

export default Ball;