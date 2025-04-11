import { View, Text } from 'react-native'
import { fetchLeagueStandings } from "@/lib/api";
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import StandingTable from '@/components/League/Standings/StandingTable';
import { StandingTeam } from '@/types/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Standings() {
    const { seasonID } = useLocalSearchParams();
    const [standings, setStandings] = useState<StandingTeam[]>([]);

    useEffect(() => {
        const fetchStandings = async (seasonID: number) => {
           try{
            const data = await fetchLeagueStandings(seasonID);
            setStandings(data as StandingTeam[]);
            console.log('Standings data:', data);
           } catch (error) {
            console.error("Error loading standings:", error);
            }
        } 
        fetchStandings(seasonID as unknown as number );
    }, []);
    return (
           
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <StandingTable standingData={standings}/>
                </SafeAreaView>
            </SafeAreaProvider>
            </GestureHandlerRootView>

    )
}