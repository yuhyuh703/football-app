import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { fetchMatchInfo } from '@/lib/api';
import { Fixture } from '@/types/types';



export default function FixtureInfo() {
    const {fixtureID} = useLocalSearchParams();
    const [fixtureInfo, setFixtureInfo] = useState<Fixture>({} as Fixture);
    const [scores, setScores] = useState<{ home: number; away: number }>(
        { home: 0, away: 0 }
    );

    const  getScore = (fixture: Fixture, team: string) => {0;
        return fixture.scores?.find(
        (score) => score.type_id === 1525  && score.score.participant === team
      )?.score?.goals ?? 0;
    }

    const shouldDisplayScore = (stateID: number) => {
        const displayableStates = [2, 3, 4, 5, 6, 7, 8, 9];
        return displayableStates.includes(stateID);
      }
  

    
    useEffect(() => {
        const fetchMatchDetails = async (fixtureID: number) => {
            try{
                const data = await fetchMatchInfo(fixtureID as unknown as number);
                setFixtureInfo(data);
                console.log('fixture info: ',data)
                setScores({ home: getScore(data, 'home'), away: getScore(data, 'away') });
            }
            catch (error) {
                console.error("Error loading match data:", error);
            }
        }
        fetchMatchDetails(fixtureID as unknown as number);
        

    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{fixtureInfo.name}</Text>
            <Text>Starting at: {fixtureInfo.starting_at}</Text>
            <Text>Venue: {fixtureInfo.venue?.name}</Text>
            <Text>{fixtureInfo.result_info}</Text>
            <Text>
                {shouldDisplayScore(fixtureInfo.state?.id) ? `${fixtureInfo.state.name} ${scores.home} : ${scores.away}` : `${fixtureInfo.state?.name}`}
            </Text>

        </View>
        </SafeAreaView>
    );
}