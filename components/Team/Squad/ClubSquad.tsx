import React from 'react';
import { View } from 'react-native';
import { FullParticipant, Player } from '@/types/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PlayersList from './PlayersList';

interface ClubSquadProps {
  squad: FullParticipant | null;
}

export default function ClubSquad({ squad }: ClubSquadProps) {
  if (!squad) return null;

  // Group players by position name
  const groupedPlayer = squad.players.reduce((acc: Record<string, Player[]>, player) => {
    const position = player.player.position.name;

    if (!acc[position]) {
      acc[position] = [];
    }

    acc[position].push(player);
    return acc;
  }, {});

  // Define the order of positions to render
  const orderedPositions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];

  // Sort the grouped players accordingly
  const sortedGroupedPlayers: Record<string, Player[]> = {};
  orderedPositions.forEach((pos) => {
    if (groupedPlayer[pos]) {
      sortedGroupedPlayers[pos] = groupedPlayer[pos];
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <PlayersList players={sortedGroupedPlayers} />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
