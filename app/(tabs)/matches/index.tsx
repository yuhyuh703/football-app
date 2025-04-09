import { View, Pressable, SectionList, StyleSheet } from "react-native";
import { List, Card, Divider, Text, Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState,  useCallback, useMemo, useRef  } from "react";
import { League, Match, SelectedDate } from "../../../types/_matchesTypes";
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
    console.log('selectedDate in useEffect', selectedDate)
    const loadMatches = async () => {
      try {
        const data = await fetchMatchesByDate(selectedDate);
        setMatches(data);
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
        <Button
        children='calendar'
        onPress={() => {bottomSheetRef.current?.snapToIndex(0)}}
        >
        </Button>
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