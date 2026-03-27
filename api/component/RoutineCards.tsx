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

  if (t.includes("opening")) return "checkmark-circle";
  if (t.includes("closing")) return "moon-outline";
  if (t.includes("cleaning")) return "sparkles-outline";
  if (t.includes("water")) return "water-outline";
  if (t.includes("temps")) return "thermometer-outline";
  if (t.includes("holding")) return "hourglass-outline";
  if (t.includes("health")) return "medkit-outline";
  if (t.includes("sign")) return "exit-outline";

  return "grid-outline";
};

export default function RoutineCard({ title, status, onPress }: Props) {
  const isCompleted = status === "completed";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Ionicons
          name={getIcon(title) as any}
          size={28}
          color={isCompleted ? "#16A34A" : "#00d4df"}
        />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View
        style={[
          styles.badge,
          isCompleted ? styles.completedBadge : styles.pendingBadge,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            isCompleted ? styles.completedText : styles.pendingText,
          ]}
        >
          {isCompleted ? "Completed" : "Pending"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    height: 130,
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: "#334155",
    flexShrink: 1,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: "#DCFCE7",
  },
  pendingBadge: {
    backgroundColor: "#FDE2E2",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  completedText: {
    color: "#16A34A",
  },
  pendingText: {
    color: "#DC2626",
  },
});
