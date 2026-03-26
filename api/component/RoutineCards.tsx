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

const getIconColor = (status: string) => {
  switch (status) {
    case "completed":
      return "#22C55E";
    case "pending":
      return "#F97316";
    default:
      return "#0284C7";
  }
};

const getIconBg = (status: string) => {
  switch (status) {
    case "completed":
      return "#DCFCE7";
    case "pending":
      return "#FFEDD5";
    default:
      return "#E0F2FE";
  }
};

export default function RoutineCard({ title, status, route, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        {/* ✅ UPDATED ICON UI */}
        <View
          style={[styles.iconContainer, { backgroundColor: getIconBg(status) }]}
        >
          <Ionicons
            name={getIcon(title) as any}
            size={20}
            color={getIconColor(status)}
          />
        </View>

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
    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    justifyContent: "space-between",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#1E293B",
    flexShrink: 1,
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
