import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Match } from '@/types/types';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function MatchCard({ match }: { match: Match }) {
    const [scores, setScores] = useState<{ home: number; away: number }>(
        { home: 0, away: 0 }
    );

    function getScore(match: Match, team: string) {
      return match.scores.find(
        (score) => score.description === 'CURRENT' && score.score.participant === team
      )?.score?.goals ?? 0;
    }

    const handleMatchPress = () => {
      console.log('routerinf to ', `/match/${match.id}`, ', passing: ', match.id);
      router.push({
        pathname: "/match/[fixtureID]",
        params: { fixtureID: match.id }
      });
      
    }

    

    useEffect(() => {
        setScores({ home: getScore(match, 'home'), away: getScore(match, 'away') });
    
       }, [match]);

  return (

    <Card style={styles.card}>
       <TouchableOpacity onPress={handleMatchPress}>
      <Card.Title title={match.name} subtitle={`Kickoff: ${match.starting_at}`} />
      <Card.Content>
      <Text style={styles.score}>
        {match.round.is_current ? `${scores.home} : ${scores.away}` : ''}
      </Text>
      </Card.Content>
      </TouchableOpacity>
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
    fontSize: 16,
    justifyContent: 'center',
  },
});
