import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {fetchPlayerByID} from '@/lib/api';
import { PlayerDetails } from '@/types/types';


export default function PlayerOverView() {
    const { playerID } = useLocalSearchParams();
    const [playerInfo, setPlayerInfo] = useState<PlayerDetails>({} as PlayerDetails);
    console.log("Player ID in index playeID:", playerID);
   
    useEffect(() => {
        const fetchPlayer = async (playerID: number) => {
            try{
                const data = await fetchPlayerByID(playerID);
                setPlayerInfo(data)
                console.log("data:", data);
                
            } catch (error) {
                console.error("Error loading team info:", error);
            }
        }
        fetchPlayer(playerID as unknown as number);
        


    }, [])
    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{playerInfo.common_name}</Text>
        </SafeAreaView>
    )
}