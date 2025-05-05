import { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, useNavigation } from 'expo-router';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { fetchMatchInfo } from '@/lib/api';
import { Fixture, Event, Participant } from '@/types/types';
import FixtureResult from '@/components/Fixture/FixtureResult';
import FixtureDetails from '@/components/Fixture/FixtureDetails';
import FixtureSidelined from '@/components/Fixture/FixtureSidelined';
import FixtureVenue from '@/components/Fixture/FitureVenue';
import FixtureWeatherReport from '@/components/Fixture/FixtureWeatherReport';
import SkeletonComponent from '@/components/SkeletonComponent';

export default function FixtureInfo() {
  const navigation = useNavigation();
  const { fixtureID } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [fixtureInfo, setFixtureInfo] = useState<Fixture | null>(null);
  const [teams, setTeams] = useState<{ home: Participant; away: Participant } | null>(null);
  const [scores, setScores] = useState({ home: 0, away: 0 });
  const [goals, setGoals] = useState<{ home: Event[]; away: Event[] }>({ home: [], away: [] });

  const getScore = (fixture: Fixture, team: string) => {
    return (
      fixture.scores?.find(
        (score) => score.type_id === 1525 && score.score.participant === team
      )?.score?.goals ?? 0
    );
  };

  const getGoals = (fixture: Fixture, teamId?: number) => {
    return (
      fixture.events?.filter(
        (event) => (event.type_id === 14 || event.type_id === 16) && event.participant_id === teamId
      ) ?? []
    );
  };

  useEffect(() => {
    const fetchMatchDetails = async (fixtureID: number) => {
      try {
        const data = await fetchMatchInfo(fixtureID);
        setFixtureInfo(data);
        console.log('Fixture data:', data);
        const home = data.participants?.find((p: Participant) => p.meta?.location === 'home');
        const away = data.participants?.find((p: Participant) => p.meta?.location === 'away');

        if (home && away) {
          setTeams({ home, away });
          setScores({ home: getScore(data, 'home'), away: getScore(data, 'away') });
          setGoals({ home: getGoals(data, home.id), away: getGoals(data, away.id) });
        }
      } catch (error) {
        console.error('Error loading match data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails(Number(fixtureID));
  }, [fixtureID]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{ headerShown: false }} />


        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
        </View>


        {loading ? (
          <SkeletonComponent />
        ) : (
          <ScrollView>
            <View style={{ flex: 1, paddingBottom: 40 }}>
              {teams?.home && teams?.away && fixtureInfo?.state && fixtureInfo?.starting_at && (
                <FixtureResult
                  homeTeam={teams.home}
                  awayTeam={teams.away}
                  score={scores}
                  goals={goals}
                  state={fixtureInfo.state}
                  starting_at={fixtureInfo.starting_at}
                  periods={fixtureInfo.periods}
                />
              )}

              {fixtureInfo?.statistics && teams?.home && teams?.away && fixtureInfo.state_id !== 1 && (
                <FixtureDetails statistics={fixtureInfo.statistics} teams={teams} />
              )}

              {fixtureInfo?.sidelined && teams?.home && teams?.away && (
                <FixtureSidelined sidelined={fixtureInfo.sidelined} teams={teams} />
              )}

              {fixtureInfo?.venue && <FixtureVenue venue={fixtureInfo.venue} />}

              {fixtureInfo?.weatherreport && (
                <FixtureWeatherReport weather={fixtureInfo.weatherreport} />
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
});