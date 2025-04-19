import React from 'react';
import { View } from 'react-native';
import { LatestUpcoming } from '@/types/types';
import MatchCard from '@/components/Match/MatchCard';
import { useRouter } from 'expo-router';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ClubUpcomingMatchCard from '@/components/Team/TeamInfo/ClubUpcomingMatchCard';
import {router} from 'expo-router';


export default function ClubUpcoming({ upcoming }: { upcoming: LatestUpcoming[] }) {
  
    const latestMatch: LatestUpcoming = upcoming[0];

    const handleLeaguePress = () => {
        router.push({
            pathname: "/league/[seasonID]",
            params: {
              seasonID: upcoming[0].season_id,
              leagueName: upcoming[0].league.name,
              image_path: upcoming[0].league.image_path,
            },
          });
    }

    
    return (
      <SafeAreaProvider>
        <SafeAreaView>
        <View style={styles.card}>

        <TouchableOpacity style={styles.header} onPress={handleLeaguePress}>
          <Image source={{ uri: latestMatch?.league?.image_path}} style={styles.logo} />
          <View style={styles.leagueInfo}>
            <Text style={styles.leagueName}>{latestMatch?.league?.name}</Text>
            <Text style={styles.roundText}> - Round {latestMatch?.round?.name}</Text>
          </View>
        </TouchableOpacity>
  
        <View style={styles.content}>
          <ClubUpcomingMatchCard latestMatch={latestMatch} />
        </View>
      </View>
        </SafeAreaView>
      </SafeAreaProvider>
      
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      marginBottom: 20,
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 2,
      borderWidth: 2,
      borderColor: '#e0e0e0',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#f3f3f3',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
  
    },
    logo: {
      width: 32,
      height: 32,
      marginRight: 12,
    },
    leagueInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leagueName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    roundText: {
      fontSize: 13,
      color: '#666',
    },
    content: {
      padding: 8,
    },
  });
  

