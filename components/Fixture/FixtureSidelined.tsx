import { Text } from "react-native-paper";
import { Sideline, Participant, FixtureSideline } from "@/types/types";
import ClubSidelined from "../Team/TeamInfo/ClubSidelined";
import { View, StyleSheet } from "react-native";

interface FixtureSidelinedProps {
  sidelined: FixtureSideline[];
  teams: { home: Participant; away: Participant };
}

export default function FixtureSidelined({ sidelined, teams }: FixtureSidelinedProps) {
  const homeSidelined: Sideline[] = sidelined
    .filter((item) => item.participant_id === teams.home.id)
    .map((item) => item.sideline);

  const awaySidelined: Sideline[] = sidelined
    .filter((item) => item.participant_id === teams.away.id)
    .map((item) => item.sideline);

  return (
    <View style={styles.row}>
      <View style={styles.side}>
        <ClubSidelined sidelined={homeSidelined} />
      </View>
      <View style={styles.side}>
        <ClubSidelined sidelined={awaySidelined} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 12,
  },
  side: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
});
