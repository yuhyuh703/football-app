import { useEffect, useState } from "react";
import { fetchTransfersLatest } from "@/lib/api";
import { Transfer } from "@/types/types";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TransferList from "@/components/Transfer/TransferList";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Transfers() {

  const [transfers, setTransfers] = useState<Transfer[]>([]);


  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await fetchTransfersLatest();
        console.log('Transfers latest data:', data);
        setTransfers(data);
      } catch (error) {
        console.error('Error loading transfers:', error);
      }
    };
    fetchTransfers();
  }, []);


  return(
    <GestureHandlerRootView style={styles.container}>
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transfers</Text>
      </View>
      <View>
           {transfers && <TransferList transfers={transfers} />}
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
})