import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { PlayerDetails } from '@/types/types';
import { format } from 'date-fns';

export default function PlayerBio({ player }: { player: PlayerDetails }) {
  const currentSeasonStats = player.statistics?.find(
    (stat) => stat.season?.is_current === true
  );

  const birthDate = player.date_of_birth
    ? format(new Date(player.date_of_birth), 'd MMM yyyy')
    : null;

  const age = player.date_of_birth
    ? Math.floor(
        (new Date().getTime() - new Date(player.date_of_birth).getTime()) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : null;

    const bioItems = [
      {
        label: 'Current team',
        value: player.teams?.[0]?.team?.name ?? '—',
        image: player.teams?.[0]?.team?.image_path,
      },
      {
        label: 'Shirt',
        value: currentSeasonStats?.jersey_number?.toString() || '—',
      },
      {
        label: 'Position',
        value: player.position?.name ?? '—',
      },
      {
        label: 'Height',
        value: player.height ? `${player.height} cm` : '—',
      },
      {
        label: 'Preferred foot',
        value: player.metadata?.[0]?.values || '—',
      },
      {
        label: 'Country',
        value: player.nationality?.fifa_name ?? '—',
        image: player.nationality?.image_path,
      },
      {
        label: 'Age',
        value: age ? `${age} years` : '—',
        sub: birthDate ?? '',
      },
    ];
    

  return (
    <View style={styles.cardContainer}>
      {bioItems.map((item, idx) => (
        <View style={styles.bioItem} key={idx}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.flag} />
          )}
          <Text style={styles.valueText}>{item.value}</Text>
          {item.sub && <Text style={styles.subText}>{item.sub}</Text>}
          <Text style={styles.labelText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    margin: 12,

  },
  bioItem: {
    width: '45%',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  labelText: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  subText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 4,
  },
});
