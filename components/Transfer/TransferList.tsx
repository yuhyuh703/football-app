import { FlatList, View } from 'react-native';
import { Transfer } from '@/types/types';
import TransferCard from './TransferCard';

export default function TransferList({ transfers }: { transfers: Transfer[] }) {
  return (
    <FlatList
      data={transfers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TransferCard transfer={item} />}
      contentContainerStyle={{ padding: 20 }}
    />
  );
}
