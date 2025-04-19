import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LatestUpcoming } from '@/types/types';

export default function MatchCard({ latestMatch }: { latestMatch: LatestUpcoming }) {


  const handleMatchPress = () => {
    router.push({
      pathname: "/match/[fixtureID]",
      params: { fixtureID: latestMatch.id }
    });
  };

  const kickoff = new Date(latestMatch?.starting_at).toLocaleTimeString([], {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity onPress={handleMatchPress}>
      <View style={styles.cardRow}>

        <View style={styles.teamContainer}>
          <Image source={{ uri: latestMatch?.participants[0]?.image_path }} style={styles.flag} />
          <Text style={styles.teamName}>{latestMatch?.participants[0]?.short_code}</Text>
        </View>


        <View style={styles.centerContent}>
            <Text style={styles.kickoffText}>{kickoff}</Text>
        </View>

        <View style={styles.teamContainerRight}>
          <Text style={styles.teamName}>{latestMatch?.participants[1]?.short_code}</Text>
          <Image source={{ uri: latestMatch?.participants[1]?.image_path }} style={styles.flag} />
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
    marginBottom: 4,
  },
  kickoffText: {
    fontSize: 14,
    color: '#555',
  },
});
