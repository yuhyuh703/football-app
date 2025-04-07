import { Text, View, Pressable, Button } from "react-native";
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { useEffect, useState } from "react";
import { Transfer } from "@/types/_matchesTypes";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";


export default function Transfers() {

  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const apiUrl = Constants.expoConfig?.extra?.API_URL + `/transfers/latest`;
  const apiToken = Constants.expoConfig?.extra?.API_TOKEN;

  useEffect(() => {

    console.log('API URL:', apiUrl);
    console.log('API Token:', apiToken);

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
      console.log('transfers fetched:', data);
      setTransfers(data.data);
     
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    

    
    
  }, []);



  const router = useRouter();



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>

      <Text>Edit app/transfers.tsx to edit this screen.</Text>
      <Link href="/matches" asChild>
      <Pressable>
        <Button
          title="matches"
          onPress={() => router.push('./matches')}
        />
      </Pressable>
    </Link>
    <Text onPress={() => router.push('./matches')}>Go matches</Text>
        <FlatList
        data={transfers}
        renderItem={({ item }) => <Text>{item.amount} {item.date}</Text>}
        />

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
    padding: 36,
    alignItems: 'center',
  },
});