import React , { useCallback } from "react";
import { GestureHandlerRootView , GestureDetector , Gesture, PanGestureHandler } from "react-native-gesture-handler";
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Animated , { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { convertCalendarDate, convertCalendarHeader, convertCalendarYearMonth , getWeekOfMonth } from "@utils/date";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import S from '@styles';

const CalendarL3 = ({initDate}) => {

    const calendarRef = React.useRef();
    const CalendarConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 60 })

    const [currentDate , setCurrentDate] = React.useState(initDate ?? new Date());
    const [selectDate , setSelectDate] = React.useState();
    const [weekMode , setWeekMode] = React.useState(false);
    const [range , setRange] = React.useState(1);

    React.useEffect(() => {
        const items = initialCalendarItems;
        let findIndex;
        if (weekMode) {
            findIndex = items[`weekItems`].flat().findIndex((item) => item.isCurrentMonth && item.date === convertCalendarDate(currentDate));
            findIndex = parseInt(findIndex/7);
        }
        else {
            findIndex = items[`monthItems`].flat().find((item) => item.isCurrentMonth && item.date === convertCalendarDate(currentDate))[`monthIndex`];
        }
        setTimeout(() => {
            calendarRef?.current?.scrollToIndex({ index: findIndex, animated: false });
        }, 1000);
        
    }
    , [weekMode]);

    const initialCalendarItems = React.useMemo(() => {
        const calendars = {};
        const monthItems = [];
        const weekItems = [];
        const date = new Date(initDate ?? new Date());

        // 얖 옆 6개월
        date.setMonth(date.getMonth() - range*12/2)
        date.setDate(1);

        let weekIndex = 0;
        for (let i = 0; i < range*12; i++) {
            const items = [];
            // 첫 주 요일 계산
            const monthFirsthweekDay = new Date(date.getFullYear(), date.getMonth() , 1).getDay();
            
            const currentLastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            // 마지막 주 요일 계산
            const monthLasthweekDay = currentLastDate.getDay();

            const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
            const nextMonthFirstDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            
            for (let j = 0; j < currentLastDate.getDate(); j++) {
                items.push({
                    monthIndex : i+1,
                    date: convertCalendarDate(date),
                    day : date.getDate(),
                    isCurrentMonth: true,
                    week : getWeekOfMonth(date),
                });
                date.setDate(date.getDate() + 1);
            }

            // 첫 주 해당 월 이전 날짜 채우기
            for (let k = 0; k < monthFirsthweekDay; k++) {
                items.unshift({
                    date: convertCalendarDate(prevMonthLastDate),
                    day : prevMonthLastDate.getDate(),
                    isCurrentMonth: false,
                    week : getWeekOfMonth(prevMonthLastDate),
                });
                prevMonthLastDate.setDate(prevMonthLastDate.getDate() - 1);
            }

            // 마지막 주 다음 월 날짜 채우기
            for (let l= monthLasthweekDay; l < 6; l++) {
                items.push({
                    date: convertCalendarDate(nextMonthFirstDate),
                    day : nextMonthFirstDate.getDate(),
                    isCurrentMonth: false,
                });
                nextMonthFirstDate.setDate(nextMonthFirstDate.getDate() + 1);
            }

            // 월 단위 객체
            monthItems.push(items);

            // 주 단위 객체
            const copyItems = items.slice();
            while (copyItems.length > 0) {
                weekItems.push(copyItems.splice(0, 7));
            }

            date.setMonth(date.getMonth());
            date.setDate(1);
        }

        calendars.monthItems = monthItems;
        calendars.weekItems = weekItems;

        return calendars;
    }
    , [initDate]);

    const handlePressDay = (date) => {
        setCurrentDate(new Date(date));
        setSelectDate(date);
    }

    const onViewableItemsChanged = ({
        viewableItems,
        changed
      }) => {
        const visibleDate = changed?.filter((item) => item.isViewable);
        let date = visibleDate?.map((item) => {
            return {key : item.key , index : item.index}
        })
        const dates = date?.[0]?.key.toString()?.match(/\d{4}-\d{2}-\d{2}/g);
        if (dates?.[0]) {
            setCurrentDate(new Date(dates?.[0]));
        }
      };

    const _viewabilityConfig = [
        {
            viewabilityConfig : {
                waitForInteraction : true,
                itemVisiblePercentThreshold: 100,
            },
            onViewableItemsChanged : onViewableItemsChanged,
        },
        {
            viewabilityConfig : {
                waitForInteraction : true,
                viewAreaCoveragePercentThreshold : 100,
            },
            onViewableItemsChanged : onViewableItemsChanged,
    }]

    const viewabilityConfigCallbackPairs = React.useRef(_viewabilityConfig)

    return (
        <SafeAreaView style={{ flex : 1, backgroundColor : '#ffffff'}}>
            {/* <Ball /> */}
            <View>
                {/* 달력 헤더 */}
                <View
                    style={{
                        flexDirection : 'row',
                        alignItems : 'center',
                        padding : 10,
                        backgroundColor : '#ffffff',
                    }}
                >
                    <Text style={{ fontSize : 15, color : '#3c4e5c' ,fontWeight : 'bold' }}>{convertCalendarHeader?.(currentDate)}</Text>
                    <TouchableOpacity onPress={() => {
                        setWeekMode(!weekMode);
                    }}><MaterialCommunityIcons name={weekMode ? `chevron-down` : `chevron-up`} size={20} color={`#0e0e05`}/></TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection : 'row',
                        justifyContent : 'space-around',
                        alignItems : 'center',
                        backgroundColor : '#ffffff',
                        marginVertical : 5,
                    }}
                >
                    <Text style={{ fontSize : 10, color : `#f4a1a1`, fontWeight : 'bold' }}>일</Text>
                    <Text style={{ fontSize : 10, color : `#cdd4dc` , fontWeight : 'bold' }}>월</Text>
                    <Text style={{ fontSize : 10, color : `#cdd4dc` ,fontWeight : 'bold' }}>화</Text>
                    <Text style={{ fontSize : 10, color : `#cdd4dc` ,fontWeight : 'bold' }}>수</Text>
                    <Text style={{ fontSize : 10, color : `#cdd4dc` ,fontWeight : 'bold' }}>목</Text>
                    <Text style={{ fontSize : 10, color : `#cdd4dc` ,fontWeight : 'bold' }}>금</Text>
                    <Text style={{ fontSize : 10, color : `#62b4ff` , fontWeight : 'bold' }}>토</Text>
                </View>
            </View>
            <FlatList
                ref={calendarRef}
                horizontal
                pagingEnabled
                contentContainerStyle={{ flexGrow : 1 , backgroundColor : '#ffffff' ,}}
                // showsHorizontalScrollIndicator={false}
                // initialScrollIndex={weekMode ? initialCalendarItems['weekItems'].length/2+1 : initialCalendarItems['monthItems'].length/2+1}
                initialNumToRender={range*12*6}
                // snapToInterval={S.width} // Adjust to your content width
                // decelerationRate="fast"
                // snapToAlignment="start"
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                data={initialCalendarItems[weekMode ? 'weekItems' : 'monthItems']}
                extraData={weekMode}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        calendarRef?.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
                renderItem={({ item }) => {
                    return (
                        <GestureHandlerRootView style={{width : S.width}}>
                            {/* <GestureDetector gesture={gesture}> */}
                                <FlatList
                                    ref={CalendarConfigRef}
                                    data={item}
                                    numColumns={7}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={(element) => {
                                        return (
                                            <TouchableOpacity
                                                style={{
                                                    flex : 1/7,
                                                    margin : 2,
                                                }}
                                                onPress={() => {
                                                    if (element.item.isCurrentMonth) handlePressDay(element.item.date)
                                                }}
                                            >
                                                <View style={{
                                                    paddingVertical : 15,
                                                    backgroundColor : element.item.date == selectDate ? '#90b4ff' : 'transparent',
                                                    borderRadius : 30,
                                                    alignItems : 'center',
                                                    justifyContent : 'center',
                                                    borderColor : element.item.date == selectDate ? '#1ec2f3' : '#ffffff',
                                                }}>
                                                    <Text style={{
                                                        fontSize : 10,
                                                        fontWeight : element.item.date == selectDate ? 'bold' : 'normal',
                                                        color : 
                                                            element.item.date == selectDate ? '#ffffff' :
                                                            element.item.isCurrentMonth ? '#555555' :
                                                            '#e2e8ed',
                                                    }}>{element.item.day}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            {/* </GestureDetector> */}
                        </GestureHandlerRootView>
                    )
                }}
                keyExtractor={(item, index) => {
                    let key;
                    item.forEach((element) => {
                        if (element.isCurrentMonth && element.week == 1 && element.day == 1) {
                            key = `${element.date}_${index}`;
                        }
                    })
                    if (!key) {
                        key = `${item[0]?.date}_${index}`;
                    }
                    return `${weekMode ? `weekMode_` : ``}${key}`;
                }}
            />
        </SafeAreaView>
    )
}

export default CalendarL3;
