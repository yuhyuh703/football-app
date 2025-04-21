import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { fetchMatchInfo } from '@/lib/api';
import { Fixture } from '@/types/types';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FixtureResult from '@/components/Fixture/FixtureResult';
import { Event, Participant } from '@/types/types';
import { set } from 'date-fns';

export default function FixtureInfo() {
    const navigation = useNavigation();
    const { fixtureID } = useLocalSearchParams();
    const [fixtureInfo, setFixtureInfo] = useState<Fixture>({} as Fixture);
    const [teams, setTeams] = useState<{
        home: Participant,
        away: Participant
    }>({} as { home: Participant, away: Participant });
    const [scores, setScores] = useState<{ home: number; away: number }>({ home: 0, away: 0 });
    const [goals, setGoals] = useState<{
        home: Event[];
        away: Event[];
    }>({} as { home: [], away: []});

    const getScore = (fixture: Fixture, team: string) => {
        return fixture.scores?.find(
            (score) => score.type_id === 1525 && score.score.participant === team
        )?.score?.goals ?? 0;
    };
    
    const shouldDisplayScore = (stateID: number) => {
        const displayableStates = [2, 3, 4, 5, 6, 7, 8, 9];
        return displayableStates.includes(stateID);
    };

    const getGoals = (fixture: Fixture, team: Participant | undefined) => {
        return fixture.events?.filter(
            (event) => event.type_id === 14 && event.participant_id === team?.id
        )
    }

    useEffect(() => {
        const fetchMatchDetails = async (fixtureID: number) => {
            try {
                const data = await fetchMatchInfo(fixtureID as unknown as number);
                setFixtureInfo(data);
                console.log('fixture info: ', data);
                const home = data.participants?.find((p: Participant) => p.meta?.location === 'home');
                const away = data.participants?.find((p: Participant) => p.meta?.location === 'away');
                setTeams({ home, away });
                setScores({ home: getScore(data, 'home'), away: getScore(data, 'away') });
                setGoals({ home: getGoals(data, teams.home), away: getGoals(data, teams.away) });
                
            } catch (error) {
                console.error("Error loading match data:", error);
            }
        };
        fetchMatchDetails(fixtureID as unknown as number);
    }, []);

    console.log('goals in main fixture: ', goals);
  

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack.Screen options={{ headerShown: false }} />
                {/* Custom Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color="#000" />
                    </TouchableOpacity>
                </View>
                {teams.home && teams.away && (
                    <FixtureResult homeTeam={teams.home} awayTeam={teams.away} score={scores} goals={goals}/>
                )}

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{fixtureInfo.name}</Text>
                    <Text>Starting at: {fixtureInfo.starting_at}</Text>
                    <Text>Venue: {fixtureInfo.venue?.name}</Text>
                    <Text>{fixtureInfo.result_info}</Text>
                    <Text>
                        {shouldDisplayScore(fixtureInfo.state?.id)
                            ? `${fixtureInfo.state.name} ${scores.home} : ${scores.away}`
                            : `${fixtureInfo.state?.name}`}
                    </Text>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f3f3f3',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 20,
      backgroundColor: '#f3f3f3',
    },
    backButton: {
      marginRight: 8,
    },
    logoAndName: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 10,
    },
    leagueName: {
      fontSize: 20,
      fontWeight: '600',
    },
    segmented: {
      marginTop: 10,
      marginHorizontal: 12,
      borderRadius: 0,
    },
    content: {
      flex: 1,
      paddingHorizontal: 12,
      paddingTop: 10,
    },
  });
  