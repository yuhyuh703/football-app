import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Match } from '@/types/types';
import { useEffect, useState } from 'react';


export default function MatchCard({ match }: { match: Match }) {

    const [scores, setScores] = useState<{ home: number; away: number }>(
        { home: 0, away: 0 }
    );
    useEffect(() => {
        const homeScore: number = match.scores.find((score) => score.description === 'CURRENT' && score.score.participant === 'home')?.score?.goals || 0;
        const awayScore: number = match.scores.find((score) => score.description === 'CURRENT' && score.score.participant === 'away')?.score?.goals || 0;
        setScores({ home: homeScore, away: awayScore });
    
       }, []);

  return (
    <Card style={styles.card}>
      <Card.Title title={match.name} subtitle={`Kickoff: ${match.starting_at}`} />
      <Card.Content>
        <Text>
            {scores.home} - {scores.away}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 8,
    justifyContent: 'center',
  },
  teams: {
    fontSize: 16,
    fontWeight: '600',
  },
  score: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
    justifyContent: 'center',
  },
});
