import {View, Text} from 'react-native';
import { StandingTeam } from '@/types/types';
import { FlatList } from 'react-native-gesture-handler';


interface StandingTableProps {
    standingData: StandingTeam[];
}

export default function StandingTable({standingData}: StandingTableProps) {

    console.log('Standing Data in table:', standingData);
  return (
    <View style={{ flex: 1 }}>
    <Text>Standing Table</Text>
    <FlatList
      data={standingData}
      keyExtractor={(item) => item.participant.id.toString()}
      renderItem={({ item }) => {
        console.log("Rendering row:", item);
        return (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text>{item.position}</Text>
                <Text>{item.participant.name}</Text>
            </View>
        )
      }}
    />
  </View>
  );
}