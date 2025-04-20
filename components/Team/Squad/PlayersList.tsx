import { Player } from '@/types/types';
import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

export default function PlayersList({ players }: { players: Record<number, Player[]> }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(players)}
        keyExtractor={(item) => item[0].toString()}
        renderItem={({ item }) => {
          const position = item[0];
          const playerList = item[1];

          return (
            <View style={styles.section}>
              <Text style={styles.positionTitle}>{position}</Text>
              {playerList.map((player) => (
                <TouchableOpacity
                  key={player.id}
                  onPress={() => router.push(`/player/${player.id}`)}
                >
                  <View style={styles.playerRow}>
                    <Image
                      source={{ uri: player.player.image_path }}
                      style={styles.playerImage}
                    />
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerName}>{player.player.display_name}</Text>
                      <Text style={styles.jersey}>#{player.jersey_number}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  positionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 12,
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#f3f3f3',
    
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
  },
  playerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
  jersey: {
    fontSize: 14,
    color: '#555',
  },
});
