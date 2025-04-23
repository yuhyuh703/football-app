import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { fetchLeagueStandings } from '@/lib/api';
import StandingTable from '@/components/League/Standings/StandingTable';
import { StandingTeam } from '@/types/types';
import SkeletonComponent from '@/components/SkeletonComponent';

export default function Standings() {
  const { seasonID } = useLocalSearchParams();
  const [standings, setStandings] = useState<StandingTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandingsData = async (seasonID: number) => {
      try {
        const data = await fetchLeagueStandings(seasonID);
        setStandings(data as StandingTeam[]);
      } catch (error) {
        console.error('Error loading standings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandingsData(seasonID as unknown as number);
  }, [seasonID]);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.flex}>
        {loading ? 
          <SkeletonComponent /> : <StandingTable standingData={standings}/>
        }
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});
