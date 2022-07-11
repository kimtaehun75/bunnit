import React , { useCallback } from "react";
import { GestureHandlerRootView , GestureDetector , Gesture, PanGestureHandler } from "react-native-gesture-handler";
import { ScrollView as GestureHandlerScrollView , FlatList as GesutreFlatList} from 'react-native-gesture-handler'
import { Alert, Text, TouchableOpacity, View } from 'react-native';
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
    const [calendarHeight , setCalendarHeight] = React.useState(0);
    const [weekMode , setWeekMode] = React.useState(false);
    const [scrollEnabeld , setScrollEnabled] = React.useState(true);
    const [range , setRange] = React.useState(1);

    const isWeekMode = useSharedValue(false);

    const initialCalendarItems = React.useMemo(() => {
        let calendars = {};
        const monthItems = [];
        const weekItems = [];
        const date = new Date(initDate ?? new Date());

        // 얖 옆 6개월
        date.setMonth(date.getMonth() - range*12/2)
        date.setDate(1);

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
                    lastDate : currentLastDate.getDate() === date.getDate(), 
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

        calendars = monthItems;
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
        // check weekMode
        const weekMode = date?.[0]?.key.split('_')?.[0];
        if (dates?.[0]) {
            setCurrentDate(new Date(dates?.[0]));
            // if (weekMode) setScrollEnabled(false);
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


    const gesture = Gesture.Tap().onStart(() => {
        // setWeekMode(!weekMode);
    });

    const onScroll = ({nativeEvent}) => {
        if(isLeft(nativeEvent) || isRight(nativeEvent)){
            setScrollEnabled(false);
        } else {
            setScrollEnabled(true);
        }
    }

    const isRight = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.width + contentOffset.x >= contentSize.width;
     }
     
     
    const isLeft = ({layoutMeasurement, contentOffset, contentSize}) => {
        return contentOffset.x >= 0;
     }

    return (
        <SafeAreaView style={{ flex : 1, backgroundColor : '#ffffff'}}>
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
                        setWeekMode(!weekMode)
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
            <GestureHandlerRootView style={{width : S.width , }}>
                <GestureDetector 
                    gesture={gesture}
                >
                    <>
                        <GesutreFlatList
                            ref={calendarRef}
                            horizontal
                            pagingEnabled
                            nestedScrollEnabled
                            contentContainerStyle={[{ backgroundColor : '#ffffff' , height : weekMode ? 60 : 300 ,} , ]}
                            showsHorizontalScrollIndicator={false}
                            initialScrollIndex={initialCalendarItems.length/2+1}
                            initialNumToRender={range*12*6}
                            onLayout={(event) => {
                                setCalendarHeight(event.nativeEvent.layout.height);
                            }}
                            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                            data={initialCalendarItems}
                            renderItem={({ item }) => {
                                // 주 단위 객체
                                let weekItems = [];
                                const copyItems = item.slice();
                                while (copyItems.length > 0) {
                                    weekItems.push(copyItems.splice(0, 7));
                                }

                                // find current date
                                const selectedDate = weekItems.findIndex((week) => {
                                    return week.find((day) => {
                                        return day.date === selectDate;
                                    })
                                })

                                return (
                                    <GestureHandlerScrollView
                                        // scrollEnabled={scrollEnabeld}
                                        showsHorizontalScrollIndicator={false}
                                        // onScroll={onScroll}
                                        initialScrollIndex={selectedDate ?? 0}
                                        pagingEnabled
                                        nestedScrollEnabled
                                        horizontal={weekMode}
                                        style={{
                                            width : S.width,
                                            backgroundColor : '#ffffff',
                                        }}
                                        keyExtractor={(item, index) => `${index}`}
                                    >
                                        {weekItems.map((weekItem, index) => {
                                            return (
                                                <View 
                                                    style={{
                                                        width : S.width,
                                                        height : item.length < 42 ? 60 : 50,
                                                        flexDirection : 'row',
                                                        flexWrap : 'wrap',
                                                        backgroundColor : '#ffffff',
                                                    }}
                                                >
                                                    {weekItem.map((element, index) => {
                                                        return (
                                                            <TouchableOpacity
                                                                style={{
                                                                    width : S.width / 7,
                                                                    alignItems : 'center',
                                                                    justifyContent : 'center',
                                                                }}
                                                                onPress={() => {
                                                                    if (element.isCurrentMonth) handlePressDay(element.date)
                                                                }}
                                                            >
                                                                <View 
                                                                    style={{
                                                                        alignItems : 'center',
                                                                        justifyContent : 'center',
                                                                        backgroundColor : element.date == selectDate ? '#90b4ff' : 'transparent',
                                                                        borderColor : element.date == selectDate ? '#1ec2f3' : '#ffffff',
                                                                        borderRadius : 30,
                                                                        height : 30,
                                                                        width : 30,
                                                                    }}
                                                                >
                                                                    <Text style={{
                                                                        fontSize : 10,
                                                                        fontWeight : element.date == selectDate ? 'bold' : 'normal',
                                                                        color : 
                                                                            element.date == selectDate ? '#ffffff' :
                                                                            element.isCurrentMonth ? '#555555' :
                                                                            '#e2e8ed',
                                                                    }}>{element.day}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    })}
                                             </View>
                                            )
                                        })}
                                    </GestureHandlerScrollView>
                                )
                            }}
                            keyExtractor={(item, index) => {
                                let key;
                                item.forEach((element) => {
                                    if ((element.isCurrentMonth && element.week == 1 && element.day == 1) || element.lastDate) {
                                        key = `${element.date}_${index}`;
                                    }
                                })
                                if (!key) {
                                    key = `${item[0]?.date}_${index}`;
                                }
                                return `${key}`;
                            }}
                        />
                        <GestureDetector 
                            gesture={gesture}
                        >
                            <View
                                style={{
                                    borderTopWidth : 1,
                                    borderTopColor : '#d8d8ff',
                                    height : S.height,
                                    backgroundColor : '#d9d9d9',
                                }}
                            >
                                <Text style={{color : S.COLOR.BASIC}}>Bottom Sheet</Text>
                            </View>
                        </GestureDetector>
                    </>
                </GestureDetector>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

export default CalendarL3;
