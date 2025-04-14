
import { View, Text } from 'react-native';
import { TopScorer } from '@/types/types';
import { FlatList } from 'react-native-gesture-handler';

interface TopScorerProps {
    topscorersData: TopScorer[];
} 


export default function TopScorersTable({topscorersData}: TopScorerProps) {

    console.log('Top Scorers data in table:', topscorersData);

    return(
        <View>
            <FlatList
            data={topscorersData}
            renderItem={({item}) => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{item.position}.</Text>
                    <Text>{item.player.common_name}</Text>
                    <Text>{item.participant.name}</Text>
                    <Text>{item.total}</Text>
                </View>
            )}
            
            />
        </View>
    )


}

 