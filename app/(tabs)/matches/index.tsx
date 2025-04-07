import { View, Pressable, SectionList, StyleSheet } from "react-native";
import { List, Card, Divider, Text, Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState,  useCallback, useMemo, useRef  } from "react";
import { League, Match, SelectedDate } from "../../../types/_matchesTypes";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';






export default function Matches() {

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(
    {
      dateString: new Date().toISOString().split('T')[0],
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    } as SelectedDate
  );
  const apiUrl = Constants.expoConfig?.extra?.API_URL 
  const apiToken = Constants.expoConfig?.extra?.API_TOKEN;
  
  const [matches, setMatches] = useState<League[]>([]);


  useEffect(() => {
    fetchMathesOnDate(selectedDate)
}, []);

  const fetchMathesOnDate = (selectedDate: SelectedDate) => {

    const fullAPiUrl = apiUrl+ `/leagues/date/${selectedDate.dateString}?include=today.scores;today.participants;today.stage;today.group;today.round`;

    fetch(fullAPiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `${apiToken}`,
        'Content-Type': 'application/json',
        
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setMatches(data.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  }
  
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
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
            <FlatList
              data={matches}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card style={{ marginBottom: 15 }}>
                  <Card.Title title={item.name} />
                  <Card.Content>
                    {item.today.map((match: Match, index: number) => (
                      <View key={index} style={{ marginBottom: 10 }}>
                        <Text>{match.name}</Text>
                        <Text>{match.starting_at}</Text>
                        {index < item.today.length - 1 && <Divider style={{ marginVertical: 10 }} />}
                      </View>
                    ))}
                  </Card.Content>
                </Card>
              )}
            />
          </View>

          <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['25%', '50%', '90%']}
          onChange={handleSheetChanges}
          index={-1}
        >
          <BottomSheetView style={styles.contentContainer}>
          <Calendar
            onDayPress={(selectedDate: SelectedDate) => {
              bottomSheetRef.current?.close();
              fetchMathesOnDate(selectedDate);
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
    alignItems: 'center',
  },
});