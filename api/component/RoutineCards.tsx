import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  status: string;
  route: string;
  onPress: () => void;
};
const getIcon = (title: string) => {
  const t = title.toLowerCase().trim();

  if (t.includes("opening")) return "sunny-outline";
  if (t.includes("closing")) return "moon-outline";
  if (t.includes("cleaning")) return "sparkles-outline";
  if (t.includes("water")) return "water-outline";
  if (t.includes("temps")) return "analytics-outline";
  if (t.includes("holding")) return "hourglass-outline";
  if (t.includes("health")) return "medkit-outline";
  if (t.includes("sign")) return "exit-outline";

  return "grid-outline";
};

export default function RoutineCard({ title, status, route, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Ionicons name={getIcon(title) as any} size={28} color="#0EA5E9" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    height: 130,
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    justifyContent: "space-between",
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: "#1E293B",
    flexShrink: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  status: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completed: {
    backgroundColor: "#DCFCE7",
  },
  pending: {
    backgroundColor: "#FEF3C7",
  },
  completedText: {
    color: "#16A34A",
    fontSize: 12,
    fontWeight: "600",
  },
  pendingText: {
    color: "#F97316",
    fontSize: 12,
    fontWeight: "600",
  },
});
