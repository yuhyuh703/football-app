import { View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SegmentedButtons } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {fetchFullParticipantInfo}  from '@/lib/api';
import ClubInfo from '@/components/Team/ClubInfo';
import ClubSquad from '@/components/Team/ClubSquad';
import { FullParticipant } from '@/types/types';
import { Stack } from 'expo-router';



export default function Team() {
    const { teamID } = useLocalSearchParams();
    const [selectedTab, setSelectedTab] = useState('teamInfo');
    const [teamInfo, setTeamInfo] = useState<FullParticipant| null>(null);
    useEffect(() => {
        const fetchTeamInfo = async (teamID: number) => {
            try{
                const data = await fetchFullParticipantInfo(teamID);
                setTeamInfo(data);
                console.log("Team info data:", teamInfo);
                
            } catch (error) {
                console.error("Error loading team info:", error);
            }
        }
        fetchTeamInfo(teamID as unknown as number);
        


    }, [])
    return(
        <SafeAreaProvider>
        <Stack.Screen options={{ title: '',  headerBackTitle:'Back'}} />
      
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Image
                source={{ uri: teamInfo?.image_path }}
                style={{ width: 50, height: 50 }}
            />
            <Text style={{ fontSize: 24 }}>{teamInfo?.name}</Text>
        </View>
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
            value={selectedTab}
            onValueChange={setSelectedTab}
            buttons={[
                {
                    value: 'teamInfo',
                    label: 'Team Info'
                },
                {
                    value: 'squad',
                    label: 'Squad',
                },
                {
                    value: 'matches',
                    label: 'Matches',
                }

            ]}
            >

            </SegmentedButtons>
            {selectedTab === 'teamInfo' && <ClubInfo info={teamInfo}/>}
            {selectedTab === 'squad' && <ClubSquad squad={teamInfo}/>}
            {selectedTab === 'matches' && <Text>Matches</Text>}
        </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
  });