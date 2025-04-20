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
      label: 'Country',
      value: player.nationality?.fifa_name ?? '—',
      image: player.nationality?.image_path,
    },
    {
      label: 'Age',
      value: age ? `${age} years` : '—',
      sub: birthDate ?? '',
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
      label: 'Position',
      value: player.position?.name ?? '—',
    },
    {
      label: 'Shirt',
      value: currentSeasonStats?.jersey_number?.toString() || '—',
    },
  ];

  return (
    <View style={styles.cardContainer}>
      {bioItems.map((item, index) => (
        <View key={index} style={styles.gridItem}>
          <Text style={styles.labelText}>{item.label}</Text>
          <View style={styles.valueRow}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.flag} />
            )}
            <View>
              <Text style={styles.valueText}>{item.value}</Text>
              {item.sub && <Text style={styles.subText}>{item.sub}</Text>}
            </View>
          </View>
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
  gridItem: {
    width: '30%', // Three columns
    marginBottom: 16,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  labelText: {
    fontSize: 13,
    color: '#666',
  },
  subText: {
    fontSize: 12,
    color: '#888',
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
