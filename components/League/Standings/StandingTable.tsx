import {View, Text} from 'react-native';
import { StandingTeam } from '@/types/types';
import { FlatList } from 'react-native-gesture-handler';


interface StandingTableProps {
    standingData: StandingTeam[];
}

export default function StandingTable({standingData}: StandingTableProps) {
  return (
    <View style={{ flex: 1 }}>
    <FlatList
      data={standingData}
      keyExtractor={(item) => item.participant.id.toString()}
      renderItem={({ item }) => {
        return (
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
                <Text>{item.participant.name}</Text>
                <Text>{item.points}</Text>
            </View>
        )
      }}
    />
  </View>
  );
}