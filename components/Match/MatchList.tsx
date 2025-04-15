import { FlatList } from 'react-native';
import LeagueCard from './LeagueCard';
import { League } from '@/types/types';
import { Text } from 'react-native-paper';

export default function MatchList({ matches }: { matches: League[] }) {
  if (!matches || matches.length === 0) {
    return <Text>No matches this day</Text>;
  }

  return (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <LeagueCard league={item} />}
    />
  );
}
