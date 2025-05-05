import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { StandingTeam } from '@/types/types';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface StandingTableProps {
  standingData: StandingTeam[];
}

export default function StandingTable({ standingData }: StandingTableProps) {
  const router = useRouter();

  const handleTeamPress = (teamID: number) => {
    router.push(`/team/${teamID}`);
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
 
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.rank, styles.headerCell]}>#</Text>
              <Text style={[styles.team, styles.headerCell]}>Team</Text>
              <Text style={[styles.mp, styles.headerCell]}>MP</Text>
              <Text style={[styles.stat, styles.headerCell]}>W</Text>
              <Text style={[styles.stat, styles.headerCell]}>D</Text>
              <Text style={[styles.stat, styles.headerCell]}>L</Text>
              <Text style={[styles.points, styles.headerCell]}>Pts</Text>
            </View>


            <ScrollView>
              {standingData.map((item) => (
                <TouchableOpacity
                  key={item.participant.id}
                  onPress={() => handleTeamPress(item.participant_id)}
                >
                  <View style={styles.row}>
                    <Text style={styles.rank}>{item.position}</Text>
                    <View style={styles.teamContainer}>
                      <Image
                        source={{ uri: item.participant.image_path }}
                        style={styles.logo}
                      />
                      <Text style={styles.teamName}>
                        {item.participant.short_code || item.participant.name}
                      </Text>
                    </View>
                    <Text style={styles.mp}>{String(item.details.find(d => d.type_id === 129)?.value || 'N/A')}</Text>
                    <Text style={styles.stat}>{String(item.details.find(d => d.type_id === 130)?.value || 'N/A')}</Text>
                    <Text style={styles.stat}>{String(item.details.find(d => d.type_id === 131)?.value || 'N/A')}</Text>
                    <Text style={styles.stat}>{String(item.details.find(d => d.type_id === 132)?.value || 'N/A')}</Text>
                    <Text style={styles.points}>{item.points}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
    
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  rank: {
    width: 30,
    textAlign: 'center',
    fontSize: 14,
  },
  team: {
    flex: 2,
    fontSize: 14,
    textAlign: 'left',
  },
  mp: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
  },
  stat: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
  },
  points: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  teamContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamName: {
    marginLeft: 6,
    fontSize: 14,
  },
  logo: {
    width: 22,
    height: 22,
  },
});