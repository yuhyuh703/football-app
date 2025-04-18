import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import MatchCard from './MatchCard';
import { League } from '@/types/types';
import { router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function LeagueCard({ league }: { league: League }) {
  const handleLeaguePress = () => {
    router.push({
      pathname: "/league/[seasonID]",
      params: {
        seasonID: league.today[0].season_id,
        leagueName: league.name,
        image_path: league.image_path,
      },
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <View style={styles.card}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={handleLeaguePress}>
        <Image source={{ uri: league.image_path }} style={styles.logo} />
        <View style={styles.leagueInfo}>
          <Text style={styles.leagueName}>{league.name}</Text>
          <Text style={styles.roundText}> - Round {league.today[0]?.round?.name}</Text>
        </View>
      </TouchableOpacity>

      {/* Matches */}
      <View style={styles.content}>
        {league.today.map((match, idx) => (
          <MatchCard match={match} key={idx} />
        ))}
      </View>
    </View>
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f3f3f3',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',

  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  leagueInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leagueName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roundText: {
    fontSize: 13,
    color: '#666',
  },
  content: {
    padding: 8,
  },
});
