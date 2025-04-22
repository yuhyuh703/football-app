import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Fixture, Participant, Event, State } from '@/types/types';
import { Text } from 'react-native-paper';

interface FixtureResultProps {
  homeTeam: Participant;
  awayTeam: Participant;
  score: {
    home: number;
    away: number;
  };
  goals: {
    home: Event[] | [];
    away: Event[] | [];
  };
  state: State;
  starting_at: string;
}
export default function FixtureResult({
  homeTeam,
  awayTeam,
  score,
  goals,
  state,
  starting_at
}: FixtureResultProps) {

    const date = new Date(starting_at).toLocaleTimeString([], {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

  return (
    <View style={styles.container}>
      <View style={styles.teamsRow}>
        <View style={styles.teamBlock}>
          <Image source={{ uri: homeTeam.image_path }} style={styles.logo} />
          <Text style={styles.teamName}>{homeTeam.name}</Text>
        </View>

        <View style={styles.scoreBlock}>
          {state.id !== 1 ? (
           <View>
             <Text style={styles.scoreText}>{score.home} - {score.away}</Text>
             <Text>{state.name}</Text>
            </View>
          ) : (
            <View style={styles.kickoffContainer}>
                 <Text style={styles.kickoffText}>{date}</Text>
                 <Text style={styles.statusText}>{state.name}</Text>
            </View>
        )}
        </View>

        <View style={styles.teamBlock}>
          <Image source={{ uri: awayTeam.image_path }} style={styles.logo} />
          <Text style={styles.teamName}>{awayTeam.name}</Text>
        </View>
      </View>

      <View style={styles.goalsBlock}>
        {goals.home.map((goal, index) => (
          <Text style={styles.goalText} key={`home-${index}`}>
            {goal.player_name} {goal.minute}'
          </Text>
        ))}
        {goals.away.map((goal, index) => (
          <Text style={styles.goalText} key={`away-${index}`}>
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
      borderRadius: 12,
      elevation: 2,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      alignItems: 'center',
      marginVertical: 10,
    },
    teamsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 12,
    },
    teamBlock: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      maxWidth: '40%',
    },
    logo: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    teamName: {
      fontSize: 16,
      fontWeight: '600',
      flexShrink: 1,
      color: '#111',
    },
    scoreBlock: {
      alignItems: 'center',
    },
    scoreText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#111',
    },
    kickoffContainer: { 
        alignItems: 'center', 
        justifyContent: 'center',
      },
    kickoffText: {
      fontSize: 20,
      fontWeight: '600',
    },
    statusText: {
      fontSize: 14,
      color: '#666',
    },
    goalsBlock: {
      alignItems: 'center',
      marginTop: 8,
    },
    goalText: {
      fontSize: 14,
      color: '#333',
    },
  });