import {useLocalSearchParams, Tabs} from 'expo-router';
import { Text, View } from 'react-native';
import Standings from './(tabs)/Standings';

export default function League() {
    const { leagueId } = useLocalSearchParams();
    console.log('League ID:', typeof leagueId);
    console.log('League ID:', leagueId);
    return(
       <Standings />
    )
}