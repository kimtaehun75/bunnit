import { Dimensions } from "react-native";

const { width , height } = Dimensions.get('window');
const deviceScreenWidth = Dimensions.get('screen').width;
const deviceScreenHeight = Dimensions.get('screen').height;

const getWidth = () => {
    if (width != deviceScreenWidth) return deviceScreenWidth;
    return width;
}

const getHeight = () => {
    if (height != deviceScreenHeight) return deviceScreenHeight;
    return height;
}

const styles = {
    width : getWidth(),
    height : getHeight(),
    COLOR : {
        BASIC : '#000000',
        FOCUS : '#5a5a5a',
        NONE_FOCUS : '#b8b8b8',
    },
    SHADOW_BOX : {
        shadowColor : '#555',
        shadowOffset : {
            width : 0,
            height : 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
}

export default styles;