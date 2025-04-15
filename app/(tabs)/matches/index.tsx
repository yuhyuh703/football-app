import { View, Pressable, SectionList, StyleSheet } from "react-native";
import { List, Card, Divider, Text, Button, IconButton } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState,  useCallback, useMemo, useRef  } from "react";
import { League, Match, SelectedDate } from "../../../types/types";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import MatchList from "@/components/Match/MatchList";
import { fetchMatchesByDate } from "@/lib/api";

export default function Matches() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(
    {
      dateString: new Date().toISOString().split('T')[0],
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    } as SelectedDate
  );
  const [matches, setMatches] = useState<League[]>([]);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchMatchesByDate(selectedDate);
        setMatches(data);
        console.log('Matches data:', data);
      } catch (error) {
        console.error("Error loading matches:", error);
      }
    };
  
    loadMatches();
  }, [selectedDate]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  
 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <IconButton
          icon= 'access-point'
          onPress={() => console.log('Live matches pressed')}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{ margin: 20 }}>
            {selectedDate.dateString === new Date().toISOString().split('T')[0] ? 'Today' : selectedDate.dateString}
            </Text>
            <IconButton
            onPress={() => {bottomSheetRef.current?.snapToIndex(0)}}
            icon="calendar"
            />
          </View>
          
        </View>
        <View style={{ padding: 10 }}>
          <MatchList matches={matches} />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['25%', '50%', '90%']}
          onChange={handleSheetChanges}
          index={-1}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Calendar style={{ width : '100%' }}  
              onDayPress={async (day: SelectedDate) => {
                bottomSheetRef.current?.close();
                console.log(day, 'pressed')
                setSelectedDate(day); 
              }}
              theme={{
    backgroundColor: '#ffffff', // Background color of the calendar
    calendarBackground: '#f8f9fa', // Background color of the calendar container
    textSectionTitleColor: '#b6c1cd', // Color of month and day titles
    selectedDayBackgroundColor: '#4CAF50', // Background color of the selected day
    selectedDayTextColor: '#ffffff', // Text color of the selected day
    todayTextColor: '#FF5722', // Text color of today's date
    dayTextColor: '#2d4150', // Default text color for days
    textDisabledColor: '#d9e1e8', // Text color for disabled days
    dotColor: '#00adf5', // Dot color for marked dates
    selectedDotColor: '#ffffff', // Dot color for marked dates on the selected day
    arrowColor: '#4CAF50', // Color of the navigation arrows
    monthTextColor: '#4CAF50', // Text color for the month title
    indicatorColor: '#4CAF50', // Indicator color for loading
    textDayFontWeight: '300', // Font weight for day numbers
    textMonthFontWeight: 'bold', // Font weight for the month title
    textDayHeaderFontWeight: '300', // Font weight for day headers (e.g., Mon, Tue)
    textDayFontSize: 16, // Font size for day numbers
    textMonthFontSize: 18, // Font size for the month title
    textDayHeaderFontSize: 14, // Font size for day headers
  }}
              
            />
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
  },
});