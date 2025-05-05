import { View, StyleSheet } from 'react-native';
import { Statistics, Participant } from '@/types/types';
import { Text } from 'react-native-paper';
import { useEffect, useState } from 'react';

interface FixtureDetailsProps {
  statistics: Statistics[];
  teams: { home: Participant; away: Participant } | null;
}

export default function FixtureDetails({ statistics, teams }: FixtureDetailsProps) {
  const [home, setHome] = useState({ posession: 0, shots: 0, shotsOnTarget: 0 });
  const [away, setAway] = useState({ posession: 0, shots: 0, shotsOnTarget: 0 });

  const getStatistics = (statistics: Statistics[], team: Participant) => {
    const getValue = (typeId: number) =>
      statistics.find((stat) => stat.type_id === typeId && stat.participant_id === team.id)?.data.value ?? 0;

    return {
      posession: getValue(45),
      shots: getValue(42),
      shotsOnTarget: getValue(86),
    };
  };

  useEffect(() => {
    if (teams?.home && teams?.away) {
      const homeStats = getStatistics(statistics, teams.home);
      const awayStats = getStatistics(statistics, teams.away);
      setHome(homeStats);
      setAway(awayStats);
    }
  }, [statistics, teams]);

  return (
    <View style={styles.container}>
      {/* Ball Possession */}
      <Text style={styles.sectionTitle}>Ball Possession</Text>
      <View style={styles.barWrapper}>
        <View style={[styles.barSide, { width: `${home.posession}%`, backgroundColor: '#fff' }]}>
          <Text style={styles.barText}>{home.posession}%</Text>
        </View>
        <View style={[ styles.barSide, { width: `${away.posession}%`, backgroundColor: '#1a1a1a',},]}>
          <Text style={[styles.barText, { color: '#fff' }]}>{away.posession}%</Text>
        </View>
      </View>

      {/* Other Stats */}
      <View style={styles.statsGroup}>
        <View style={styles.statsRow}>
          <Text style={styles.statNumber}>{home.shots}</Text>
          <Text style={styles.statLabel}>Total Shots</Text>
          <Text style={styles.statNumber}>{away.shots}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statNumber}>{home.shotsOnTarget}</Text>
          <Text style={styles.statLabel}>Shots on Target</Text>
          <Text style={styles.statNumber}>{away.shotsOnTarget}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  barWrapper: {
    flexDirection: 'row',
    height: 30,
    width: '90%',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    marginBottom: 24,
  },
  barSide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  barText: {
    fontWeight: '600',
    fontSize: 14,
  },
  statsGroup: {
    width: '90%',
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
});
