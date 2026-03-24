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
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 18,
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  username: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 2,
  },

  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0EA5E9",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  profileText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statBox: {
    backgroundColor: "#ecebeb",
    width: "48%",
    padding: 16,
    borderRadius: 14,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
  },

  statLabel: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
  troutine: {
    backgroundColor: "#ed9450",
    height: 33,
    width: 150,
    color: "#ffffff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 5,
  },
});
