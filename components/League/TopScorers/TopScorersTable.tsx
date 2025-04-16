
import { View, Text } from 'react-native';
import { TopScorer } from '@/types/types';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

interface TopScorerProps {
    topscorersData: TopScorer[];
} 


export default function TopScorersTable({topscorersData}: TopScorerProps) {

    console.log('Top Scorers data in table:', topscorersData);
    const handelPLayerPress = (playerID: number, playerName: string) => {
        console.log('Player ID:', playerID);
        console.log('Player Name:', playerName);
        router.push(`/player/${playerID}`);
    }

    return(
        <View>
            <FlatList
            data={topscorersData}
            renderItem={({item}) => {
                return (
                <TouchableOpacity onPress={() => {handelPLayerPress(item.player.id, item.player.common_name)}}>
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center', 
                  }}
                >
                  <Text>{item.position}.</Text>
                  <Text>{item.player.common_name}</Text>
                    <Text>{item.participant.name}</Text>
                    <Text>{item.total}</Text>
                </View>
                </TouchableOpacity>
                
            )}}
            
            />
        </View>
    )


}



 