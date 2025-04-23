import { View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SegmentedButtons } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {fetchFullParticipantInfo}  from '@/lib/api';
import ClubInfo from '@/components/Team/TeamInfo/ClubInfo';
import ClubSquad from '@/components/Team/Squad/ClubSquad';
import { FullParticipant } from '@/types/types';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SkeletonComponent from '@/components/SkeletonComponent';

export default function Team() {
  const navigation = useNavigation();
  const { teamID } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState('teamInfo');
  const [teamInfo, setTeamInfo] = useState<FullParticipant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamInfo = async (teamID: number) => {
      try {
        const data = await fetchFullParticipantInfo(teamID);
        setTeamInfo(data);
        console.log('Team info data:', data);
      } catch (error) {
        console.error('Error loading team info:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamInfo(teamID as unknown as number);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Screen options={{ headerShown: false }} />
          {/* Custom Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>

            <View style={styles.logoAndName}>
              <Image
                source={{ uri: teamInfo?.image_path as string }}
                style={styles.logo}
              />
              <Text style={styles.leagueName}>{teamInfo?.name}</Text>
            </View>
          </View>

          {/* Segmented Buttons */}
          <SegmentedButtons
            value={selectedTab}
            onValueChange={setSelectedTab}
            buttons={[
              {
                value: 'teamInfo',
                label: 'Team Info',
              },
              {
                value: 'squad',
                label: 'Squad',
              },
              {
                value: 'matches',
                label: 'Matches',
              },
            ]}
            style={styles.segmented}
          />

          {loading ? <SkeletonComponent />  : (  
            <View style={styles.content}>
              {selectedTab === 'teamInfo' && <ClubInfo info={teamInfo} />}
              {selectedTab === 'squad' && <ClubSquad squad={teamInfo} />}
            </View>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
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
  