import { Venue } from "@/types/types";
import { View, Text, Image, StyleSheet } from "react-native";

export default function FixtureVenue({venue}: {venue: Venue}) {
    console.log('Fixture Venue:', venue);
    return(
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Venue</Text>
            <Image source={{ uri: venue.image_path }} style={styles.venueImage} />
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text style={styles.venueCapacity}>Capacity: {venue.capacity}</Text>
      </View>
    )

}


const styles = StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    section: {

      borderColor: '#e0e0e0',
      borderRadius: 8,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
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
  });
  