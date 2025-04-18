import { Text } from 'react-native'
import { fetchLiveMatches } from '@/lib/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { League, LiveMatchesType } from '@/types/types';
import MatchList from '@/components/Match/MatchList'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function LiveMatches() {
    const [matches, setMatches] = useState<LiveMatchesType[]>([]);
    useEffect(() => {
        
        const fetchLiveMatchesData = async () => {
            try {
                const data = await fetchLiveMatches();
                console.log('Live Matches:', data);
                setMatches(data);
                console.log('Live Matches:', matches);
            } catch (error) {
                console.error('Error fetching live matches:', error);
            }
        }
        fetchLiveMatchesData();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Live Matches</Text>
                <Text>Matches: {matches.length}</Text>
                <Text>{matches[0]?.name}</Text>

                
            </View>
        </SafeAreaView>
    )
}