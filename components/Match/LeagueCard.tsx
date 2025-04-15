import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
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
    <Card style={styles.card}>
      <TouchableOpacity onPress={handleLeaguePress}>
        <Card.Title title={league.name} subtitle={`Round: ${league.today[0].round.name}`} />
      </TouchableOpacity>
      <Card.Content>
        {league.today.map((match, idx) => (
          <MatchCard match={match} key={idx} />
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 0
  },
});
