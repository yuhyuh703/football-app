import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {fetchPlayerByID} from '@/lib/api';
import { PlayerDetails } from '@/types/types';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import PlayerBio from '@/components/Player/PlayerBio';
import PlayerStats from '@/components/Player/PlayerStats';




export default function PlayerOverView() {
    const navigation = useNavigation();
    const { playerID, jersey_number } = useLocalSearchParams();
    const [playerInfo, setPlayerInfo] = useState<PlayerDetails>({} as PlayerDetails);
   
    useEffect(() => {
        const fetchPlayer = async (playerID: number) => {
            try{
                const data = await fetchPlayerByID(playerID);
                
                setPlayerInfo(data)
                console.log("data:", data);
                
            } catch (error) {
                console.error("Error loading team info:", error);
            }
        }
        fetchPlayer(playerID as unknown as number);
        


    }, [])
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={28} color="#000" />
              </TouchableOpacity>
  
              <View style={styles.logoAndName}>
                <Image
                  source={{ uri: playerInfo?.image_path as string }}
                  style={styles.logo}
                />
                <Text style={styles.leagueName}>{playerInfo?.display_name}</Text>
              </View>
            </View>
                <PlayerBio player={playerInfo} />
                <PlayerStats player={playerInfo} />
            <View>

            </View>
  
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    )
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
  