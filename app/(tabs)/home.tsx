import RoutineCard from "@/api/component/RoutineCards";
import { routines } from "@/constants/routines";
import { getUser } from "@/lib/utils/useStorage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function home() {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();

      if (user?.name) {
        const names = user.name.split(" ");
        const first = names[0]?.charAt(0) || "";
        const second = names[1]?.charAt(0) || "";
        setInitials((first + second).toUpperCase());
      }
    };
    loadUser();
  }, []);
  const renderItem = ({ item }: any) => (
    <RoutineCard
      title={item.title}
      status={item.status}
      route={item.route}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/routine/[name]",
          params: { name: item.route },
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.username}>Routines</Text>
        </View>

        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>{initials}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>
      <View style={styles.troutine}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
      </View>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  username: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },

  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#037EB2",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#0284C7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  profileText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  statBox: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,

    // subtle gradient feel (clean white with border)
    borderWidth: 1,
    borderColor: "#E2E8F0",

    // shadow (premium card feel)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  statNumber: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },

  statLabel: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
    fontWeight: "500",
  },

  troutine: {
    alignSelf: "flex-start",
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0284C7",
  },
});
