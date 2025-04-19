import { Sideline } from "@/types/types";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ClubSidelined({ sidelined }: { sidelined: Sideline[] }) {
  // Filter out duplicate players based on their ID
  const uniqueSidelined = sidelined.filter(
    (item, index, self) => self.findIndex((p) => p.player.id === item.player.id) === index
  );

  return (
    <>
      <Text style={styles.sectionTitle}>Sidelined</Text>
      {uniqueSidelined.length > 0 ? (
        uniqueSidelined.map((item) => (
          <View key={item.player.id} style={styles.playerRow}>
            <Image source={{ uri: item.player.image_path }} style={styles.playerImage} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.player.display_name}</Text>
              <Text style={styles.playerDetails}>{item.category}</Text>
              <Text style={styles.playerDetails}>
                Return: {item.end_date ? item.end_date : 'Unknown'}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>No players sidelined</Text>
      )}
    </>
  );
}



const styles = StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
      paddingBottom: 30,
    },
    section: {
      marginBottom: 24,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      paddingVertical: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
    playerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    playerImage: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 12,
    },
    playerInfo: {
      flex: 1,
    },
    playerName: {
      fontSize: 16,
      fontWeight: '600',
    },
    playerDetails: {
      fontSize: 14,
      color: '#666',
    },
    venueImage: {
      width: '100%',
      height: 180,
      borderRadius: 8,
      marginBottom: 8,
    },
    venueName: {
      fontSize: 16,
      fontWeight: '600',
    },
    venueCapacity: {
      fontSize: 14,
      color: '#666',
    },
    empty: {
      color: '#999',
      fontStyle: 'italic',
    },
  });
  