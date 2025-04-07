import { View, Pressable, SectionList, StyleSheet } from "react-native";
import { List, Card, Divider, Text, Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState,  useCallback, useMemo, useRef  } from "react";
import { League, Match } from "../../../types/_matchesTypes";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';




export default function Matches() {

  const [date, setDate] = useState<string>("2025-04-07");
  const apiUrl = Constants.expoConfig?.extra?.API_URL + `/leagues/date/${date}?include=today.scores;today.participants;today.stage;today.group;today.round`;
  const apiToken = Constants.expoConfig?.extra?.API_TOKEN;
  
  const [matches, setMatches] = useState<League[]>([]);


  useEffect(() => {

    console.log('API URL:', apiUrl);
    console.log('API Token:', apiToken);

    fetchMathesOnDate()
    
  }, []);

  const fetchMathesOnDate = () => {

    fetch(apiUrl, {
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

      
      console.log('Matches:', data.data);
      console.log('Matches:', data.data[0].today);
      setMatches(data.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  }
  

  
 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
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