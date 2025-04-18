import { useEffect, useState, useCallback, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";
import MatchList from "@/components/Match/MatchList";
import LiveMatch from "@/components/LiveMatch/LiveMatch"; 
import { fetchMatchesByDate } from "@/lib/api";
import { League, SelectedDate } from "../../../types/types";

export default function Matches() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(
    {
      dateString: new Date().toISOString().split('T')[0],
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    } as SelectedDate
  );
  const [matches, setMatches] = useState<League[]>([]);
  const [liveOpen, setLiveOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchMatchesByDate(selectedDate);
        setMatches(data);
        console.log("Matches data:", data);
      } catch (error) {
        console.error("Error loading matches:", error);
      }
    };

    loadMatches();
  }, [selectedDate]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleLiveMatchesPress = () => {
    setLiveOpen((prevState) => !prevState); 
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <IconButton
              icon="access-point"
              onPress={handleLiveMatchesPress}
              size={32}
              style={styles.iconButton}
            />
            <View style={styles.dateRow}>
              <Text style={styles.dateText}>
                {liveOpen 
                  ? "Live" 
                  : selectedDate.dateString === new Date().toISOString().split("T")[0] 
                  ? "Today" 
                  : selectedDate.dateString}
              </Text>
              <IconButton
                icon="calendar"
                onPress={() => bottomSheetRef.current?.snapToIndex(0)}
                size={32}
                style={styles.iconButton}
              />
            </View>
          </View>

          <View style={styles.matchListWrapper}>
            {liveOpen ? <LiveMatch /> : <MatchList matches={matches} />}
          </View>

          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["25%", "50%", "90%"]}
            onChange={handleSheetChanges}
            index={-1}
            backgroundStyle={styles.bottomSheetBackground}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Calendar
                onDayPress={(day: SelectedDate) => {
                  bottomSheetRef.current?.close();
                  console.log(day, "pressed");
                  setSelectedDate(day);
                  setLiveOpen(false);
                }}
                markedDates={{
                  [selectedDate.dateString]: {
                    selected: true,
                    selectedColor: "#4CAF50",
                    selectedTextColor: "#ffffff",
                  },
                }}
                style={styles.calendar}
                theme={{
                  backgroundColor: "#f8f9fa", // Light grey background
                  calendarBackground: "#f8f9fa", // Light grey background
                  textSectionTitleColor: "#b6c1cd", // Neutral grey for section titles
                  selectedDayBackgroundColor: "#FF5722", // Orange for selected day background
                  selectedDayTextColor: "#ffffff", // White for selected day text
                  todayTextColor: "#FF5722", // Orange for today's date
                  dayTextColor: "#2d4150", // Dark grey for day text
                  dotColor: "#FF5722", // Orange for dots
                  selectedDotColor: "#ffffff", // White for selected dots
                  arrowColor: "#b6c1cd", // Neutral grey for navigation arrows
                  monthTextColor: "#2d4150", // Dark grey for month text
                  indicatorColor: "#b6c1cd", // Neutral grey for loading indicator
                  textDayFontWeight: "300", // Light font weight for day numbers
                  textMonthFontWeight: "bold", // Bold font weight for month title
                  textDayHeaderFontWeight: "300", // Light font weight for day headers
                  textDayFontSize: 16, // Font size for day numbers
                  textMonthFontSize: 18, // Font size for month title
                  textDayHeaderFontSize: 14, // Font size for day headers
                }}
              />
            </BottomSheetView>
          </BottomSheet>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#e0e0e0",
  },
  iconButton: {
    margin: 10,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 15,
    fontWeight: "500",
  },
  matchListWrapper: {
    padding: 5,
  },
  contentContainer: {
    flex: 1,
  },
  calendar: {
    width: "100%",
  },
  bottomSheetBackground: {
    backgroundColor: "#f8f9fa",
  },
});
