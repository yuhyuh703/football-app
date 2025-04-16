import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { fetchMatchInfo } from '@/lib/api';
import { Fixture } from '@/types/types';



export default function FixtureInfo() {
    const {fixtureID} = useLocalSearchParams();
    const [fixtureInfo, setFixtureInfo] = useState<Fixture>({} as Fixture);
    console.log("Fixture ID in MatchInfo:", fixtureID);
    
    useEffect(() => {
        const fetchMatchDetails = async (fixtureID: number) => {
            try{
                const data = await fetchMatchInfo(fixtureID as unknown as number);
                console.log('fixtureID fetch:', data);
                setFixtureInfo(data);
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
          

        </View>
        </SafeAreaView>
    );
}