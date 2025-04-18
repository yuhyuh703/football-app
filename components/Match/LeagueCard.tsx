import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import MatchCard from './MatchCard';
import { League } from '@/types/types';
import { router } from 'expo-router';

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
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
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
    borderRadius: 16,
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
