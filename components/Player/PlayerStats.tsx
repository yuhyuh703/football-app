import { PlayerDetails } from "@/types/types";
import { Text, View, StyleSheet } from "react-native";

export default function PlayerStats({ player }: { player: PlayerDetails }) {
  const currentSeasonStats = player.statistics?.find(
    (stat) => stat.season?.is_current === true
  );

  const stats = currentSeasonStats?.details;

  const appearances = stats?.find((stat) => stat.type_id === 321)?.value.total || 0;
  const goals = stats?.find((stat) => stat.type_id === 52)?.value.total || 0;
  const assists = stats?.find((stat) => stat.type_id === 79)?.value.total || 0;
  const cleanSheets = stats?.find((stat) => stat.type_id === 194)?.value.total || 0;

  const statItems = [
    { label: "Apps", value: appearances },
    { label: "Goals", value: goals },
    { label: "Assists", value: assists },
    { label: "Clean Sheets", value: cleanSheets },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerText}>Current Season Stats</Text>

      <View style={styles.cardContainer}>
        {statItems.map((item, index) => (
          <View style={styles.statItem} key={index}>
            <Text style={styles.valueText}>{item.value}</Text>
            <Text style={styles.labelText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 12,
    marginVertical: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    paddingLeft: 4,
    color: "#222",
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    width: "23%",
  },
  valueText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  labelText: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
});
