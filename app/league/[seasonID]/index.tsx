import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import Standings from '@/components/League/Standings/Standings';
import TopScorers from '@/components/League/TopScorers/TopScorers';
import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';


export default function League() {
  const { leagueName, image_path } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState('standings');

  return (
<SafeAreaProvider>
      <Stack.Screen options={{ title: '',  headerBackTitle:'Back'}} />
      
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Image
            source={{ uri: image_path as string }}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
          />
          
          <Text style={{ fontSize: 24 }}>{leagueName}</Text>
        </View>
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
            value={selectedTab}
            onValueChange={setSelectedTab}
            buttons={[
                { value: 'standings', label: 'Standings' },
                { value: 'topscorers', label: 'Top Scorers' },
            ]}
            />
            {selectedTab === 'standings' && <Standings />}
            {selectedTab === 'topscorers' && <TopScorers />}
        </SafeAreaView>
      </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
});
