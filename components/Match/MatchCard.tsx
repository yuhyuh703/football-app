import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Match, Participant } from '@/types/types';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MatchCard({ match }: { match: Match }) {
  const [scores, setScores] = useState({ home: 0, away: 0 });
  const [teams, setTeams] = useState<{ home: Participant; away: Participant } | null>(null);

  const getScore = (team: string) =>
    // type id 1525 is for the current score
    match.scores?.find(
      (score) => score.type_id === 1525 && score.score.participant === team
    )?.score?.goals ?? 0;

  const shouldDisplayScore = (stateID: number) => {
    const displayableStates = [2, 3, 4, 5, 6, 7, 8, 9, 22];
    return displayableStates.includes(stateID);
  };

  const handleMatchPress = () => {
    router.push({
      pathname: "/match/[fixtureID]",
      params: { fixtureID: match.id }
    });
  };

  useEffect(() => {
    setScores({
      home: getScore('home'),
      away: getScore('away')
    });
    const home = match.participants?.find((p: Participant) => p.meta?.location === 'home');
    const away = match.participants?.find((p: Participant) => p.meta?.location === 'away');
    if (home && away) {
      setTeams({ home, away });
    }
  }, [match]);


  const kickoff = new Date(match.starting_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity onPress={handleMatchPress}>
      <View style={styles.cardRow}>

        <View style={styles.teamContainer}>
          <Image source={{ uri: teams?.home?.image_path }} style={styles.flag} />
          <Text style={styles.teamName}>{teams?.home.name}</Text>
        </View>


        <View style={styles.centerContent}>
          {shouldDisplayScore(match.state.id) ? (
            <>
              <Text style={styles.stateText}>{match.state.name}</Text>
              <Text style={styles.scoreText}>
                {scores.home ?? 0} - {scores.away ?? 0}
              </Text>
            </>
          ) : (
            <Text style={styles.kickoffText}>{kickoff}</Text>
          )}
        </View>

        <View style={styles.teamContainerRight}>
          <Text style={styles.teamName}>{teams?.away.name}</Text>
          <Image source={{ uri: teams?.away?.image_path  }} style={styles.flag} />
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
    elevation: 2,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1.5,
  },
  teamContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  flag: {
    width: 24,
    height: 24,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stateText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  kickoffText: {
    fontSize: 14,
    color: '#555',
  },
});
