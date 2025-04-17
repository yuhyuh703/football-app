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

    const  getScore = (match: Match, team: string) => {
      return match.scores.find(
        (score) => score.type_id === 1525  && score.score.participant === team
      )?.score?.goals ?? 0;
    }

    const shouldDisplayScore = (stateID: number) => {
      const displayableStates = [2, 3, 4, 5, 6, 7, 8, 9];
      return displayableStates.includes(stateID);
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
        <Card.Title
        title={match.name}
        subtitle={`Kickoff: ${new Date(match.starting_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`}
      /><Card.Content>
      <Text style={styles.score}>
        {shouldDisplayScore(match.state.id) ? `${match.state.name} ${scores.home} : ${scores.away}` : ``}
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
