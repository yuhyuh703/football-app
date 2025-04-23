import { View, Text, Image, StyleSheet } from 'react-native';
import { Transfer } from '@/types/types';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

export default function TransferCard({ transfer }: { transfer: Transfer }) {
    const handlePlayerPress = () => {
        router.push({
            pathname: "/player/[playerID]",
            params: { playerID: transfer.player.id }
        })
    }
  return (
    <TouchableOpacity onPress={handlePlayerPress}>
        <View style={styles.card}>
        <Text style={styles.date}>{transfer.date}</Text>

        <View style={styles.centerContent}>
            <Image
            source={{ uri: transfer.player.image_path }}
            style={styles.playerImage}
            />
            <Text style={styles.playerName}>{transfer.player.display_name}</Text>
        </View>

        <View style={styles.transferLine}>
            <Text style={styles.teamText}>From</Text>
            <Image source={{ uri: transfer.fromteam?.image_path }} style={styles.teamLogo} />
            <Text style={styles.teamName}>{transfer.fromteam?.name}</Text>
            <Text style={styles.arrow}>→</Text>
            <Image source={{ uri: transfer.toteam?.image_path }} style={styles.teamLogo} />
            <Text style={styles.teamName}>{transfer.toteam?.name}</Text>
        </View>

        <View style={styles.footerRow}>
            <Text style={styles.label}>Fee</Text>
            <Text style={styles.value}>€{(transfer.amount / 1_000_000).toFixed(0)}M</Text>

            <Text style={styles.label}>Type</Text>
            <Text style={styles.value}>{transfer.type?.name}</Text>
        </View>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    elevation: 2,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  date: {
    position: 'absolute',
    top: 12,
    right: 16,
    fontSize: 12,
    color: '#888',
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 12,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  transferLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  teamText: {
    fontSize: 14,
    color: '#444',
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  teamLogo: {
    width: 20,
    height: 20,
    marginHorizontal: 4,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  label: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    flex: 1,
  },
});
