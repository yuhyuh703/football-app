import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { FullParticipant } from '@/types/types';
import ClubUpcoming from './ClubUpcoming';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ClubSidelined from './ClubSidelined';

interface ClubInfoProps {
  info: FullParticipant | null;
}

export default function ClubInfo({ info }: ClubInfoProps) {
  if (!info) return null;

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.flex}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming</Text>
              <ClubUpcoming upcoming={info.upcoming} />
            </View>

            <View style={styles.section}>
              <ClubSidelined sidelined={info.sidelined} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Venue</Text>
              <Image source={{ uri: info.venue.image_path }} style={styles.venueImage} />
              <Text style={styles.venueName}>{info.venue.name}</Text>
              <Text style={styles.venueCapacity}>Capacity: {info.venue.capacity}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  playerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  playerDetails: {
    fontSize: 14,
    color: '#666',
  },
  venueImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  venueName: {
    fontSize: 16,
    fontWeight: '600',
  },
  venueCapacity: {
    fontSize: 14,
    color: '#666',
  },
  empty: {
    color: '#999',
    fontStyle: 'italic',
  },
});
