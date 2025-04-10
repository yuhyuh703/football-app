import { View, Text } from 'react-native'
import { fetchLeagueInfo } from "@/lib/api";
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import StandingTable from '@/components/League/Standings/StandingTable';
import { StandingTeam } from '@/types/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Standings() {
    const { leagueId } = useLocalSearchParams();
    const [standings, setStandings] = useState<StandingTeam[]>([]);

    useEffect(() => {
        const fetchStandings = async (leagueId: string) => {
           try{
            const data = await fetchLeagueInfo(leagueId);
            setStandings(data as StandingTeam[]);
            console.log('Standings data:', data);
           } catch (error) {
            console.error("Error loading standings:", error);
            }
        } 
        fetchStandings(leagueId as string);
    }, []);
    return (
           
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <Text>Standings</Text>
                    <StandingTable standingData={standings}/>
                </SafeAreaView>
            </SafeAreaProvider>
            </GestureHandlerRootView>

    )
}