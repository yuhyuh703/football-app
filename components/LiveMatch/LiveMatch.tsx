import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchLiveMatches } from '@/lib/api';
import { LiveMatchesType } from '@/types/types';
import MatchList from '@/components/Match/MatchList';

export default function LiveMatchList() {
  const [matches, setMatches] = useState<LiveMatchesType[]>([]);

  useEffect(() => {
    const fetchLiveMatchesData = async () => {
      try {
        const data = await fetchLiveMatches();
        console.log('Live Matches:', data);
        setMatches(data);
      } catch (error) {
        console.error('Error fetching live matches:', error);
      }
    };
    fetchLiveMatchesData();
  }, []);

  if (matches.length === 0) {
    return <Text style={styles.noMatchesText}>No live matches available</Text>;
  }

  const groupedMatches = matches.reduce((acc: Record<number, any>, match) => {
    const leagueId = match.league_id;
  
    if (!acc[leagueId]) {
      acc[leagueId] = {
        ...match.league,     // Spread the league info
        today: [],           // Add today array
      };
    }
  
    acc[leagueId].today.push(match); // Push match into today array
  
    return acc;
  }, {});
  

  const groupedLiveMatches = Object.values(groupedMatches);
  console.log('Grouped Matches:', groupedLiveMatches);

  return (
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
      Live Matches
    </Text>
  );
}

const styles = StyleSheet.create({
  noMatchesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#757575',
  },
  leagueGroup: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
  },
  leagueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leagueLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 12,
  },
  leagueName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchRow: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  matchName: {
    fontSize: 15,
    fontWeight: '600',
  },
  matchDetails: {
    fontSize: 13,
    color: '#666',
  },
});
