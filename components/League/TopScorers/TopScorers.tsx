import { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import { fetchTopScorers } from '@/lib/api';
import TopScorersTable from './TopScorersTable';
import { useLocalSearchParams } from 'expo-router';
import { TopScorer } from '@/types/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TopScorers() {

    const { seasonID } = useLocalSearchParams();
    const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
    

    useEffect(() => {
        console.log('fetching top scorers')
        const fetchTopScorersData = async (seasonID: number) => {
            try {
                const data = await fetchTopScorers(seasonID);
                setTopScorers(data as TopScorer[]);
                console.log('Top Scorers data in topscorers file use effect:', data);
            }
            catch (error) {
                console.error("Error loading top scorers:", error);
            }
        }
        fetchTopScorersData(seasonID as unknown as number);
    }, [])

    return (

        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <TopScorersTable topscorersData={topScorers}/>
            </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}