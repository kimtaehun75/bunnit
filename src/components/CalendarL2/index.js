import React from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { convertCalendarDate, convertCalendarHeader, getWeekOfMonth } from "@utils/date";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CalendarL2 = ({initDate}) => {
    const [currentDate , setCurrentDate] = React.useState(initDate ?? new Date());

    const [selectDate , setSelectDate] = React.useState();

    const initialCalendarItems = React.useMemo(() => {
        const items = [];
        const date = new Date(currentDate);

        // 첫 주 요일 계산
        const monthFirsthweekDay = new Date(date.getFullYear(), date.getMonth() , 1).getDay();
        
        const currentLastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        // 마지막 주 요일 계산
        const monthLasthweekDay = currentLastDate.getDay();

        const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
        const nextMonthFirstDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

        date.setDate(1);
        for (let i = 0; i < currentLastDate.getDate(); i++) {
            items.push({
                date: convertCalendarDate(date),
                day : date.getDate(),
                isCurrentMonth: date.getMonth() === currentDate.getMonth(),
                week : getWeekOfMonth(date),
            });
            date.setDate(date.getDate() + 1);
        }

        // 첫 주 해당 월 이전 날짜 채우기
        for (let i = 0; i < monthFirsthweekDay; i++) {
            items.unshift({
                date: convertCalendarDate(prevMonthLastDate),
                day : prevMonthLastDate.getDate(),
                isCurrentMonth: false,
                week : getWeekOfMonth(prevMonthLastDate),
            });
            prevMonthLastDate.setDate(prevMonthLastDate.getDate() - 1);
        }

        // 마지막 주 다음 월 날짜 채우기
        for (let i = monthLasthweekDay; i < 6; i++) {
            items.push({
                date: convertCalendarDate(nextMonthFirstDate),
                day : nextMonthFirstDate.getDate(),
                isCurrentMonth: false,
            });
            nextMonthFirstDate.setDate(nextMonthFirstDate.getDate() + 1);
        }

        return items;
    }
    , [currentDate]);

    const handlePressNext = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }

    const handlePressPrev = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }

    const handlePressDay = (date) => {
        setSelectDate(date);
    }

    return (
        <SafeAreaView style={{ flex : 1, backgroundColor : '#ffffff'}}>
            {/* <Ball /> */}
            <View>
                {/* 달력 헤더 */}
                <View
                    style={{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        padding : 10,
                        backgroundColor : '#ffffff',
                    }}
                >
                    <TouchableOpacity onPress={handlePressPrev}><MaterialCommunityIcons name={`chevron-left`} size={20} color={`#1ec2f3`}/></TouchableOpacity>
                    <Text style={{ fontSize : 15, color : '#3c4e5c' ,fontWeight : 'bold' }}>{convertCalendarHeader?.(currentDate)}</Text>
                    <TouchableOpacity onPress={handlePressNext}><MaterialCommunityIcons name={`chevron-right`} size={20} color={`#1ec2f3`}/></TouchableOpacity>
                </View>
            </View>
            <FlatList
                ListHeaderComponent={() => {
                    return (
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
                    )
                }}
                contentContainerStyle={{ flexGrow : 1 , backgroundColor : '#ffffff' , padding : 10 }}
                data={initialCalendarItems}
                numColumns={7}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={{
                            flex : 1/7,
                            margin : 2,
                        }}
                        onPress={() => {
                            if (item.isCurrentMonth) handlePressDay(item.date)
                        }}
                    >
                        <View style={{
                            paddingVertical : 15,
                            backgroundColor : item.isCurrentMonth ? '#ffffff' : 'transparent',
                            borderRadius : 30,
                            alignItems : 'center',
                            justifyContent : 'center',
                            borderWidth : 1,
                            borderColor : item.date == selectDate ? '#1ec2f3' : '#ffffff',
                        }}>
                            <Text style={{
                                fontSize : 10,
                                fontWeight : item.date == selectDate ? 'bold' : 'normal',
                                color : item.isCurrentMonth ? '#555555' : '#e2e8ed',
                            }}>{item.day}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `${item.date}_${index}`}
            />
        </SafeAreaView>
    )
}

export default CalendarL2;
