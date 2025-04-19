import React from 'react';
import { View, Text } from 'react-native';
import { FullParticipant } from '@/types/types';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';


interface ClubSquadProps {
    squad: FullParticipant | null;
}

export default function ClubSquad({squad}: ClubSquadProps) {
console.log("ClubSquad in clubsquad file", squad);

const handlePlayerPress = (playerID: number, playerName: string) => {
    console.log('Player ID in club squad:', playerID, 'type:', typeof playerID);
    console.log('Player Name:', playerName);
    
    router.push(`/player/${playerID}`);
};
return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
        <FlatList
        data={squad?.players}
        renderItem={({ item }) => {
            return(
            <TouchableOpacity onPress={() => handlePlayerPress(item.player.id, item.player.common_name)}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc'
            }}>
                
                <Text style={{ fontSize: 16 }}>{item.player.common_name}</Text>
                <Text style={{ fontSize: 16 }}>{item.jersey_number}</Text>
                
            </View>
            </TouchableOpacity>
            )
        }}
        
        />
    </SafeAreaView>
    </SafeAreaProvider>
    </GestureHandlerRootView>
)
}