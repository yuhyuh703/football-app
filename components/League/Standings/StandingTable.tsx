import {View, Text, TouchableOpacity} from 'react-native';
import { StandingTeam } from '@/types/types';
import { FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';


interface StandingTableProps {
    standingData: StandingTeam[];
}

export default function StandingTable({standingData}: StandingTableProps) {
  const router = useRouter();

  const handleTeamPress = (teamID: number) => {
    router.push(`/team/${teamID}`);
  };

  return (
    <View style={{ flex: 1 }}>
    <FlatList
      data={standingData}
      keyExtractor={(item) => item.participant.id.toString()}
      renderItem={({ item }) => {
        return (
            <TouchableOpacity onPress={() => {handleTeamPress(item.participant_id)}}>
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
            </TouchableOpacity>
            
        )
      }}
    />
  </View>
  );
}