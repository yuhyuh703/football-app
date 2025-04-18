import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { TopScorer } from '@/types/types';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface TopScorerProps {
  topscorersData: TopScorer[];
}

export default function TopScorersTable({ topscorersData }: TopScorerProps) {
  const handlePlayerPress = (playerID: number) => {
    router.push(`/player/${playerID}`);
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.rank, styles.headerCell]}>#</Text>
              <Text style={[styles.player, styles.headerCell]}>Player</Text>
              <Text style={[styles.team, styles.headerCell]}>Team</Text>
              <Text style={[styles.goals, styles.headerCell]}>G</Text>
            </View>

            <ScrollView>
              {topscorersData.map((item) => (
                <TouchableOpacity
                  key={item.player.id}
                  onPress={() => handlePlayerPress(item.player.id)}
                >
                  <View style={styles.row}>
                    <Text style={styles.rank}>{item.position}</Text>
                    <Text style={styles.player}>{item.player.common_name}</Text>
                    <View style={styles.teamContainer}>
                      <Image
                        source={{ uri: item.participant.image_path }}
                        style={styles.logo}
                      />
                      <Text style={styles.teamName}>
                        {item.participant.short_code || item.participant.name}
                      </Text>
                    </View>
                    <Text style={styles.goals}>{item.total}</Text>
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
    player: {
      flex: 2,
      fontSize: 14,
    },
    team: {
      flex: 2,
      fontSize: 14,
      textAlign: 'left',
    },
    goals: {
      width: 50,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
    },
    teamContainer: {
      flex: 2,
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
  