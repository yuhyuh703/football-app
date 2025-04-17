import { Text } from 'react-native'
import { fetchLiveMatches } from '@/lib/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { LiveMatchesType } from '@/types/types';


export default function LiveMatches() {
    const [data, setData] = useState<LiveMatchesType[]>([])
    useEffect(() => {
        
        const fetchLiveMatchesData = async () => {
            try {
                const data = await fetchLiveMatches();
                console.log('Live Matches:', data);
                setData(data);
            } catch (error) {
                console.error('Error fetching live matches:', error);
            }
        }
        fetchLiveMatchesData();
    }, [])
    return (
        <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {data ? 'live matches on' : 'no live matches'}
        </Text>
    )
}