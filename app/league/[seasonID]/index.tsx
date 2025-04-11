import {useLocalSearchParams, Tabs} from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import Standings from '@/components/League/Standings/Standings';
import TopScorers from '@/components/League/TopScorers/TopScorers';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function League() {
    const { seasonID } = useLocalSearchParams();
    const [selectedTab, setSelectedTab] = useState("standings");
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          title: `League ${seasonID}`, // Set the header title dynamically
        });
      }, [seasonID]);

    return(
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                value={selectedTab}
                onValueChange={setSelectedTab}
                buttons={[
                {
                    value: 'standings',
                    label: 'Standings',
                },
                {
                    value: 'topscorers',
                    label: 'Top scorers',
                },
                ]}
            />
            {selectedTab === 'standings' && <Standings />}
            {selectedTab === 'topscorers' && <TopScorers />}
        </SafeAreaView>
       
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
  });