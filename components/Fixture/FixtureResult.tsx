import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Participant, Event, State, Period } from '@/types/types';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

interface FixtureResultProps {
  homeTeam: Participant;
  awayTeam: Participant;
  score: {
    home: number;
    away: number;
  };
  goals: {
    home: Event[];
    away: Event[];
  };
  state: State;
  starting_at: string;
  periods: Period[];
}

export default function FixtureResult({
  homeTeam,
  awayTeam,
  score,
  goals,
  state,
  starting_at,
  periods,
}: FixtureResultProps) {
  const date = new Date(starting_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleTeamPress = (id: number) => {
    router.push({
      pathname: '/team/[teamID]',
      params: { teamID: id },
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.teamsRow}>
        {/* Home Team */}
        <View style={styles.teamBlock}>
          <TouchableOpacity onPress={() => handleTeamPress(homeTeam.id)} style={styles.touchZone}>
            <Image source={{ uri: homeTeam.image_path }} style={styles.logo} />
            <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
              {homeTeam.name}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Score */}
        <View style={styles.scoreBlock}>
          {state.id !== 1 ? (
            <>
              <Text style={styles.scoreText}>{score.home} - {score.away}</Text>
              {state.id === 2 ? (
                <Text style={styles.statusText}>{periods[0]?.minutes}'</Text>
              ) : state.id === 22 ? (
                <Text style={styles.statusText}>{periods[1]?.minutes}'</Text>
              ) : (
                <Text style={styles.statusText}>{state.name}</Text>
              )}
            </>
          ) : (
            <>
              <Text style={styles.kickoffText}>{date}</Text>
              <Text style={styles.statusText}>{state.name}</Text>
            </>
          )}
        </View>

        {/* Away Team */}
        <View style={styles.teamBlock}>
          <TouchableOpacity onPress={() => handleTeamPress(awayTeam.id)} style={styles.touchZone}>
            <Image source={{ uri: awayTeam.image_path }} style={styles.logo} />
            <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
              {awayTeam.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.goalsBlock}>
        {[...goals.home, ...goals.away].map((goal, index) => (
          <Text style={styles.goalText} key={index}>
            {goal.player_name} {goal.minute}'
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  teamBlock: {
    width: '30%',
    alignItems: 'center',
  },
  touchZone: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },
  scoreBlock: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
  },
  kickoffText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  statusText: {
    fontSize: 14,
    color: '#888',
  },
  goalsBlock: {
    alignItems: 'center',
    marginTop: 10,
  },
  goalText: {
    fontSize: 14,
    color: '#333',
  },
});
