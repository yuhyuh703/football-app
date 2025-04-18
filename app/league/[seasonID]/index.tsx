import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Standings from '@/components/League/Standings/Standings';
import TopScorers from '@/components/League/TopScorers/TopScorers';
import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function League() {
  const { leagueName, image_path } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState('standings');
  const navigation = useNavigation();

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Custom Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.logoAndName}>
          <Image
            source={{ uri: image_path as string }}
            style={styles.logo}
          />
          <Text style={styles.leagueName}>{leagueName}</Text>
        </View>
      </View>

      {/* Tabs */}
      <SegmentedButtons
        value={selectedTab}
        onValueChange={setSelectedTab}
        buttons={[
          { value: 'standings', label: 'Standings' },
          { value: 'topscorers', label: 'Top Scorers' },
        ]}
        style={styles.segmented}
        
      />

      {/* Content */}
      <View style={styles.content}>
        {selectedTab === 'standings' && <Standings />}
        {selectedTab === 'topscorers' && <TopScorers />}
      </View>
    </SafeAreaView>
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
