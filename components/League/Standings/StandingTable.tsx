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
              <Text style={[styles.cell, styles.headerCell]}>Pos</Text>
              <Text style={[styles.cell, styles.headerCell]}>Team</Text>
              <Text style={[styles.cell, styles.headerCell]}></Text>
              <Text style={[styles.cell, styles.headerCell]}>MP</Text>
              <Text style={[styles.cell, styles.headerCell]}>W</Text>
              <Text style={[styles.cell, styles.headerCell]}>D</Text>
              <Text style={[styles.cell, styles.headerCell]}>L</Text>
              <Text style={[styles.cell, styles.headerCell]}>Pts</Text>
            </View>

            <ScrollView>
              {standingData.map((item) => (
                <TouchableOpacity key={item.participant.id} onPress={() => handleTeamPress(item.participant_id)}>
                  <View style={styles.row}>
                    <Text style={styles.cell}>{item.position}.</Text>
                    <Text style={[styles.cell, styles.teamCode]}>{item.participant.short_code}</Text>
                    <Image
                      source={{ uri: item.participant.image_path }}
                      style={styles.logo}
                    />
                    <Text style={styles.cell}>{item.details.find(d => d.type_id === 129)?.value || 'N/A'}</Text>
                    <Text style={styles.cell}>{item.details.find(d => d.type_id === 130)?.value || 'N/A'}</Text>
                    <Text style={styles.cell}>{item.details.find(d => d.type_id === 131)?.value || 'N/A'}</Text>
                    <Text style={styles.cell}>{item.details.find(d => d.type_id === 132)?.value || 'N/A'}</Text>
                    <Text style={[styles.cell, styles.points]}>{item.points}</Text>
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
    padding: 10,
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
    borderBottomColor: '#e0e0e0',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  teamCode: {
    fontWeight: 'bold',
  },
  logo: {
    width: 30,
    height: 30,
    marginEnd: 20
  },
  points: {
    fontWeight: 'bold',
  },
});